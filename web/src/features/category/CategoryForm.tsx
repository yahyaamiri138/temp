import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { InputText } from "primereact/inputtext";

const CategoryForm = ({
  visible,
  onHide,
  onSubmit,
  initialData,
  isEditMode,
}: any) => {
  const [name, setName] = useState("");

  const { t, i18n } = useTranslation();

  useEffect(() => {
    setName(initialData?.name || "");
  }, [initialData]);

  const handleSubmit = () => {
    onSubmit({ ...initialData, name }, isEditMode);
  };

  return (
    <Dialog
      header={isEditMode ? "Edit Category" : "Add Category"}
      visible={visible}
      style={{ width: "450px", height: "35%" }}
      onHide={onHide}
      modal
    >
      <InputText
        className="form-control mb-3 p-2"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Button
        label={t("categories.save")}
        icon="pi pi-check"
        onClick={handleSubmit}
        className="p-button-primary rounded w-100"
        size="small"
      />
    </Dialog>
  );
};

export default CategoryForm;
