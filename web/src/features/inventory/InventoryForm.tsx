import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

const InventoryForm = ({
  visible,
  onHide,
  onSubmit,
  products,
  initialData,
  isEditMode,
}: any) => {
  const [item, setItem] = useState<any>({});

  useEffect(() => {
    setItem(initialData || {});
  }, [initialData]);

  return (
    <Dialog
      header={isEditMode ? "Edit Inventory" : "Add Inventory"}
      visible={visible}
      style={{ width: "500px" }}
      onHide={onHide}
      modal
    >
      <div className="mb-3">
        <label>Product</label>

        <Dropdown
          value={item?.productId}
          options={products}
          optionLabel="name"
          optionValue="id"
          placeholder="Select Product"
          className="w-100"
          onChange={(e) =>
            setItem({
              ...item,
              productId: e.value,
            })
          }
        />
      </div>

      <div className="mb-3">
        <label>Quantity</label>

        <InputNumber
          value={item?.quantity || 0}
          className="w-100"
          onValueChange={(e) =>
            setItem({
              ...item,
              quantity: e.value,
            })
          }
        />
      </div>

      <Button
        label={isEditMode ? "Update" : "Create"}
        icon="pi pi-check"
        className="w-100"
        onClick={() => onSubmit(item, isEditMode)}
      />
    </Dialog>
  );
};

export default InventoryForm;
