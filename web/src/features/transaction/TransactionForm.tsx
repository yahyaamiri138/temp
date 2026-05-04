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
}: any) => {
  const [transaction, setTransaction] = useState<any>({
    partyId: null,
    items: [],
  });

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);

  // ➕ اضافه کردن آیتم
  const addItem = () => {
    if (!selectedProduct) return;

    const newItem = {
      productId: selectedProduct.id,
      quantity,
    };

    setTransaction({
      ...transaction,
      items: [...transaction.items, newItem],
    });
  };

  return (
    <Dialog
      header="Create Transaction"
      visible={visible}
      style={{ width: "700px" }}
      onHide={onHide}
    >
      {/* Party */}
      <div className="mb-3">
        <label>Party</label>
        <Dropdown
          value={transaction.partyId}
          options={parties}
          optionLabel="name"
          optionValue="id"
          onChange={(e) => setTransaction({ ...transaction, partyId: e.value })}
          className="w-100"
        />
      </div>

      {/* Product Selection */}
      <div className="d-flex gap-2 mb-3">
        <Dropdown
          value={selectedProduct}
          options={products}
          optionLabel="name"
          onChange={(e) => setSelectedProduct(e.value)}
          placeholder="Select Product"
          className="w-50"
        />

        <InputNumber
          value={quantity}
          onValueChange={(e) => setQuantity(e.value || 1)}
        />

        <Button
          label="Add"
          className="rounded p-2"
          icon="pi pi-plus"
          size="small"
          onClick={addItem}
        />
      </div>

      {/* Items */}
      <ul>
        {transaction.items.map((item: any, index: number) => (
          <li key={index}>
            {item.productName} - {item.quantity}
          </li>
        ))}
      </ul>

      <Button
        label="Save Transaction"
        icon="pi pi-check"
        className="w-100 rounded mt-3"
        size="small"
        onClick={() => onSubmit(transaction)}
      />
    </Dialog>
  );
};

export default TransactionForm;
