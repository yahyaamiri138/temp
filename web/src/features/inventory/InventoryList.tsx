import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { fetchInventory } from "./inventorySlice";
import type { AppDispatch } from "../../app/stores";

const InventoryList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: any) => state.inventory);

  useEffect(() => {
    dispatch(fetchInventory());
  }, []);

  return (
    <div className="card">
      <h5>Inventory</h5>
      <DataTable value={list}>
        <Column field="id" header="ID" />
        <Column field="product.name" header="Product" />
        <Column field="quantity" header="Quantity" />
      </DataTable>
    </div>
  );
};

export default InventoryList;
