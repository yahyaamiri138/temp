import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

const InventoryForm = ({
  visible,
  onHide,
  onSubmit,
  products,
  initialData,
  isEditMode,
}: any) => {
  const [item, setItem] = useState<any>({});
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setItem(initialData || {});
  }, [initialData]);

  return (
    <Dialog
      header={isEditMode ? t("inventory.edit") : t("inventory.add")}
      visible={visible}
      style={{ width: "500px" }}
      onHide={onHide}
      modal
    >
      <div className="mb-3">
        <label>{t("inventory.product")}</label>

        <Dropdown
          value={item?.productId}
          options={products}
          optionLabel="name"
          optionValue="id"
          placeholder={t("inventory.selectProduct")}
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
        <label>{t("inventory.quantity")}</label>

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
        label={isEditMode ? t("inventory.update") : t("inventory.create")}
        icon="pi pi-check"
        className="w-100"
        onClick={() => onSubmit(item, isEditMode)}
      />
    </Dialog>
  );
};

export default InventoryForm;
