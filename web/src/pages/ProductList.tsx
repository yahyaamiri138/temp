import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import type { AppDispatch, RootState } from "../app/stores";
import ProductForm from "./ProductForm";
import { useTranslation } from "react-i18next";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../features/product/productSlice";
import { fetchCategories } from "../features/category/categorySlice";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products);
  const { list: categories } = useSelector(
    (state: RootState) => state.category,
  );

  const toast = useRef<Toast>(null);
  const { t, i18n } = useTranslation();

  const [formVisible, setFormVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [viewVisible, setViewVisible] = useState(false);
  const [viewProduct, setViewProduct] = useState<any>(null);

  const direction = i18n.language === "fa" ? "rtl" : "ltr";

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  // ================= DELETE =================
  const handleDelete = (id: number) => {
    confirmDialog({
      message: t("products.deleteConfirm"),
      header: t("common.confirmation"),
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        await dispatch(deleteProduct(id));
        toast.current?.show({
          severity: "success",
          summary: t("products.deleted"),
          detail: t("products.productDeletedSuccessfully"),
        });
        dispatch(fetchProducts());
      },
    });
  };

  // ================= EDIT =================
  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsEditMode(true);
    setFormVisible(true);
  };

  // ================= ADD =================
  const handleAdd = () => {
    setSelectedProduct({
      name: "",
      type: "",
      size: "",
      description: "",
      categoryId: "",
    });
    setIsEditMode(false);
    setFormVisible(true);
  };

  // ================= SAVE =================
  const handleFormSubmit = async (product: any, editMode: boolean) => {
    try {
      let result;

      if (editMode) {
        result = await dispatch(updateProduct(product));
        if (updateProduct.fulfilled.match(result)) {
          toast.current?.show({
            severity: "success",
            summary: t("products.updated"),
            detail: t("products.productUpdatedSuccessfully"),
          });
        }
      } else {
        result = await dispatch(createProduct(product));
        if (createProduct.fulfilled.match(result)) {
          toast.current?.show({
            severity: "success",
            summary: t("products.created"),
            detail: t("products.productCreatedSuccessfully"),
          });
        }
      }

      setFormVisible(false);
      dispatch(fetchProducts());
    } catch {
      toast.current?.show({
        severity: "error",
        summary: t("products.error"),
        detail: t("products.somethingWentWrong"),
      });
    }
  };

  // ================= VIEW =================
  const handleView = (product: any) => {
    setViewProduct(product);
    setViewVisible(true);
  };

  // ================= ACTION COLUMN =================
  const actionBody = (rowData: any) => (
    <div className="d-flex justify-content-start" style={{ direction: "ltr" }}>
      <i
        className="pi pi-eye text-info fs-5 me-2"
        onClick={() => handleView(rowData)}
        style={{ cursor: "pointer" }}
      />
      <i
        className="pi pi-pencil text-primary fs-5 me-2"
        onClick={() => handleEdit(rowData)}
        style={{ cursor: "pointer" }}
      />
      <i
        className="pi pi-trash text-danger fs-5"
        onClick={() => handleDelete(rowData.id)}
        style={{ cursor: "pointer" }}
      />
    </div>
  );

  return (
    <div className="card shadow-sm" dir={direction}>
      <Toast ref={toast} />
      <ConfirmDialog />

      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <h5>{t("products.title")}</h5>
          <Button
            label={t("products.add")}
            icon="pi pi-plus"
            className="btn btn-sm p-button-primary rounded"
            onClick={handleAdd}
          />
        </div>

        <DataTable
          value={products}
          paginator
          rows={5}
          responsiveLayout="scroll"
        >
          <Column field="name" header={t("products.name")} sortable />
          <Column field="type" header={t("products.type")} sortable />
          <Column field="size" header={t("products.size")} sortable />
          <Column
            field="categoryName"
            header={t("products.categoryName")}
            sortable
          />

          <Column header={t("products.actions")} body={actionBody} />
        </DataTable>
      </div>

      {/* ================= FORM ================= */}
      <ProductForm
        visible={formVisible}
        onHide={() => setFormVisible(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedProduct}
        isEditMode={isEditMode}
        categories={categories}
      />

      {/* ================= VIEW ================= */}
      <Dialog
        header={t("products.details")}
        visible={viewVisible}
        style={{ width: "80vh" }}
        onHide={() => setViewVisible(false)}
        modal
      >
        {viewProduct && (
          <Card>
            <div className="row g-3">
              <div className="col-md-6">
                <b>{t("products.name")}</b>
                <div>{viewProduct.name}</div>
              </div>

              <div className="col-md-6">
                <b>{t("products.type")}</b>
                <div>{viewProduct.type}</div>
              </div>

              <div className="col-md-6">
                <b>{t("products.size")}</b>
                <div>{viewProduct.size}</div>
              </div>

              <div className="col-md-6">
                <b>{t("products.category")}</b>
                <div>{viewProduct.categoryName}</div>
              </div>

              <div className="col-md-12">
                <b>{t("products.description")}</b>
                <div>{viewProduct.description}</div>
              </div>
            </div>
          </Card>
        )}
      </Dialog>
    </div>
  );
};

export default ProductList;
