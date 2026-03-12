// import { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Button } from "primereact/button";
// import { Dialog } from "primereact/dialog";
// import { Toast } from "primereact/toast";
// import { Card } from "primereact/card";
// import { Tag } from "primereact/tag";
// import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

// import {
//   fetchUsers,
//   deleteUser,
//   updateUser,
//   createUser,
// } from "../features/users/userSlice";

// import type { AppDispatch, RootState } from "../app/stores";
// import UserForm from "./UserForm";
// import { useTranslation } from "react-i18next";

// // Helper to get user role from JWT token
// const getUserRole = (): string | null => {
//   const token = localStorage.getItem("token");
//   if (!token) return null;
//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return payload.role; // ROLE_ADMIN or ROLE_USER
//   } catch {
//     return null;
//   }
// };

// const UserList = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { users } = useSelector((state: RootState) => state.users);
//   const toast = useRef<Toast>(null);
//   const { t } = useTranslation();
//   const [formVisible, setFormVisible] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<any>(null);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [viewVisible, setViewVisible] = useState(false);
//   const [viewUser, setViewUser] = useState<any>(null);
//   const [role, setRole] = useState<string | null>(null);

//   useEffect(() => {
//     // Get current user role
//     setRole(getUserRole());
//     // Fetch all users
//     dispatch(fetchUsers())
//       .unwrap()
//       .catch(() => {
//         toast.current?.show({
//           severity: "error",
//           summary: t("users.error"),
//           detail: t("users.somethingWentWrong"),
//         });
//       });
//   }, [dispatch]);

//   // ================= DELETE =================
//   const handleDelete = (id: number) => {
//     confirmDialog({
//       message: t("users.deleteConfirm"),
//       header: t("common.confirmation"),
//       icon: "pi pi-exclamation-triangle",
//       accept: async () => {
//         await dispatch(deleteUser(id));
//         toast.current?.show({
//           severity: "success",
//           summary: t("users.deleted"),
//           detail: t("users.userDeletedSuccessfully"),
//         });
//         dispatch(fetchUsers());
//       },
//     });
//   };

//   // ================= EDIT =================
//   const handleEdit = (user: any) => {
//     setSelectedUser(user);
//     setIsEditMode(true);
//     setFormVisible(true);
//   };

//   // ================= ADD =================
//   const handleAdd = () => {
//     if (role !== "ROLE_ADMIN") {
//       toast.current?.show({
//         severity: "warn",
//         summary: t("users.accessDenied"),
//         detail: t("users.onlyAdminsAdd"),
//       });
//       return;
//     }

//     setSelectedUser({
//       username: "",
//       password: "",
//       firstName: "",
//       lastName: "",
//       email: "",
//       gender: "",
//       role: "ROLE_USER",
//     });
//     setIsEditMode(false);
//     setFormVisible(true);
//   };

//   // ================= SAVE (CREATE / UPDATE) =================
//   const handleFormSubmit = async (user: any, editMode: boolean) => {
//     try {
//       let result;
//       if (editMode) {
//         result = await dispatch(updateUser(user));
//         if (updateUser.fulfilled.match(result)) {
//           toast.current?.show({
//             severity: "success",
//             summary: t("users.updated"),
//             detail: t("users.userUpdatedSuccessfully"),
//           });
//         }
//       } else {
//         if (role !== "ROLE_ADMIN") {
//           toast.current?.show({
//             severity: "warn",
//             summary: "Access Denied",
//             detail: t("users.onlyAdminsCreate"),
//           });
//           return;
//         }
//         result = await dispatch(createUser(user));
//         if (createUser.fulfilled.match(result)) {
//           toast.current?.show({
//             severity: "success",
//             summary: t("users.created"),
//             detail: t("users.userCreatedSuccessfully"),
//           });
//         }
//       }
//       setFormVisible(false);
//       dispatch(fetchUsers());
//     } catch (error) {
//       toast.current?.show({
//         severity: "error",
//         summary: t("users.error"),
//         detail: t("users.cannotFetchUsers"),
//       });
//     }
//   };

//   // ================= VIEW =================
//   const handleView = (user: any) => {
//     setViewUser(user);
//     setViewVisible(true);
//   };

