import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import {
  fetchTransactions,
  createTransaction,
} from "../features/transaction/transactionSlice";
import TransactionForm from "./TransactionForm";

const TransactionList = () => {
  const dispatch = useDispatch<any>();
  const { list } = useSelector((state: any) => state.transaction);

  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);

  const handleSubmit = async (data: any) => {
    await dispatch(createTransaction(data));
    setFormVisible(false);
    dispatch(fetchTransactions());
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <h5>Transactions</h5>
          <Button
            label="Add Transaction"
            icon="pi pi-plus"
            className="rounded"
            size="small"
            onClick={() => setFormVisible(true)}
          />
        </div>
        <DataTable value={list}>
          <Column field="id" header="ID" />
          <Column field="totalAmount" header="Total" />
          <Column field="paymentType" header="Payment Type" />
        </DataTable>

        {/* ✅ FORM */}
        <TransactionForm
          visible={formVisible}
          onHide={() => setFormVisible(false)}
          onSubmit={handleSubmit}
          parties={[]} // بعداً وصل می‌کنیم
          products={[]} // بعداً وصل می‌کنیم
        />
      </div>
    </div>
  );
};

export default TransactionList;
