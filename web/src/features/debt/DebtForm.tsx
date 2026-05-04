import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

const DebtForm = ({
  visible,
  onHide,
  onSubmit,
  parties,
  initialData,
  isEditMode,
}: any) => {
  const [debt, setDebt] = useState<any>({});

  useEffect(() => {
    setDebt(initialData || {});
  }, [initialData]);

  return (
    <Dialog header="Debt Form" visible={visible} onHide={onHide}>
      <div className="mb-3">
        <label>Amount</label>
        <InputText
          value={debt?.amount || ""}
          onChange={(e) => setDebt({ ...debt, amount: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label>Party</label>
        <Dropdown
          value={debt?.partyId}
          options={parties}
          optionLabel="name"
          optionValue="id"
          onChange={(e) => setDebt({ ...debt, partyId: e.value })}
          placeholder="Select Party"
          className="w-100"
        />
      </div>

      <Button
        label={isEditMode ? "Update" : "Create"}
        onClick={() => onSubmit(debt, isEditMode)}
      />
    </Dialog>
  );
};

export default DebtForm;
