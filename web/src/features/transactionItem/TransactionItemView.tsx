import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { useTranslation } from "react-i18next";

interface Props {
  visible: boolean;
  onHide: () => void;
  item: any;
}

const TransactionItemView = ({ visible, onHide, item }: Props) => {
  const { t } = useTranslation();

  if (!item) return null;

  const subtotal = (item.quantity || 0) * (item.price || 0);

  const footer = (
    <div className="d-flex justify-content-end">
      <Button
        label={t("common.close") || "Close"}
        icon="pi pi-times"
        className="p-button-text"
        onClick={onHide}
      />
    </div>
  );

  return (
    <Dialog
      header={t("transaction.itemDetails") || "Item Details"}
      visible={visible}
      onHide={onHide}
      style={{ width: "600px" }}
      modal
      footer={footer}
    >
      <Card>
        <div className="row g-3">
          <div className="col-md-6">
            <b>ID</b>
            <div>{item.id}</div>
          </div>

          <div className="col-md-6">
            <b>Product</b>
            <div>{item.productName || "-"}</div>
          </div>

          <div className="col-md-6">
            <b>Party</b>
            <div>{item.partyName || "-"}</div>
          </div>

          <div className="col-md-6">
            <b>Transaction Type</b>
            <div>
              <Tag value={item.transactionType} />
            </div>
          </div>

          <div className="col-md-6">
            <b>Payment Type</b>
            <div>
              <Tag value={item.paymentType} />
            </div>
          </div>

          <div className="col-md-6">
            <b>Quantity</b>
            <div>{item.quantity}</div>
          </div>

          <div className="col-md-6">
            <b>Price</b>
            <div>${item.price}</div>
          </div>

          <div className="col-md-12">
            <b>Subtotal</b>
            <div className="fw-bold text-primary">
              ${subtotal.toLocaleString()}
            </div>
          </div>
        </div>
      </Card>
    </Dialog>
  );
};

export default TransactionItemView;
