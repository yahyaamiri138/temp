import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const ProductForm = ({
  visible,
  onHide,
  onSubmit,
  initialData,
  isEditMode,
  categories,
}: any) => {
  const [form, setForm] = useState(initialData);

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
        <input
          className="form-control mb-2"
          placeholder="Name"
          value={form?.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Type"
          value={form?.type || ""}
          onChange={(e) => handleChange("type", e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Size"
          value={form?.size || ""}
          onChange={(e) => handleChange("size", e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Description"
          value={form?.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        {/* Category Dropdown */}
        <select
          className="form-control mb-3"
          value={form?.categoryId || ""}
          onChange={(e) => handleChange("categoryId", Number(e.target.value))}
        >
          <option value="">Select Category</option>
          {categories.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <Button
          label="Save"
          icon="pi pi-check"
          onClick={handleSubmit}
          className="p-button-success"
        />
      </div>
    </Dialog>
  );
};

export default ProductForm;
