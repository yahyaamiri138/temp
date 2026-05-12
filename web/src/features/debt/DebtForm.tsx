import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

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
        <InputNumber
          value={debt?.amount || ""}
          onValueChange={(e) => setDebt({ ...debt, amount: e.value })}
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
