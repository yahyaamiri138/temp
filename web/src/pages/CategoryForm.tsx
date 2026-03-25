import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const CategoryForm = ({
  visible,
  onHide,
  onSubmit,
  initialData,
  isEditMode,
}: any) => {
  const [name, setName] = useState("");

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
      style={{ width: "400px" }}
      onHide={onHide}
      modal
    >
      <input
        className="form-control mb-3"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Button
        label="Save"
        icon="pi pi-check"
        onClick={handleSubmit}
        className="p-button-success"
      />
    </Dialog>
  );
};

export default CategoryForm;
