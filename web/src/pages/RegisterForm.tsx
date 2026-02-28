import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../features/users/userSlice";
import type { AppDispatch } from "../app/stores";
import UserForm from "./UserForm";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const [visible, setVisible] = useState(true);

  const handleRegister = async (user: any) => {
    try {
      const result = await dispatch(createUser(user));

      if (createUser.fulfilled.match(result)) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Account created successfully",
        });

        setTimeout(() => {
          navigate("/auth");
        }, 1500);
      }
    } catch {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Registration failed",
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />

      <UserForm
        visible={visible}
        onHide={() => navigate("/auth")}
        onSubmit={(user) => handleRegister(user)}
        initialData={{
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          email: "",
          gender: "",
          role: "ROLE_USER",
        }}
        isEditMode={false}
      />
    </>
  );
};

export default RegisterForm;
