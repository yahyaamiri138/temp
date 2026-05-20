import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";

const DebtForm = ({
  visible,
  onHide,
  onSubmit,
  parties,
  initialData,
  isEditMode,
  isViewMode = false,
}: any) => {
  const [debt, setDebt] = useState<any>({
    paidAmount: 0,
    type: "TAKE",
  });

  useEffect(() => {
    if (initialData) {
      setDebt(initialData);
    } else {
      setDebt({
        paidAmount: 0,
        type: "TAKE",
      });
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!isViewMode) {
      onSubmit(debt, isEditMode);
    }
  };

  // فرم فیلدها با قابلیت غیرفعال شدن در حالت مشاهده
  const FormField = ({ children, label, required }: any) => (
    <div className="mb-3">
      <label className="form-label fw-bold">
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>
      {children}
    </div>
  );

  return (
    <Dialog
      header={
        isViewMode ? "Debt Details" : isEditMode ? "Edit Debt" : "Add Debt"
      }
      visible={visible}
      onHide={onHide}
      style={{ width: "80vw", maxWidth: "800px" }}
      modal
      footer={
        !isViewMode && (
          <div className="d-flex justify-content-end gap-2">
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-text rounded"
              size="small"
              onClick={onHide}
            />
            <Button
              label={isEditMode ? "Update" : "Create"}
              className="rounded"
              size="small"
              icon="pi pi-check"
              onClick={handleSubmit}
            />
          </div>
        )
      }
    >
      <div className="container-fluid p-0">
        {/* ردیف 1: Amount و Party */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <FormField label="Amount" required>
              <InputNumber
                value={debt?.amount || 0}
                onValueChange={(e) =>
                  setDebt({
                    ...debt,
                    amount: e.value,
                  })
                }
                className="w-100"
                disabled={isViewMode}
                mode="currency"
                currency="USD"
                locale="en-US"
              />
            </FormField>
          </div>

          <div className="col-md-6">
            <FormField label="Party" required>
              <Dropdown
                value={debt?.partyId}
                options={parties}
                optionLabel="name"
                optionValue="id"
                onChange={(e) => setDebt({ ...debt, partyId: e.value })}
                placeholder="Select Party"
                className="w-100"
                disabled={isViewMode}
                showClear
              />
            </FormField>
          </div>
        </div>

        {/* ردیف 2: Paid Amount و Debt Type */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <FormField label="Paid Amount">
              <InputNumber
                value={debt?.paidAmount || 0}
                onValueChange={(e) =>
                  setDebt({
                    ...debt,
                    paidAmount: e.value,
                  })
                }
                className="w-100"
                disabled={isViewMode}
                mode="currency"
                currency="USD"
                locale="en-US"
              />
            </FormField>
          </div>

          <div className="col-md-6">
            <FormField label="Debt Type" required>
              <Dropdown
                value={debt?.type}
                options={[
                  { label: "TAKE (I owe)", value: "TAKE" },
                  { label: "GIVE (They owe me)", value: "GIVE" },
                ]}
                onChange={(e) =>
                  setDebt({
                    ...debt,
                    type: e.value,
                  })
                }
                className="w-100"
                disabled={isViewMode}
              />
            </FormField>
          </div>
        </div>

        {/* ردیف 3: Due Date و Remaining Amount (محاسبه خودکار) */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <FormField label="Due Date">
              <Calendar
                value={debt?.dueDate ? new Date(debt.dueDate) : null}
                onChange={(e) =>
                  setDebt({
                    ...debt,
                    dueDate: e.value,
                  })
                }
                className="w-100"
                showIcon
                dateFormat="yy-mm-dd"
                disabled={isViewMode}
              />
            </FormField>
          </div>

          <div className="col-md-6">
            <FormField label="Remaining Amount">
              <InputNumber
                value={(debt?.amount || 0) - (debt?.paidAmount || 0)}
                className="w-100"
                disabled
                mode="currency"
                currency="USD"
                locale="en-US"
              />
              {/* <small className="text-muted">
                Automatically calculated (Amount - Paid)
              </small> */}
            </FormField>
          </div>
        </div>

        {/* ردیف 4: Description (تمام عرض) */}
        <div className="row g-3 mb-3">
          <div className="col-12">
            <FormField label="Description">
              <InputText
                value={debt?.description || ""}
                onChange={(e) =>
                  setDebt({
                    ...debt,
                    description: e.target.value,
                  })
                }
                className="w-100"
                disabled={isViewMode}
              />
            </FormField>
          </div>
        </div>

        {/* نمایش وضعیت پرداخت در حالت مشاهده */}
        {isViewMode && debt && (
          <div className="row g-3 mt-2">
            <div className="col-12">
              <div className="alert alert-info">
                <div className="d-flex justify-content-between align-items-center">
                  <span>
                    <strong>Status:</strong>{" "}
                    {debt.paid ? (
                      <span className="text-success">✓ PAID</span>
                    ) : (
                      <span className="text-warning">⚠ UNPAID</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default DebtForm;
