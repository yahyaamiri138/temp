import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import CategoryForm from "./CategoryForm";
import type { RootState, AppDispatch } from "../../app/stores";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "./categorySlice";
import { useTranslation } from "react-i18next";

const CategoryList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: RootState) => state.category);
  const { t, i18n } = useTranslation();
  const toast = useRef<Toast>(null);

  const [formVisible, setFormVisible] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // ADD
  const handleAdd = () => {
    setSelected({ name: "" });
    setIsEditMode(false);
    setFormVisible(true);
  };

  // EDIT
  const handleEdit = (row: any) => {
    setSelected(row);
    setIsEditMode(true);
    setFormVisible(true);
  };

  // DELETE
  const handleDelete = (id: number) => {
    confirmDialog({
      message: "Are you sure?",
      accept: async () => {
        await dispatch(deleteCategory(id));
        toast.current?.show({
          severity: "success",
          summary: "Deleted",
          detail: "Category deleted",
        });
        dispatch(fetchCategories());
      },
    });
  };

  // SAVE
  const handleSubmit = async (data: any, editMode: boolean) => {
    if (editMode) {
      await dispatch(updateCategory(data));
    } else {
      await dispatch(createCategory(data));
    }
    setFormVisible(false);
    dispatch(fetchCategories());
  };

  // ACTIONS
  const actionBody = (row: any) => (
    <>
      <i
        className="pi pi-pencil text-primary me-2"
        onClick={() => handleEdit(row)}
        style={{ cursor: "pointer" }}
      />
      <i
        className="pi pi-trash text-danger"
        onClick={() => handleDelete(row.id)}
        style={{ cursor: "pointer" }}
      />
    </>
  );

  return (
    <div className="card">
      <Toast ref={toast} />
      <ConfirmDialog />

      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <h5>{t("categories.title")}</h5>
          <Button
            label={t("categories.add")}
            icon="pi pi-plus"
            className="btn btn-sm p-button-primary rounded"
            onClick={handleAdd}
          />
        </div>

        <DataTable value={list} paginator rows={5}>
          <Column field="name" header={t("categories.name")} />
          <Column header={t("categories.actions")} body={actionBody} />
        </DataTable>
      </div>

      <CategoryForm
        visible={formVisible}
        onHide={() => setFormVisible(false)}
        onSubmit={handleSubmit}
        initialData={selected}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default CategoryList;
