// import { useState, useEffect } from "react";
// import { Dialog } from "primereact/dialog";
// import { Button } from "primereact/button";
// import { Dropdown } from "primereact/dropdown";
// import { InputNumber } from "primereact/inputnumber";
// import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../product/productSlice";
// import type { AppDispatch } from "../../app/stores";

// interface TransactionItemRequest {
//   productId: number | null;
//   quantity: number | null;
//   price: number | null;
// }

// const TransactionItemForm = ({
//   visible,
//   onHide,
//   onSubmit,
//   initialData,
//   isEditMode,
// }: any) => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch<AppDispatch>();

//   const { list: products } = useSelector((state: any) => state.product);

//   const [item, setItem] = useState<TransactionItemRequest>({
//     productId: null,
//     quantity: null,
//     price: null,
//   });

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   useEffect(() => {
//     if (initialData) {
//       setItem({
//         productId: initialData.product?.id || null,
//         quantity: initialData.quantity || null,
//         price: initialData.price || null,
//       });
//     } else {
//       setItem({
//         productId: null,
//         quantity: null,
//         price: null,
//       });
//     }
//   }, [initialData]);

//   return (
//     <Dialog
//       header={t("transaction.item")}
//       visible={visible}
//       onHide={onHide}
//       style={{ width: "500px" }}
//     >
//       <div className="mb-3">
//         <label className="mb-2 d-block">{t("transaction.product")}</label>

//         <Dropdown
//           value={item.productId}
//           options={products}
//           optionLabel="name"
//           optionValue="id"
//           placeholder={t("transaction.selectProduct")}
//           className="w-100"
//           onChange={(e) =>
//             setItem({
//               ...item,
//               productId: e.value,
//             })
//           }
//         />
//       </div>

//       <div className="mb-3">
//         <label className="mb-2 d-block">{t("transaction.quantity")}</label>

//         <InputNumber
//           value={item.quantity}
//           className="w-100"
//           onValueChange={(e) =>
//             setItem({
//               ...item,
//               quantity: e.value ?? 0,
//             })
//           }
//         />
//       </div>

//       <div className="mb-3">
//         <label className="mb-2 d-block">{t("transaction.price")}</label>

//         <InputNumber
//           value={item.price}
//           className="w-100"
//           mode="decimal"
//           minFractionDigits={2}
//           onValueChange={(e) =>
//             setItem({
//               ...item,
//               price: e.value ?? 0,
//             })
//           }
//         />
//       </div>

//       <Button
//         label={isEditMode ? t("transaction.update") : t("transaction.create")}
//         className="w-100"
//         onClick={() => onSubmit(item, isEditMode)}
//       />
//     </Dialog>
//   );
// };

// export default TransactionItemForm;

import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../product/productSlice";
import type { AppDispatch } from "../../app/stores";

interface TransactionItemRequest {
  productId: number | null;
  quantity: number | null;
  price: number | null;
}

const TransactionItemForm = ({
  visible,
  onHide,
  onSubmit,
  initialData,
  isEditMode,
}: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector((state: any) => state.products?.products || []);

  const [item, setItem] = useState<TransactionItemRequest>({
    productId: null,
    quantity: null,
    price: null,
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (initialData) {
      setItem({
        productId: initialData.product?.id || null,
        quantity: initialData.quantity || null,
        price: initialData.price || null,
      });
    } else {
      setItem({
        productId: null,
        quantity: null,
        price: null,
      });
    }
  }, [initialData, visible]);

  return (
    <Dialog
      header={
        isEditMode ? t("transaction.editItem") : t("transaction.createItem")
      }
      visible={visible}
      onHide={onHide}
      style={{ width: "600px" }}
      className="p-fluid"
    >
      <div className="container-fluid">
        {/* PRODUCT */}
        <div className="row mb-3">
          <div className="col-12">
            <label className="form-label fw-bold">
              {t("transaction.product")}
            </label>

            <Dropdown
              value={item.productId}
              options={products}
              optionLabel="name"
              optionValue="id"
              placeholder={t("transaction.selectProduct")}
              className="w-100"
              onChange={(e) => setItem({ ...item, productId: e.value })}
            />
          </div>
        </div>

        {/* QUANTITY + PRICE */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">
              {t("transaction.quantity")}
            </label>

            <InputNumber
              value={item.quantity}
              className="w-100"
              min={1}
              onValueChange={(e) =>
                setItem({ ...item, quantity: e.value ?? 1 })
              }
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">
              {t("transaction.price")}
            </label>

            <InputNumber
              value={item.price}
              className="w-100"
              mode="decimal"
              minFractionDigits={2}
              onValueChange={(e) => setItem({ ...item, price: e.value ?? 0 })}
            />
          </div>
        </div>
      </div>

      <Button
        label={isEditMode ? t("transaction.update") : t("transaction.create")}
        icon="pi pi-check"
        className="w-100 mt-3"
        onClick={() => onSubmit(item, isEditMode)}
      />
    </Dialog>
  );
};

export default TransactionItemForm;
