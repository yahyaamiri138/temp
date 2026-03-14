import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

const UserForm = ({
  visible,
  onHide,
  onSubmit,
  initialData,
  isEditMode,
}: any) => {
  const { t } = useTranslation();
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    setUser(initialData);
  }, [initialData]);

  const roles = [
    { label: "USER", value: "ROLE_USER" },
    { label: "ADMIN", value: "ROLE_ADMIN" },
  ];

  const genderOptions = [
    { label: t("users.male"), value: "MALE" },
    { label: t("users.female"), value: "FEMALE" },
    { label: t("users.other"), value: "OTHER" },
  ];

  return (
    <Dialog
      header={isEditMode ? t("users.edit") : t("users.addUser")}
      visible={visible}
      style={{ width: "800px" }}
      onHide={onHide}
      modal
    >
      <div className="row">
        <div className="col-md-6 mb-3">
          <label>
            <b>{t("users.firstName")}</b>
          </label>
          <InputText
            value={user?.firstName || ""}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            className="w-100"
          />
        </div>

        <div className="col-md-6 mb-3">
          <label>
            <b>{t("users.lastName")}</b>
          </label>
          <InputText
            value={user?.lastName || ""}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            className="w-100"
          />
        </div>

        <div className="col-md-6 mb-3">
          <label>
            <b>{t("users.email")}</b>
          </label>
          <InputText
            type="email"
            value={user?.email || ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-100"
          />
        </div>

        <div className="col-md-6 mb-3">
          <label>
            <b>{t("users.gender")}</b>
          </label>
          <Dropdown
            value={user?.gender}
            options={genderOptions}
            onChange={(e) => setUser({ ...user, gender: e.value })}
            className="w-100"
            placeholder={t("users.gender")}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label>
            <b>{t("users.username")}</b>
          </label>
          <InputText
            value={user?.username || ""}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-100"
          />
        </div>

        {!isEditMode && (
          <div className="col-md-6 mb-3">
            <label>
              <b>{t("auth.password")}</b>
            </label>
            <InputText
              type="password"
              value={user?.password || ""}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-100"
            />
          </div>
        )}

        <div className="col-md-6 mb-3">
          <label>
            <b>{t("users.role")}</b>
          </label>
          <Dropdown
            value={user?.role}
            options={roles}
            onChange={(e) => setUser({ ...user, role: e.value })}
            className="w-100"
          />
        </div>

        <div className="col-md-6 mt-4">
          <Button
            label={isEditMode ? t("users.updated") : t("users.created")}
            icon="pi pi-check"
            onClick={() => onSubmit(user, isEditMode)}
            className="w-100"
          />
        </div>
      </div>
    </Dialog>
  );
};

export default UserForm;
