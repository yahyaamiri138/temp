import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

const TransactionForm = ({
  visible,
  onHide,
  onSubmit,
  parties,
  products,
  initialData,
  isEditMode,
}: any) => {
  const [transaction, setTransaction] = useState<any>({
    partyId: null,
    type: "SELL",
    paymentType: "CASH",
    items: [],
  });

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);

  const addItem = () => {
    if (!selectedProduct) return;

    const newItem = {
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      quantity,
      price,
    };

    setTransaction({
      ...transaction,
      items: [...transaction.items, newItem],
    });

    // Reset fields
    setSelectedProduct(null);
    setQuantity(1);
    setPrice(0);
  };

  useEffect(() => {
    if (initialData) {
      setTransaction(initialData);
    }
  }, [initialData]);

  return (
    <Dialog
      header={isEditMode ? "Edit Transaction" : "Create Transaction"}
      visible={visible}
      style={{ width: "850px" }}
      onHide={onHide}
      className="p-fluid"
    >
      <div className="container-fluid">
        {/* Row 1: Party + Transaction Type */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">Party</label>
            <Dropdown
              value={transaction.partyId}
              options={parties}
              optionLabel="name"
              optionValue="id"
              onChange={(e) =>
                setTransaction({ ...transaction, partyId: e.value })
              }
              placeholder="Select Party"
              className="w-100"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Transaction Type</label>
            <Dropdown
              value={transaction.type}
              options={[
                { label: "SELL", value: "SELL" },
                { label: "BUY", value: "BUY" },
              ]}
              onChange={(e) =>
                setTransaction({ ...transaction, type: e.value })
              }
              className="w-100"
            />
          </div>
        </div>

        {/* Row 2: Payment Type + Product */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">Payment Type</label>
            <Dropdown
              value={transaction.paymentType}
              options={[
                { label: "CASH", value: "CASH" },
                { label: "CREDIT", value: "CREDIT" },
              ]}
              onChange={(e) =>
                setTransaction({ ...transaction, paymentType: e.value })
              }
              className="w-100"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Product</label>
            <Dropdown
              value={selectedProduct}
              options={products}
              optionLabel="name"
              onChange={(e) => setSelectedProduct(e.value)}
              placeholder="Select Product"
              className="w-100"
            />
          </div>
        </div>

        {/* Row 3: Quantity + Price + Add Button */}
        <div className="row mb-4 align-items-end">
          <div className="col-md-5">
            <label className="form-label fw-bold">Quantity</label>
            <InputNumber
              value={quantity}
              onValueChange={(e) => setQuantity(e.value || 1)}
              min={1}
              className="w-100"
            />
          </div>
          <div className="col-md-5">
            <label className="form-label fw-bold">Price</label>
            <InputNumber
              value={price}
              onValueChange={(e) => setPrice(e.value || 0)}
              mode="currency"
              currency="USD"
              className="w-100"
            />
          </div>
          <div className="col-md-2 ">
            <label className="form-label fw-bold invisible">Action</label>
            <Button
              label="Add"
              icon="pi pi-plus"
              size="small"
              onClick={addItem}
              disabled={!selectedProduct}
              className="w-100 rounded"
              style={{ marginBottom: "1.5px" }}
            />
          </div>
        </div>

        {/* Items List - Full Width */}
        <div className="row mb-4">
          <div className="col-12">
            <label className="form-label fw-bold mb-2">Items</label>

            {transaction.items.length === 0 ? (
              <p className="text-muted border p-3 rounded">
                No items added yet.
              </p>
            ) : (
              <ul className="list-group">
                {transaction.items.map((item: any, index: number) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{item.productName}</strong> × {item.quantity}
                    </div>
                    <div className="text-primary fw-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        label={isEditMode ? "Update Transaction" : "Save Transaction"}
        icon="pi pi-check"
        className="w-100 mt-3"
        onClick={() => onSubmit(transaction)}
      />
    </Dialog>
  );
};

export default TransactionForm;
