import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { fetchDebts } from "../features/debt/debtSlice";

const DebtList = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state: any) => state.debt);

  useEffect(() => {
    dispatch(fetchDebts());
  }, []);

  return (
    <div className="card">
      <DataTable value={list}>
        <Column field="id" header="ID" />
        <Column field="amount" header="Amount" />
        <Column field="status" header="Status" />
      </DataTable>
    </div>
  );
};

export default DebtList;
