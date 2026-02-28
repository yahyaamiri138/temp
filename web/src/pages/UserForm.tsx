import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

interface UserFormProps {
  visible: boolean;
  onHide: () => void;
  onSubmit: (user: any, isEditMode: boolean) => void;
  initialData: any;
  isEditMode: boolean;
}

const roles = [
  { label: "USER", value: "ROLE_USER" },
  { label: "ADMIN", value: "ROLE_ADMIN" },
];

const genderOptions = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Other", value: "OTHER" },
];

const UserForm: React.FC<UserFormProps> = ({
  visible,
  onHide,
  onSubmit,
  initialData,
  isEditMode,
}) => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    setUser(initialData);
  }, [initialData]);

  return (
    <Dialog
      header={isEditMode ? "Edit User" : "Add User"}
      visible={visible}
      style={{ width: "800px" }}
      onHide={onHide}
      modal
    >
      <div className="container-fluid">
        <div className="row">
          {/* First Name */}
          <div className="col-12 col-md-6 mb-3">
            <label>
              <b>First Name</b>
            </label>
            <InputText
              value={user?.firstName || ""}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              className="w-100"
            />
          </div>

          {/* Last Name */}
          <div className="col-12 col-md-6 mb-3">
            <label>
              <b>Last Name</b>
            </label>
            <InputText
              value={user?.lastName || ""}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              className="w-100"
            />
          </div>

          {/* Email */}
          <div className="col-12 col-md-6 mb-3">
            <label>
              <b>Email</b>
            </label>
            <InputText
              type="email"
              value={user?.email || ""}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-100"
            />
          </div>

          {/* Gender */}
          <div className="col-12 col-md-6 mb-3">
            <label>
              <b>Gender</b>
            </label>
            <Dropdown
              value={user?.gender}
              options={genderOptions}
              onChange={(e) => setUser({ ...user, gender: e.value })}
              className="w-100"
              placeholder="Select Gender"
            />
          </div>

          {/* Username */}
          <div className="col-12 col-md-6 mb-3">
            <label>
              <b>Username</b>
            </label>
            <InputText
              value={user?.username || ""}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-100"
            />
          </div>

          {/* Password */}
          {!isEditMode && (
            <div className="col-12 col-md-6 mb-3">
              <label>
                <b>Password</b>
              </label>
              <InputText
                type="password"
                value={user?.password || ""}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-100"
              />
            </div>
          )}

          {/* Role */}
          <div className="col-12 col-md-6 mb-3">
            <label>
              <b>Role</b>
            </label>
            <Dropdown
              value={user?.role}
              options={roles}
              onChange={(e) => setUser({ ...user, role: e.value })}
              className="w-100"
              placeholder="Select Role"
            />
          </div>
          <div className="col-12 col-md-6 mt-4">
            <Button
              label={isEditMode ? "Update User" : "Create User"}
              icon="pi pi-check"
              onClick={() => onSubmit(user, isEditMode)}
              className="w-100 mt-2 rounded"
            />
          </div>
        </div>

        {/* Button */}
        {/* <div className="row">
          <div className="col-12">
            <Button
              label={isEditMode ? "Update User" : "Create User"}
              icon="pi pi-check"
              onClick={() => onSubmit(user, isEditMode)}
              className="w-100 mt-2 r"
            />
          </div>
        </div> */}
      </div>
    </Dialog>
  );
};

export default UserForm;
