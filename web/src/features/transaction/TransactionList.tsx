import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import {
  fetchTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "./transactionSlice";
import TransactionForm from "./TransactionForm";
import TransactionView from "./TransactionView";
import type { AppDispatch, RootState } from "../../app/stores";
import { fetchProducts } from "../product/productSlice";
import { fetchParties } from "../party/partySlice";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";
import { useTranslation } from "react-i18next";

const TransactionList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: any) => state.transaction);
  const [formVisible, setFormVisible] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);
  const [viewTransaction, setViewTransaction] = useState<any>(null);
  const { t, i18n } = useTranslation();
  const toastRef = useRef<Toast>(null);

  const { list: parties } = useSelector((state: RootState) => state.party);
  const { products } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchParties());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = async (data: any, editMode: boolean) => {
    try {
      if (editMode) {
        await dispatch(updateTransaction(data));
        toastRef.current?.show({
          severity: "success",
          summary: t("transaction.updated"),
          detail: t("transaction.updatedSuccess"),
          life: 3000,
        });
      } else {
        await dispatch(createTransaction(data));
        toastRef.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Transaction Created Successfully",
          life: 3000,
        });
      }

      setFormVisible(false);
      await dispatch(fetchTransactions());
    } catch (error) {
      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: editMode
          ? "Failed to update transaction"
          : "Failed to create transaction",
        life: 4000,
      });
      console.error("Transaction submission failed:", error);
    }
  };

  const handleDelete = (id: number) => {
    confirmDialog({
      message: "Are you sure you want to delete this transaction?",
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Yes, Delete",
      rejectLabel: "Cancel",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          await dispatch(deleteTransaction(id));
          toastRef.current?.show({
            severity: "success",
            summary: "Deleted",
            detail: "Transaction deleted successfully",
            life: 3000,
          });
          dispatch(fetchTransactions());
        } catch (error) {
          toastRef.current?.show({
            severity: "error",
            summary: "Error",
            detail: "Failed to delete transaction",
            life: 4000,
          });
        }
      },
    });
  };

  const handleView = (row: any) => {
    setViewTransaction(row);
    setViewVisible(true);
  };

  const handleEdit = (row: any) => {
    setSelected({
      ...row,
      partyId: row.party?.id,
      date: row.date ? new Date(row.date) : new Date(),
    });
    setIsEditMode(true);
    setFormVisible(true);
  };

  const totalAmountBody = (row: any) => {
    return `$${row.totalAmount?.toLocaleString() || 0}`;
  };

  return (
    <div className="card">
      <div className="card-body">
        <Toast ref={toastRef} />

        <div className="d-flex justify-content-between mb-3">
          <h5>Transactions</h5>
          <Button
            label="Add Transaction"
            icon="pi pi-plus"
            className="rounded"
            size="small"
            onClick={() => {
              setSelected(null);
              setIsEditMode(false);
              setFormVisible(true);
            }}
          />
        </div>

        <DataTable
          value={Array.isArray(list) ? list : []}
          paginator
          rows={5}
          responsiveLayout="scroll"
          emptyMessage="No Transactions Found"
        >
          <Column field="id" header="ID" sortable />
          <Column field="party.name" header="Party" sortable />
          <Column field="type" header="Type" sortable />
          <Column field="paymentType" header="Payment Type" sortable />
          <Column
            field="date"
            header="Date"
            body={(row) =>
              row.date ? new Date(row.date).toLocaleString() : "-"
            }
            sortable
          />
          <Column
            field="totalAmount"
            header="Total Amount"
            body={totalAmountBody}
            sortable
          />
          <Column
            field="items"
            header="Items Count"
            body={(row) => row.items?.length || 0}
          />
          <Column
            header="Actions"
            body={(row) => (
              <div className="d-flex gap-3">
                <i
                  className="pi pi-eye text-info"
                  style={{ cursor: "pointer", fontSize: "1.2rem" }}
                  title="View"
                  onClick={() => handleView(row)}
                />
                <i
                  className="pi pi-pencil text-primary"
                  style={{ cursor: "pointer", fontSize: "1.2rem" }}
                  title="Edit"
                  onClick={() => handleEdit(row)}
                />
                <i
                  className="pi pi-trash text-danger"
                  style={{ cursor: "pointer", fontSize: "1.2rem" }}
                  title="Delete"
                  onClick={() => handleDelete(row.id)}
                />
              </div>
            )}
          />
        </DataTable>

        <TransactionForm
          visible={formVisible}
          onHide={() => setFormVisible(false)}
          onSubmit={handleSubmit}
          parties={parties}
          products={products}
          initialData={selected}
          isEditMode={isEditMode}
          isViewMode={false}
        />

        <TransactionView
          visible={viewVisible}
          onHide={() => setViewVisible(false)}
          transaction={viewTransaction}
        />
      </div>
    </div>
  );
};

export default TransactionList;