//   // ================= ACTION COLUMN =================
//   const actionBody = (rowData: any) => (
//     <div className="d-flex justify-content-start">
//       <i
//         className="pi pi-eye text-info fs-5 me-2"
//         onClick={() => handleView(rowData)}
//         title={t("users.view")}
//       />
//       <i
//         className="pi pi-pencil text-primary fs-5 me-2"
//         onClick={() => handleEdit(rowData)}
//         title={t("users.edit")}
//       />
//       <i
//         className="pi pi-trash text-danger fs-5"
//         onClick={() => handleDelete(rowData.id)}
//         title={t("users.delete")}
//       />
//     </div>
//   );

//   const genderBody = (rowData: any) => {
//     return t(`users.${rowData.gender?.toLowerCase()}`);
//   };

//   return (
//     <div className="card shadow-sm">
//       <Toast ref={toast} />
//       <ConfirmDialog />
//       <div className="card-body">
//         <div className="d-flex justify-content-between mb-3">
//           <h5>{t("users.title")}</h5>
//           <Button
//             label={t("users.addUser")}
//             icon="pi pi-plus"
//             className="btn btn-sm p-button-primary rounded"
//             onClick={handleAdd}
//           />
//         </div>
//         <DataTable value={users} paginator rows={5} responsiveLayout="scroll">
//           {/* <Column field="id" header="ID" sortable /> */}
//           <Column field="firstName" header={t("users.firstName")} sortable />
//           <Column field="lastName" header={t("users.lastName")} sortable />
//           <Column field="email" header={t("users.email")} sortable />
//           <Column
//             field="gender"
//             header={t("users.gender")}
//             body={genderBody}
//             sortable
//           />
//           <Column field="username" header={t("users.username")} sortable />
//           <Column field="role" header={t("users.role")} sortable />
//           <Column header={t("users.actions")} body={actionBody} />
//         </DataTable>
//       </div>
//       {/* ================= USER FORM (CREATE / EDIT) ================= */}
//       <UserForm
//         visible={formVisible}
//         onHide={() => setFormVisible(false)}
//         onSubmit={handleFormSubmit}
//         initialData={selectedUser}
//         isEditMode={isEditMode}
//       />
//       {/* ================= VIEW DIALOG ================= */}
//       <Dialog
//         header={t("users.userDetails")}
//         visible={viewVisible}
//         style={{ width: "80vh" }}
//         onHide={() => setViewVisible(false)}
//         modal
//       >
//         {viewUser && (
//           <Card className="shadow-3 border-round">
//             <div className="row g-3">
//               <div className="col-md-6">
//                 {/* <b className="text-dark">First Name</b> */}
//                 <b>{t("users.firstName")}</b>
//                 <div>{viewUser.firstName}</div>
//               </div>

//               <div className="col-md-6 mt-1">
//                 <b>{t("users.lastName")}</b>
//                 <div>{viewUser.lastName}</div>
//               </div>

//               <div className="col-md-6 mt-1">
//                 <b>{t("users.email")}</b>
//                 <div>{viewUser.email}</div>
//               </div>

//               <div className="col-md-6 mt-1">
//                 <b>{t("users.gender")}</b>
//                 <div>{viewUser.gender}</div>
//               </div>

//               <div className="col-md-6 mt-1">
//                 <b>{t("users.username")}</b>
//                 <div>{viewUser.username}</div>
//               </div>

//               <div className="col-md-6 mt-1">
//                 <b>{t("users.role")}</b>
//                 <div>
//                   <Tag
//                     value={viewUser.role}
//                     severity={
//                       viewUser.role === "ROLE_ADMIN" ? "danger" : "info"
//                     }
//                   />
//                 </div>
//               </div>
//             </div>
//           </Card>
//         )}
//       </Dialog>
//     </div>
//   );
// };

