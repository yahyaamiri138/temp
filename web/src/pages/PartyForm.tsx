import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const PartyForm = ({
  visible,
  onHide,
  onSubmit,
  initialData,
  isEditMode,
}: any) => {
  const [party, setParty] = useState<any>({});

  useEffect(() => {
    setParty(initialData || {});
  }, [initialData]);

  return (
    <Dialog
      header={isEditMode ? "Edit Party" : "Add Party"}
      visible={visible}
      style={{ width: "500px" }}
      onHide={onHide}
    >
      <div className="mb-3">
        <label>Name</label>
        <InputText
          value={party?.name || ""}
          onChange={(e) => setParty({ ...party, name: e.target.value })}
          className="w-100"
        />
      </div>

      <div className="mb-3">
        <label>Phone</label>
        <InputText
          value={party?.phone || ""}
          onChange={(e) => setParty({ ...party, phone: e.target.value })}
          className="w-100"
        />
      </div>
      <div>
        {" "}
        <Button
          label={isEditMode ? "Update" : "Create"}
          icon="pi pi-check"
          className="w-100 rounded"
          size="small"
          onClick={() => onSubmit(party, isEditMode)}
        />
      </div>
    </Dialog>
  );
};

export default PartyForm;
