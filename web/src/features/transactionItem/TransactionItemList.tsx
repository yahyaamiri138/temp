import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { fetchTransactionItems } from "./transactionItemSlice";
import type { AppDispatch } from "../../app/stores";
import { useTranslation } from "react-i18next";

const TransactionItemList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { list } = useSelector((state: any) => state.transactionItem);
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(fetchTransactionItems());
  }, [dispatch]);

  return (
    <div className="card">
      <div className="card-body">
        <h5>{t("transactionItems.title")}</h5>

        <DataTable value={Array.isArray(list) ? list : []} paginator rows={5}>
          <Column field="id" header={t("transactionItems.id")} />
          <Column field="product.name" header={t("transactionItems.product")} />
          <Column field="quantity" header={t("transactionItems.quantity")} />
          <Column field="price" header={t("transactionItems.price")} />
          <Column
            field="transactionItems.party.name"
            header={t("transactionItems.party")}
          />
          <Column
            field="transactionItems.type"
            header={t("transactionItems.type")}
          />
          <Column
            field="transactionItems.paymentType"
            header={t("transactionItems.paymentType")}
          />
          <Column
            header={t("transactionItems.actions")}
            body={(row) => (
              <div className="d-flex gap-3">
                {/* VIEW */}
                <i
                  className="pi pi-eye text-info"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    console.log("VIEW ITEM:", row);
                  }}
                />

                {/* EDIT */}
                <i
                  className="pi pi-pencil text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    console.log("EDIT ITEM:", row);
                  }}
                />

                {/* DELETE */}
                <i
                  className="pi pi-trash text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    console.log("DELETE ITEM:", row.id);
                  }}
                />
              </div>
            )}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default TransactionItemList;
