import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";
import { InputText } from "primereact/inputtext";

const ProductForm = ({
  visible,
  onHide,
  onSubmit,
  initialData,
  isEditMode,
  categories,
}: any) => {
  const [form, setForm] = useState(initialData);

  const { t } = useTranslation();

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    onSubmit(form, isEditMode);
  };

  return (
    <Dialog
      header={isEditMode ? "Edit Product" : "Add Product"}
      visible={visible}
      style={{ width: "500px" }}
      onHide={onHide}
      modal
    >
      <div className="p-fluid">
        <InputText
          className="mb-2"
          placeholder={t("products.name")}
          value={form?.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <InputText
          className="mb-2"
          placeholder={t("products.type")}
          value={form?.type || ""}
          onChange={(e) => handleChange("type", e.target.value)}
        />

        <InputText
          className="mb-2"
          placeholder={t("products.size")}
          value={form?.size || ""}
          onChange={(e) => handleChange("size", e.target.value)}
        />

        <InputText
          className="mb-2"
          placeholder={t("products.description")}
          value={form?.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        {/* Category Dropdown */}
        <Dropdown
          value={form?.categoryId || null}
          options={categories}
          onChange={(e) => handleChange("categoryId", e.value)}
          optionLabel="name"
          optionValue="id"
          placeholder={t("products.select")}
          className="w-full mb-3"
        />

        <Button
          label={t("products.save")}
          icon="pi pi-check"
          onClick={handleSubmit}
          className="p-button-primary rounded w-100"
        />
      </div>
    </Dialog>
  );
};

export default ProductForm;
