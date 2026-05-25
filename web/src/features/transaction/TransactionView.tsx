import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { useTranslation } from "react-i18next";

interface TransactionViewProps {
  visible: boolean;
  onHide: () => void;
  transaction: any;
}

const TransactionView = ({
  visible,
  onHide,
  transaction,
}: TransactionViewProps) => {
  const { t } = useTranslation();

  if (!transaction) return null;

  const typeBodyTemplate = (rowData: any) => {
    return (
      <Tag
        value={rowData.type}
        severity={rowData.type === "SELL" ? "success" : "info"}
      />
    );
  };

  const paymentTypeBodyTemplate = (rowData: any) => {
    return (
      <Tag
        value={rowData.paymentType}
        severity={rowData.paymentType === "CASH" ? "info" : "warning"}
      />
    );
  };

  const priceBodyTemplate = (rowData: any) => {
    return `$${rowData.price?.toLocaleString() || 0}`;
  };

  const subtotalBodyTemplate = (rowData: any) => {
    return (
      <span className="fw-bold">
        ${(rowData.quantity * rowData.price)?.toLocaleString() || 0}
      </span>
    );
  };

  const footer = (
    <div className="d-flex justify-content-end">
      <Button
        label={t("common.close")}
        icon="pi pi-times"
        className="p-button-text"
        onClick={onHide}
      />
    </div>
  );

  return (
    <Dialog
      header={t("transaction.details")}
      visible={visible}
      style={{ width: "85vw", maxWidth: "1000px" }}
      onHide={onHide}
      modal
      footer={footer}
    >
      <Card>
        <div className="row g-4">
          {/* Basic Info */}
          <div className="col-md-6">
            <b>ID</b>
            <div className="mt-1">{transaction.id}</div>
          </div>

          <div className="col-md-6">
            <b>Party</b>
            <div className="mt-1">{transaction.party?.name || "-"}</div>
          </div>

          <div className="col-md-6">
            <b>Type</b>
            <div className="mt-2">{typeBodyTemplate(transaction)}</div>
          </div>

          <div className="col-md-6">
            <b>Payment Type</b>
            <div className="mt-2">{paymentTypeBodyTemplate(transaction)}</div>
          </div>

          <div className="col-md-6">
            <b>Date</b>
            <div className="mt-1">
              {transaction.date
                ? new Date(transaction.date).toLocaleString()
                : "-"}
            </div>
          </div>

          <div className="col-md-6">
            <b>Total Amount</b>
            <div className="mt-1 text-primary fw-bold fs-5">
              ${transaction.totalAmount?.toLocaleString() || 0}
            </div>
          </div>

          {/* Items Table */}
          <div className="col-12">
            <h5 className="mb-3">{t("transaction.items")}</h5>

            <DataTable
              value={transaction.items || []}
              responsiveLayout="scroll"
              stripedRows
              showGridlines
              size="small"
              emptyMessage={t("common.noData")}
              footer={
                <div className="d-flex justify-content-end fw-bold">
                  <span className="me-3">Grand Total:</span>
                  <span className="text-primary">
                    ${transaction.totalAmount?.toLocaleString() || 0}
                  </span>
                </div>
              }
            >
              <Column
                header="#"
                body={(_, options) => options.rowIndex + 1}
                style={{ width: "70px" }}
              />

              <Column field="productName" header={t("transaction.product")} />

              <Column field="quantity" header={t("transaction.quantity")} />

              <Column
                field="price"
                header={t("transaction.price")}
                body={priceBodyTemplate}
              />

              <Column
                header={t("transaction.subtotal")}
                body={subtotalBodyTemplate}
              />
            </DataTable>
          </div>

          {/* Extra Info */}
          {transaction.createdAt && (
            <div className="col-md-6">
              <b>Created At</b>
              <div className="mt-1">
                {new Date(transaction.createdAt).toLocaleString()}
              </div>
            </div>
          )}

          {transaction.updatedAt && (
            <div className="col-md-6">
              <b>Last Updated</b>
              <div className="mt-1">
                {new Date(transaction.updatedAt).toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </Card>
    </Dialog>
  );
};

export default TransactionView;
