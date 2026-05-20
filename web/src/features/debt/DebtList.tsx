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
          summary: "Success",
          detail: "Debt Updated Successfully",
        });
      } else {
        await dispatch(createDebt(data));

        toastRef.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Debt Created Successfully",
        });
      }

      setFormVisible(false);

      await dispatch(fetchDebts());
    } catch (error) {
      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: isEditMode ? "Failed to update debt" : "Failed to create debt",
      });

      console.error(error);
    }
  };

  // ================= DELETE =================
  const handleDelete = (id: number) => {
    confirmDialog({
      message: "Are you sure you want to delete this debt?",
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",

      accept: async () => {
        await dispatch(deleteDebt(id));

        toastRef.current?.show({
          severity: "success",
          summary: "Deleted",
          detail: "Debt Deleted Successfully",
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
          <h5>Debts</h5>

          <Button
            label="Add Debt"
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
          emptyMessage="No Debts Found"
        >
          <Column field="id" header="ID" />

          <Column field="party.name" header="Party" />

          <Column field="type" header="Debt Type" />

          <Column
            field="amount"
            header="Amount"
            body={(row) => `$${row.amount?.toLocaleString() || 0}`}
          />

          <Column
            field="paidAmount"
            header="Paid"
            body={(row) => `$${row.paidAmount?.toLocaleString() || 0}`}
          />

          <Column
            field="remainingAmount"
            header="Remaining"
            body={(row) => `$${row.remainingAmount?.toLocaleString() || 0}`}
          />

          <Column field="description" header="Description" />

          <Column
            field="dueDate"
            header="Due Date"
            body={(row) =>
              row.dueDate ? new Date(row.dueDate).toLocaleDateString() : "-"
            }
          />

          <Column
            field="paid"
            header="Status"
            body={(row) => (
              <span
                className={
                  row.paid ? "text-success fw-bold" : "text-danger fw-bold"
                }
              >
                {row.paid ? "PAID" : "UNPAID"}
              </span>
            )}
          />

          {/* ================= ACTIONS ================= */}
          <Column
            header="Actions"
            body={(row) => (
              <div className="d-flex gap-3">
                {/* VIEW */}
                <i
                  className="pi pi-eye text-info"
                  style={{ cursor: "pointer" }}
                  title="View"
                  onClick={() => handleView(row)}
                />

                {/* EDIT */}
                <i
                  className="pi pi-pencil text-primary"
                  style={{ cursor: "pointer" }}
                  title="Edit"
                  onClick={() => handleEdit(row)}
                />

                {/* DELETE */}
                <i
                  className="pi pi-trash text-danger"
                  style={{ cursor: "pointer" }}
                  title="Delete"
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
