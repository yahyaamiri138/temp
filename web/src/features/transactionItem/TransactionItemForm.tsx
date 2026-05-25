import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

const TransactionItemForm = ({
  visible,
  onHide,
  onSubmit,
  initialData,
  isEditMode,
}: any) => {
  const [item, setItem] = useState<any>({});
  const { t } = useTranslation();
  useEffect(() => {
    setItem(initialData || {});
  }, [initialData]);

  return (
    <Dialog header={t("transaction.item")} visible={visible} onHide={onHide}>
      <div className="mb-3">
        <label>{t("transaction.product")}</label>
        <InputText
          value={item?.productName || ""}
          onChange={(e) => setItem({ ...item, productName: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label>{t("transaction.quantity")}</label>
        <InputText
          value={item?.quantity || ""}
          onChange={(e) => setItem({ ...item, quantity: e.target.value })}
        />
      </div>

      <Button
        label={isEditMode ? t("transaction.update") : t("transaction.create")}
        onClick={() => onSubmit(item, isEditMode)}
      />
    </Dialog>
  );
};

export default TransactionItemForm;
