import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/userSlice";
import productReducer from "../features/product/productSlice";
import categoryReducer from "../features/category/categorySlice";
import debtReducer from "../features/debt/debtSlice";
import partyReducer from "../features/party/partySlice";
import inventoryReducer from "../features/inventory/inventorySlice";
import transactionReducer from "../features/transaction/transactionSlice";
import transactionItemReducer from "../features/transactionItem/transactionItemSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    products: productReducer,
    category: categoryReducer,
    debt: debtReducer,
    party: partyReducer,
    inventory: inventoryReducer,
    transaction: transactionReducer,
    transactionItem: transactionItemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