// export default UserList;

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
import { useTranslation } from "react-i18next";
import "../CSS/UserList.css";

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
  const { t, i18n } = useTranslation();
  const [formVisible, setFormVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);
  const [viewUser, setViewUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);

  // تعیین جهت بر اساس زبان
  const direction = i18n.language === "fa" ? "rtl" : "ltr";

  useEffect(() => {
    // Get current user role
    setRole(getUserRole());
    // Fetch all users
    dispatch(fetchUsers())
      .unwrap()
      .catch(() => {
        toast.current?.show({
          severity: "error",
          summary: t("users.error"),
          detail: t("users.somethingWentWrong"),
        });
      });
  }, [dispatch]);

  // ================= DELETE =================
  const handleDelete = (id: number) => {
    confirmDialog({
      message: t("users.deleteConfirm"),
      header: t("common.confirmation"),
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        await dispatch(deleteUser(id));
        toast.current?.show({
          severity: "success",
          summary: t("users.deleted"),
          detail: t("users.userDeletedSuccessfully"),
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
        summary: t("users.accessDenied"),
        detail: t("users.onlyAdminsAdd"),
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
            summary: t("users.updated"),
            detail: t("users.userUpdatedSuccessfully"),
          });
        }
      } else {
        if (role !== "ROLE_ADMIN") {
          toast.current?.show({
            severity: "warn",
            summary: "Access Denied",
            detail: t("users.onlyAdminsCreate"),
          });
          return;
        }
        result = await dispatch(createUser(user));
        if (createUser.fulfilled.match(result)) {
          toast.current?.show({
            severity: "success",
            summary: t("users.created"),
            detail: t("users.userCreatedSuccessfully"),
          });
        }
      }
      setFormVisible(false);
      dispatch(fetchUsers());
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: t("users.error"),
        detail: t("users.cannotFetchUsers"),
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
    <div className="d-flex justify-content-start" style={{ direction: "ltr" }}>
      <i
        className="pi pi-eye text-info fs-5 me-2"
        onClick={() => handleView(rowData)}
        title={t("users.view")}
        style={{ cursor: "pointer" }}
      />
      <i
        className="pi pi-pencil text-primary fs-5 me-2"
        onClick={() => handleEdit(rowData)}
        title={t("users.edit")}
        style={{ cursor: "pointer" }}
      />
      <i
        className="pi pi-trash text-danger fs-5"
        onClick={() => handleDelete(rowData.id)}
        title={t("users.delete")}
        style={{ cursor: "pointer" }}
      />
    </div>
  );

  const genderBody = (rowData: any) => {
    return t(`users.${rowData.gender?.toLowerCase()}`);
  };

  return (
    <div className="card shadow-sm" dir={direction}>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <h5>{t("users.title")}</h5>
          <Button
            label={t("users.addUser")}
            icon="pi pi-plus"
            className="btn btn-sm p-button-primary rounded"
            onClick={handleAdd}
          />
        </div>

        <DataTable
          value={users}
          paginator
          rows={5}
          responsiveLayout="scroll"
          dir={direction}
        >
          {/* <Column field="id" header="ID" sortable /> */}
          <Column field="firstName" header={t("users.firstName")} sortable />
          <Column field="lastName" header={t("users.lastName")} sortable />
          <Column field="email" header={t("users.email")} sortable />
          <Column
            field="gender"
            header={t("users.gender")}
            body={genderBody}
            sortable
          />
          <Column field="username" header={t("users.username")} sortable />
          <Column field="role" header={t("users.role")} sortable />
          <Column
            header={t("users.actions")}
            body={actionBody}
            style={{ textAlign: direction === "rtl" ? "left" : "center" }}
          />
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
        header={t("users.userDetails")}
        visible={viewVisible}
        style={{ width: "80vh" }}
        onHide={() => setViewVisible(false)}
        modal
        rtl={direction === "rtl"}
      >
        {viewUser && (
          <Card className="shadow-3 border-round" dir={direction}>
            <div className="row g-3">
              <div className="col-md-6">
                <b>{t("users.firstName")}</b>
                <div>{viewUser.firstName}</div>
              </div>

              <div className="col-md-6 mt-1">
                <b>{t("users.lastName")}</b>
                <div>{viewUser.lastName}</div>
              </div>

              <div className="col-md-6 mt-1">
                <b>{t("users.email")}</b>
                <div>{viewUser.email}</div>
              </div>

              <div className="col-md-6 mt-1">
                <b>{t("users.gender")}</b>
                <div>{viewUser.gender}</div>
              </div>

              <div className="col-md-6 mt-1">
                <b>{t("users.username")}</b>
                <div>{viewUser.username}</div>
              </div>

              <div className="col-md-6 mt-1">
                <b>{t("users.role")}</b>
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
