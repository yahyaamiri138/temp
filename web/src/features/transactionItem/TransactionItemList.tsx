import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { fetchTransactionItems } from "./transactionItemSlice";
import type { AppDispatch } from "../../app/stores";

const TransactionItemList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { list } = useSelector((state: any) => state.transactionItem);

  useEffect(() => {
    dispatch(fetchTransactionItems());
  }, [dispatch]);

  return (
    <div className="card">
      <div className="card-body">
        <h5>Transaction Items</h5>

        <DataTable value={Array.isArray(list) ? list : []} paginator rows={5}>
          <Column field="id" header="ID" />

          <Column field="product.name" header="Product" />

          <Column field="quantity" header="Qty" />

          <Column field="price" header="Price" />

          <Column field="transaction.party.name" header="Party" />

          <Column field="transaction.type" header="Type" />

          <Column field="transaction.paymentType" header="Payment" />

          <Column
            header="Actions"
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
