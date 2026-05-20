import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

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
  if (!transaction) return null;

  return (
    <Dialog
      header="Transaction Details"
      visible={visible}
      style={{ width: "80vh", maxWidth: "90vw" }}
      onHide={onHide}
      modal
      footer={
        <div className="d-flex justify-content-end">
          <Button
            label="Close"
            icon="pi pi-times"
            className="p-button-text"
            onClick={onHide}
          />
        </div>
      }
    >
      <Card>
        <div className="row g-3">
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
            <div className="mt-1">
              <span
                className={`badge ${
                  transaction.type === "SELL" ? "bg-success" : "bg-primary"
                }`}
              >
                {transaction.type}
              </span>
            </div>
          </div>

          <div className="col-md-6">
            <b>Payment Type</b>
            <div className="mt-1">
              <span
                className={`badge ${
                  transaction.paymentType === "CASH" ? "bg-info" : "bg-warning"
                }`}
              >
                {transaction.paymentType}
              </span>
            </div>
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
            <div className="mt-1 text-primary fw-bold">
              ${transaction.totalAmount?.toLocaleString() || 0}
            </div>
          </div>

          <div className="col-12">
            <b>Items</b>
            <div className="mt-2">
              <div className="table-responsive">
                <table className="table table-sm table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction.items?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.productName}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price?.toLocaleString() || 0}</td>
                        <td className="fw-bold">
                          ${(item.quantity * item.price)?.toLocaleString() || 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="table-light">
                    <tr>
                      <td colSpan={4} className="text-end fw-bold">
                        Grand Total:
                      </td>
                      <td className="fw-bold text-primary">
                        ${transaction.totalAmount?.toLocaleString() || 0}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Additional Info if needed */}
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
