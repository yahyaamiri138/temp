import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

interface DebtViewProps {
  visible: boolean;
  onHide: () => void;
  debt: any;
}

const DebtView = ({ visible, onHide, debt }: DebtViewProps) => {
  if (!debt) return null;

  return (
    <Dialog
      header="Debt Details"
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
            <div className="mt-1">{debt.id}</div>
          </div>

          <div className="col-md-6">
            <b>Party</b>
            <div className="mt-1">{debt.party?.name || "-"}</div>
          </div>

          <div className="col-md-6">
            <b>Debt Type</b>
            <div className="mt-1">
              <span
                className={`badge ${
                  debt.type === "TAKE" ? "bg-danger" : "bg-success"
                }`}
              >
                {debt.type === "TAKE" ? "TAKE (I owe)" : "GIVE (They owe me)"}
              </span>
            </div>
          </div>

          <div className="col-md-6">
            <b>Amount</b>
            <div className="mt-1 text-primary fw-bold">
              ${debt.amount?.toLocaleString() || 0}
            </div>
          </div>

          <div className="col-md-6">
            <b>Paid Amount</b>
            <div className="mt-1 text-success fw-bold">
              ${debt.paidAmount?.toLocaleString() || 0}
            </div>
          </div>

          <div className="col-md-6">
            <b>Remaining Amount</b>
            <div className="mt-1 text-warning fw-bold">
              ${debt.remainingAmount?.toLocaleString() || 0}
            </div>
          </div>

          <div className="col-md-12">
            <b>Description</b>
            <div className="mt-1">{debt.description || "-"}</div>
          </div>

          <div className="col-md-6">
            <b>Due Date</b>
            <div className="mt-1">
              {debt.dueDate ? new Date(debt.dueDate).toLocaleDateString() : "-"}
            </div>
          </div>

          <div className="col-md-6">
            <b>Status</b>
            <div className="mt-1">
              <span
                className={`badge ${debt.paid ? "bg-success" : "bg-danger"}`}
                style={{ fontSize: "0.9rem" }}
              >
                {debt.paid ? "PAID" : "UNPAID"}
              </span>
            </div>
          </div>

          {/* Additional Info if needed */}
          {debt.createdAt && (
            <div className="col-md-6">
              <b>Created At</b>
              <div className="mt-1">
                {new Date(debt.createdAt).toLocaleString()}
              </div>
            </div>
          )}

          {debt.updatedAt && (
            <div className="col-md-6">
              <b>Last Updated</b>
              <div className="mt-1">
                {new Date(debt.updatedAt).toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </Card>
    </Dialog>
  );
};

export default DebtView;
