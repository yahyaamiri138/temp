// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Button } from "primereact/button";
// import { fetchTransactionItems } from "./transactionItemSlice";
// import type { AppDispatch } from "../../app/stores";
// import { useTranslation } from "react-i18next";
// import TransactionItemForm from "./TransactionItemForm";

// const TransactionItemList = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const { list } = useSelector((state: any) => state.transactionItem);
//   const { t } = useTranslation();
//   const [formVisible, setFormVisible] = useState(false);
//   const [selected, setSelected] = useState<any>(null);
//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     dispatch(fetchTransactionItems());
//   }, [dispatch]);

//   const handleSubmit = (data: any, editMode: boolean) => {
//     console.log("SUBMIT ITEM:", data);

//     if (editMode) {
//       // dispatch(updateTransactionItem(data));
//     } else {
//       // dispatch(createTransactionItem(data));
//     }

//     setFormVisible(false);
//     dispatch(fetchTransactionItems());
//   };

//   return (
//     <div className="card">
//       <div className="card-body">
//         {/* 🔵 HEADER SECTION (TITLE + BUTTON) */}
//         <div className="d-flex justify-content-between mb-3">
//           <h5>{t("transactionItems.title")}</h5>
//           <Button
//             label={t("transactionItems.add") || "Add Item"}
//             icon="pi pi-plus"
//             className="rounded"
//             size="small"
//             onClick={() => {
//               setSelected(null);
//               setIsEditMode(false);
//               setFormVisible(true);
//             }}
//           />
//         </div>

//         <DataTable
//           value={Array.isArray(list) ? list : []}
//           paginator
//           rows={5}
//           responsiveLayout="scroll"
//           emptyMessage="No Transaction Items Found"
//         >
//           <Column field="id" header={t("transactionItems.id")} />
//           <Column field="productName" header={t("transactionItems.product")} />
//           <Column field="partyName" header={t("transactionItems.party")} />
//           <Column
//             field="transactionType"
//             header={t("transactions.transactionType")}
//           />
//           <Column field="paymentType" header={t("transactions.paymentType")} />

//           {/* ACTIONS */}
//           <Column
//             header={t("transactions.actions")}
//             body={(row) => (
//               <div className="d-flex gap-3">
//                 <i
//                   className="pi pi-eye text-info"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => console.log("VIEW", row)}
//                 />
//                 <i
//                   className="pi pi-pencil text-primary"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => console.log("EDIT", row)}
//                 />
//                 <i
//                   className="pi pi-trash text-danger"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => console.log("DELETE", row.id)}
//                 />
//               </div>
//             )}
//           />
//         </DataTable>
//       </div>
//     </div>
//   );
// };

// export default TransactionItemList;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import {
  createTransactionItem,
  deleteTransactionItem,
  fetchTransactionItems,
  updateTransactionItem,
} from "./transactionItemSlice";
import type { AppDispatch } from "../../app/stores";
import { useTranslation } from "react-i18next";
import TransactionItemForm from "./TransactionItemForm";
import TransactionItemView from "./TransactionItemView";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { confirmDialog } from "primereact/confirmdialog";
import "primereact/resources/primereact.min.css";

const TransactionItemList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toastRef = useRef<Toast>(null);
  const { list } = useSelector((state: any) => state.transactionItem);
  const { t } = useTranslation();

  const [formVisible, setFormVisible] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);
  const [viewItem, setViewItem] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchTransactionItems());
  }, [dispatch]);

  const openCreate = () => {
    setSelected(null);
    setIsEditMode(false);
    setFormVisible(true);
  };

  const openEdit = (row: any) => {
    setSelected(row);
    setIsEditMode(true);
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
    setSelected(null);
    setIsEditMode(false);
  };

  const handleView = (row: any) => {
    setViewItem(row);
    setViewVisible(true);
  };

  const closeView = () => {
    setViewItem(null);
    setViewVisible(false);
  };

  const handleSubmit = async (data: any, editMode: boolean) => {
    try {
      if (editMode) {
        await dispatch(updateTransactionItem(data));
        toastRef.current?.show({
          severity: "success",
          summary: "Updated",
          detail: "Item updated successfully",
          life: 3000,
        });
      } else {
        await dispatch(createTransactionItem(data));
        toastRef.current?.show({
          severity: "success",
          summary: "Created",
          detail: "Item created successfully",
          life: 3000,
        });
      }
      setFormVisible(false);
      dispatch(fetchTransactionItems());
    } catch (e) {
      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Operation failed",
        life: 3000,
      });
    }
  };

  const handleDelete = (id: number) => {
    confirmDialog({
      message: "Are you sure you want to delete this item?",
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",

      accept: async () => {
        try {
          await dispatch(deleteTransactionItem(id)).unwrap();
          await dispatch(fetchTransactionItems());

          toastRef.current?.show({
            severity: "success",
            summary: "Deleted",
            detail: "Item deleted successfully",
          });
        } catch (err) {
          toastRef.current?.show({
            severity: "error",
            summary: "Error",
            detail: "Delete failed",
          });
        }
      },
    });
  };

  return (
    <div className="card">
      <Toast ref={toastRef} />
      <div className="card-body">
        {/* HEADER */}
        <div className="d-flex justify-content-between mb-3">
          <h5>{t("transactionItems.title")}</h5>

          <Button
            label={t("transactionItems.add") || "Add Item"}
            icon="pi pi-plus"
            className="rounded"
            size="small"
            onClick={openCreate}
          />
        </div>

        {/* TABLE */}
        <DataTable
          value={Array.isArray(list) ? list : []}
          paginator
          rows={5}
          responsiveLayout="scroll"
          emptyMessage="No Transaction Items Found"
        >
          <Column field="id" header={t("transactionItems.id")} />
          <Column field="productName" header={t("transactionItems.product")} />
          <Column field="partyName" header={t("transactionItems.party")} />
          <Column
            field="transactionType"
            header={t("transactions.transactionType")}
          />
          <Column field="paymentType" header={t("transactions.paymentType")} />

          {/* ACTIONS */}
          <Column
            header={t("transactions.actions")}
            body={(row) => (
              <div className="d-flex gap-3">
                <i
                  className="pi pi-eye text-info"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleView(row)}
                />

                <i
                  className="pi pi-pencil text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => openEdit(row)}
                />

                <i
                  className="pi pi-trash text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(row.id)}
                />
              </div>
            )}
          />
        </DataTable>

        {/* FORM */}
        <TransactionItemForm
          visible={formVisible}
          onHide={closeForm}
          onSubmit={handleSubmit}
          initialData={selected}
          isEditMode={isEditMode}
        />
        <TransactionItemView
          visible={viewVisible}
          onHide={closeView}
          item={viewItem}
        />
      </div>
    </div>
  );
};

export default TransactionItemList;
