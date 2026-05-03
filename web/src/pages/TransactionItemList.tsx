import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { fetchTransactionItems } from "../features/transactionItem/transactionItemSlice";

const TransactionItemList = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state: any) => state.transactionItem);

  useEffect(() => {
    dispatch(fetchTransactionItems());
  }, []);

  return (
    <div className="card">
      <h5>Transaction Items</h5>
      <DataTable value={list}>
        <Column field="id" header="ID" />
        <Column field="product.name" header="Product" />
        <Column field="quantity" header="Qty" />
        <Column field="price" header="Price" />
      </DataTable>
    </div>
  );
};

export default TransactionItemList;
