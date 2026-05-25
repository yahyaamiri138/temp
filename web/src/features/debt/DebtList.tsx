import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";

import { fetchDebts, createDebt, updateDebt, deleteDebt } from "./debtSlice";

import DebtForm from "./DebtForm";
import DebtView from "./DebtView";

import type { AppDispatch, RootState } from "../../app/stores";
import { fetchParties } from "../party/partySlice";
import { useTranslation } from "react-i18next";

const DebtList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: RootState) => state.debt);
  const { list: parties } = useSelector((state: RootState) => state.party);
  const [formVisible, setFormVisible] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  // State برای View Dialog
  const [viewVisible, setViewVisible] = useState(false);
  const [viewDebt, setViewDebt] = useState<any>(null);
  const toastRef = useRef<Toast>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(fetchDebts());
    dispatch(fetchParties());
  }, [dispatch]);

  // ================= CREATE / UPDATE =================
  const handleSubmit = async (data: any) => {
    try {
      if (isEditMode) {
        await dispatch(updateDebt(data));

        toastRef.current?.show({
          severity: "success",
          summary: t("debts.updated"),
          detail: t("debts.debtUpdatedSuccessfully"),
        });
      } else {
        await dispatch(createDebt(data));

        toastRef.current?.show({
          severity: "success",
          summary: t("debts.created"),
          detail: t("debts.debtCreatedSuccessfully"),
        });
      }

      setFormVisible(false);

      await dispatch(fetchDebts());
    } catch (error) {
      toastRef.current?.show({
        severity: "error",
        summary: t("debts.error"),
        detail: isEditMode
          ? t("debts.failedToUpdate")
          : t("debts.failedToCreate"),
      });

      console.error(error);
    }
  };

  // ================= DELETE =================
  const handleDelete = (id: number) => {
    confirmDialog({
      message: t("debts.confirmDelete"),
      header: t("debts.deleteConfirmation"),
      icon: "pi pi-exclamation-triangle",

      accept: async () => {
        await dispatch(deleteDebt(id));

        toastRef.current?.show({
          severity: "success",
          summary: t("debts.deleted"),
          detail: t("debts.debtDeletedSuccessfully"),
        });

        dispatch(fetchDebts());
      },
    });
  };

  // ================= VIEW =================
  const handleView = (row: any) => {
    setViewDebt(row);
    setViewVisible(true);
  };

  // ================= EDIT =================
  const handleEdit = (row: any) => {
    setSelected({
      ...row,
      partyId: row.party?.id,
    });

    setIsEditMode(true);

    setFormVisible(true);
  };

  // ================= ADD =================
  const handleAdd = () => {
    setSelected({
      paidAmount: 0,
      type: "TAKE",
    });

    setIsEditMode(false);

    setFormVisible(true);
  };

  return (
    <div className="card">
      <div className="card-body">
        {/* ================= TOAST ================= */}
        <Toast ref={toastRef} />

        {/* ================= HEADER ================= */}
        <div className="d-flex justify-content-between mb-3">
          <h5>{t("debts.title")}</h5>

          <Button
            label={t("debts.addDebt")}
            icon="pi pi-plus"
            className="rounded"
            size="small"
            onClick={handleAdd}
          />
        </div>

        {/* ================= TABLE ================= */}
        <DataTable
          value={Array.isArray(list) ? list : []}
          paginator
          rows={5}
          responsiveLayout="scroll"
          emptyMessage={t("debts.noDebtsFound")}
        >
          <Column field="id" header={t("debts.id")} />

          <Column field="party.name" header={t("debts.party")} />

          <Column field="type" header={t("debts.debtType")} />

          <Column
            field="amount"
            header={t("debts.amount")}
            body={(row) => `$${row.amount?.toLocaleString() || 0}`}
          />

          <Column
            field="paidAmount"
            header={t("debts.paidAmount")}
            body={(row) => `$${row.paidAmount?.toLocaleString() || 0}`}
          />

          <Column
            field="remainingAmount"
            header={t("debts.remainingAmount")}
            body={(row) => `$${row.remainingAmount?.toLocaleString() || 0}`}
          />

          <Column field="description" header={t("debts.description")} />

          <Column
            field="dueDate"
            header={t("debts.dueDate")}
            body={(row) =>
              row.dueDate ? new Date(row.dueDate).toLocaleDateString() : "-"
            }
          />

          <Column
            field="paid"
            header={t("debts.status")}
            body={(row) => (
              <span
                className={
                  row.paid ? "text-success fw-bold" : "text-danger fw-bold"
                }
              >
                {row.paid ? t("debts.paid") : t("debts.unpaid")}
              </span>
            )}
          />

          {/* ================= ACTIONS ================= */}
          <Column
            header={t("debts.actions")}
            body={(row) => (
              <div className="d-flex gap-3">
                {/* VIEW */}
                <i
                  className="pi pi-eye text-info"
                  style={{ cursor: "pointer" }}
                  title={t("debts.view")}
                  onClick={() => handleView(row)}
                />

                {/* EDIT */}
                <i
                  className="pi pi-pencil text-primary"
                  style={{ cursor: "pointer" }}
                  title={t("debts.edit")}
                  onClick={() => handleEdit(row)}
                />

                {/* DELETE */}
                <i
                  className="pi pi-trash text-danger"
                  style={{ cursor: "pointer" }}
                  title={t("debts.delete")}
                  onClick={() => handleDelete(row.id)}
                />
              </div>
            )}
          />
        </DataTable>

        {/* ================= FORM ================= */}
        <DebtForm
          visible={formVisible}
          onHide={() => setFormVisible(false)}
          onSubmit={handleSubmit}
          parties={parties}
          initialData={selected}
          isEditMode={isEditMode}
          isViewMode={false}
        />

        {/* ================= VIEW COMPONENT ================= */}
        <DebtView
          visible={viewVisible}
          onHide={() => setViewVisible(false)}
          debt={viewDebt}
        />
      </div>
    </div>
  );
};

export default DebtList;
