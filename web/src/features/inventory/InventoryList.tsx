import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import type { AppDispatch, RootState } from "../../app/stores";

import InventoryForm from "./InventoryForm";

import {
  fetchInventory,
  createInventory,
  updateInventory,
  deleteInventory,
} from "./inventorySlice";

import { fetchProducts } from "../product/productSlice";

const InventoryList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { list } = useSelector((state: RootState) => state.inventory);

  const { products } = useSelector((state: RootState) => state.products);

  const [formVisible, setFormVisible] = useState(false);

  const [selected, setSelected] = useState<any>(null);

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchInventory());
    dispatch(fetchProducts());
  }, [dispatch]);

  // ================= ADD =================
  const handleAdd = () => {
    setSelected({
      productId: null,
      quantity: 0,
    });

    setIsEditMode(false);
    setFormVisible(true);
  };

  // ================= EDIT =================
  const handleEdit = (row: any) => {
    setSelected({
      id: row.id,
      productId: row.product?.id,
      quantity: row.quantity,
    });

    setIsEditMode(true);
    setFormVisible(true);
  };

  // ================= DELETE =================
  const handleDelete = async (id: number) => {
    await dispatch(deleteInventory(id));
    dispatch(fetchInventory());
  };

  // ================= SAVE =================
  const handleSubmit = async (data: any, editMode: boolean) => {
    if (editMode) {
      await dispatch(updateInventory(data));
    } else {
      await dispatch(createInventory(data));
    }

    setFormVisible(false);

    dispatch(fetchInventory());
  };

  // ================= ACTIONS =================
  const actionBody = (row: any) => (
    <div className="d-flex gap-2">
      <i
        className="pi pi-pencil text-primary"
        style={{ cursor: "pointer" }}
        onClick={() => handleEdit(row)}
      />

      <i
        className="pi pi-trash text-danger"
        style={{ cursor: "pointer" }}
        onClick={() => handleDelete(row.id)}
      />
    </div>
  );

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <h5>Inventory</h5>

          <Button
            label="Add Inventory"
            icon="pi pi-plus"
            className="rounded"
            size="small"
            onClick={handleAdd}
          />
        </div>

        <DataTable value={list} paginator rows={5}>
          <Column field="id" header="ID" />

          <Column field="product.name" header="Product" />

          <Column field="quantity" header="Quantity" />

          <Column header="Actions" body={actionBody} />
        </DataTable>

        {/* ================= FORM ================= */}

        <InventoryForm
          visible={formVisible}
          onHide={() => setFormVisible(false)}
          onSubmit={handleSubmit}
          products={products}
          initialData={selected}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
};

export default InventoryList;
