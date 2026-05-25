import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import {
  fetchParties,
  deleteParty,
  createParty,
  updateParty,
} from "./partySlice";

import type { RootState, AppDispatch } from "../../app/stores";

import PartyForm from "./PartyForm";
import { useTranslation } from "react-i18next";

const PartyList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: RootState) => state.party);
  const toast = useRef<Toast>(null);
  const { t } = useTranslation();
  const [formVisible, setFormVisible] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchParties());
  }, [dispatch]);

  // ================= ADD =================
  const handleAdd = () => {
    setSelected({
      name: "",
      phone: "",
      type: "",
    });

    setIsEditMode(false);

    setFormVisible(true);
  };

  // ================= EDIT =================
  const handleEdit = (row: any) => {
    setSelected(row);

    setIsEditMode(true);

    setFormVisible(true);
  };

  // ================= DELETE =================
  const handleDelete = (id: number) => {
    confirmDialog({
      message: t("parties.confirmDelete"),
      header: t("parties.deleteConfirmation"),
      icon: "pi pi-exclamation-triangle",

      accept: async () => {
        try {
          await dispatch(deleteParty(id));

          toast.current?.show({
            severity: "success",
            summary: t("parties.deleted"),
            detail: t("parties.partyDeletedSuccessfully"),
            life: 3000,
          });

          dispatch(fetchParties());
        } catch {
          toast.current?.show({
            severity: "error",
            summary: t("parties.error"),
            detail: t("parties.failedToDeleteParty"),
            life: 3000,
          });
        }
      },
    });
  };

  // ================= SAVE =================
  const handleSubmit = async (data: any, editMode: boolean) => {
    try {
      if (editMode) {
        await dispatch(updateParty(data));

        toast.current?.show({
          severity: "success",
          summary: t("parties.updated"),
          detail: t("parties.partyUpdatedSuccessfully"),
          life: 3000,
        });
      } else {
        await dispatch(createParty(data));

        toast.current?.show({
          severity: "success",
          summary: t("parties.created"),
          detail: t("parties.partyCreatedSuccessfully"),
          life: 3000,
        });
      }

      setFormVisible(false);

      dispatch(fetchParties());
    } catch {
      toast.current?.show({
        severity: "error",
        summary: t("parties.error"),
        detail: t("parties.failedToCreateParty"),
        life: 3000,
      });
    }
  };

  return (
    <div className="card">
      {/* ✅ TOAST */}
      <Toast ref={toast} />

      {/* ✅ CONFIRM DIALOG */}
      <ConfirmDialog />

      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <h5>{t("parties.title")}</h5>

          <Button
            label={t("parties.addParty")}
            className="rounded p-2"
            icon="pi pi-plus"
            size="small"
            onClick={handleAdd}
          />
        </div>

        <DataTable value={list} paginator rows={5}>
          <Column field="name" header={t("parties.name")} />

          <Column field="phone" header={t("parties.phone")} />

          <Column field="type" header={t("parties.type")} />

          <Column
            header={t("parties.actions")}
            body={(row) => (
              <>
                {/* EDIT */}
                <i
                  className="pi pi-pencil text-primary me-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEdit(row)}
                />

                {/* DELETE */}
                <i
                  className="pi pi-trash text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(row.id)}
                />
              </>
            )}
          />
        </DataTable>

        {/* FORM */}
        <PartyForm
          visible={formVisible}
          onHide={() => setFormVisible(false)}
          onSubmit={handleSubmit}
          initialData={selected}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
};

export default PartyList;
