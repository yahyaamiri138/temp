import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const InventoryForm = ({
  visible,
  onHide,
  onSubmit,
  initialData,
  isEditMode,
}: any) => {
  const [item, setItem] = useState<any>({});

  useEffect(() => {
    setItem(initialData || {});
  }, [initialData]);

  return (
    <Dialog header="Inventory" visible={visible} onHide={onHide}>
      <div className="mb-3">
        <label>Product Name</label>
        <InputText
          value={item?.productName || ""}
          onChange={(e) => setItem({ ...item, productName: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label>Quantity</label>
        <InputText
          value={item?.quantity || ""}
          onChange={(e) => setItem({ ...item, quantity: e.target.value })}
        />
      </div>

      <Button
        label={isEditMode ? "Update" : "Create"}
        onClick={() => onSubmit(item, isEditMode)}
      />
    </Dialog>
  );
};

export default InventoryForm;
