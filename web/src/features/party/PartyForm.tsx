import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

const PartyForm = ({
  visible,
  onHide,
  onSubmit,
  initialData,
  isEditMode,
}: any) => {
  const [party, setParty] = useState<any>({});
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setParty(initialData || {});
  }, [initialData]);

  const partyTypes = [
    { label: t("parties.customer"), value: "CUSTOMER" },
    { label: t("parties.supplier"), value: "SUPPLIER" },
  ];

  return (
    <Dialog
      header={isEditMode ? t("parties.editParty") : t("parties.addParty")}
      visible={visible}
      style={{ width: "500px" }}
      onHide={onHide}
      modal
    >
      <div className="mb-3">
        <label>{t("parties.name")}</label>

        <InputText
          value={party?.name || ""}
          onChange={(e) =>
            setParty({
              ...party,
              name: e.target.value,
            })
          }
          className="w-100"
        />
      </div>

      <div className="mb-3">
        <label>{t("parties.phone")}</label>

        <InputText
          value={party?.phone || ""}
          onChange={(e) =>
            setParty({
              ...party,
              phone: e.target.value,
            })
          }
          className="w-100"
        />
      </div>

      <div className="mb-3">
        <label>{t("parties.type")}</label>

        <Dropdown
          value={party?.type}
          options={partyTypes}
          optionLabel="label"
          optionValue="value"
          placeholder={t("parties.selectType")}
          className="w-100"
          onChange={(e) =>
            setParty({
              ...party,
              type: e.value,
            })
          }
        />
      </div>

      <Button
        label={isEditMode ? t("parties.updateParty") : t("parties.createParty")}
        icon="pi pi-check"
        className="w-100 rounded"
        size="small"
        onClick={() => onSubmit(party, isEditMode)}
      />
    </Dialog>
  );
};

export default PartyForm;
