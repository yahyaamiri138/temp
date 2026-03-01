import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import {
  fetchUsers,
  deleteUser,
  updateUser,
  createUser,
} from "../features/users/userSlice";

import type { AppDispatch, RootState } from "../app/stores";
import UserForm from "./UserForm";

// Helper to get user role from JWT token
const getUserRole = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role; // ROLE_ADMIN or ROLE_USER
  } catch {
    return null;
  }
};

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.users);

  const toast = useRef<Toast>(null);

  const [formVisible, setFormVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [viewVisible, setViewVisible] = useState(false);
  const [viewUser, setViewUser] = useState<any>(null);

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Get current user role
    setRole(getUserRole());

    // Fetch all users
    dispatch(fetchUsers())
      .unwrap()
      .catch(() => {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Cannot fetch users",
        });
      });
  }, [dispatch]);

  // ================= DELETE =================
  const handleDelete = (id: number) => {
    confirmDialog({
      message: "Are you sure you want to delete this user?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        await dispatch(deleteUser(id));
        toast.current?.show({
          severity: "success",
          summary: "Deleted",
          detail: "User deleted successfully",
        });
        dispatch(fetchUsers());
      },
    });
  };

  // ================= EDIT =================
  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setFormVisible(true);
  };

  // ================= ADD =================
  const handleAdd = () => {
    if (role !== "ROLE_ADMIN") {
      toast.current?.show({
        severity: "warn",
        summary: "Access Denied",
        detail: "Only admins can add users",
      });
      return;
    }

    setSelectedUser({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      role: "ROLE_USER",
    });
    setIsEditMode(false);
    setFormVisible(true);
  };

  // ================= SAVE (CREATE / UPDATE) =================
  const handleFormSubmit = async (user: any, editMode: boolean) => {
    try {
      let result;

      if (editMode) {
        result = await dispatch(updateUser(user));

        if (updateUser.fulfilled.match(result)) {
          toast.current?.show({
            severity: "success",
            summary: "Updated",
            detail: "User updated successfully",
          });
        }
      } else {
        if (role !== "ROLE_ADMIN") {
          toast.current?.show({
            severity: "warn",
            summary: "Access Denied",
            detail: "Only admins can create users",
          });
          return;
        }

        result = await dispatch(createUser(user));

        if (createUser.fulfilled.match(result)) {
          toast.current?.show({
            severity: "success",
            summary: "Created",
            detail: "User created successfully",
          });
        }
      }

      setFormVisible(false);
      dispatch(fetchUsers());
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong!",
      });
    }
  };

  // ================= VIEW =================
  const handleView = (user: any) => {
    setViewUser(user);
    setViewVisible(true);
  };

  // ================= ACTION COLUMN =================
  const actionBody = (rowData: any) => (
    <div className="d-flex justify-content-start">
      <i
        className="pi pi-eye text-info fs-5 mr-2"
        onClick={() => handleView(rowData)}
        title="View"
      />

      <i
        className="pi pi-pencil text-primary fs-5 mr-2"
        onClick={() => handleEdit(rowData)}
        title="Edit"
      />

      <i
        className="pi pi-trash text-danger fs-5"
        onClick={() => handleDelete(rowData.id)}
        title="Delete"
      />
    </div>
  );

  return (
    <div className="card shadow-sm">
      <Toast ref={toast} />
      <ConfirmDialog />

      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <h5>User Management</h5>
          <Button
            label="Add User"
            icon="pi pi-plus"
            className="btn btn-sm p-button-primary rounded"
            onClick={handleAdd}
          />
        </div>

        <DataTable value={users} paginator rows={5} responsiveLayout="scroll">
          {/* <Column field="id" header="ID" sortable /> */}
          <Column field="firstName" header="First Name" sortable />
          <Column field="lastName" header="Last Name" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="gender" header="Gender" sortable />
          <Column field="username" header="Username" sortable />
          <Column field="role" header="Role" sortable />
          <Column header="Actions" body={actionBody} />
        </DataTable>
      </div>

      {/* ================= USER FORM (CREATE / EDIT) ================= */}
      <UserForm
        visible={formVisible}
        onHide={() => setFormVisible(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedUser}
        isEditMode={isEditMode}
      />

      {/* ================= VIEW DIALOG ================= */}
      <Dialog
        header="User Details"
        visible={viewVisible}
        style={{ width: "80vh" }}
        onHide={() => setViewVisible(false)}
        modal
      >
        {viewUser && (
          <Card className="shadow-3 border-round">
            <div className="row g-3">
              <div className="col-md-6">
                <b className="text-dark">First Name</b>
                <div>{viewUser.firstName}</div>
              </div>

              <div className="col-md-6 mt-1">
                <b className="text-dark">Last Name</b>
                <div>{viewUser.lastName}</div>
              </div>

              <div className="col-md-6 mt-1">
                <b className="text-dark">Email</b>
                <div>{viewUser.email}</div>
              </div>

              <div className="col-md-6 mt-1">
                <b className="text-dark">Gender</b>
                <div>{viewUser.gender}</div>
              </div>

              <div className="col-md-6 mt-1">
                <b className="text-dark">Username</b>
                <div>{viewUser.username}</div>
              </div>

              <div className="col-md-6 mt-1">
                <b className="text-dark">Role</b>
                <div>
                  <Tag
                    value={viewUser.role}
                    severity={
                      viewUser.role === "ROLE_ADMIN" ? "danger" : "info"
                    }
                  />
                </div>
              </div>
            </div>
          </Card>
        )}
      </Dialog>
    </div>
  );
};

export default UserList;
