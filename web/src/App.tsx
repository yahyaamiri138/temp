// import { Routes, Route, Navigate } from "react-router-dom";
// import AdminLayout from "./layouts/AdminLayout";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import Auth from "./pages/Auth";
// import Dashboard from "./pages/Dashboard";
// import UserList from "./pages/UserList";
// import RegisterForm from "./pages/RegisterForm";
// import Reports from "./pages/Report";
// import CategoryList from "./pages/CategoryList";
// import ProductList from "./pages/ProductList";
// import DebtList from "./pages/DebtList";
// import PartyList from "./pages/PartyList";
// import InventoryList from "./pages/InventoryList";
// import TransactionList from "./pages/TransactionList";
// import TransactionItemList from "./pages/TransactionItemList";

// function App() {
//   return (
//     <Routes>
//       {/* Default redirect */}
//       <Route path="/" element={<Navigate to="/auth" replace />} />

//       {/* Public Route */}
//       <Route path="/auth" element={<Auth />} />
//       <Route path="/register" element={<RegisterForm />} />
//       {/* Protected Routes - All inside AdminLayout */}
//       <Route
//         path="/"
//         element={
//           <ProtectedRoute>
//             <AdminLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="dashboard" element={<Dashboard />} />
//         <Route path="users" element={<UserList />} />
//         <Route path="reports" element={<Reports />} />

//         <Route path="products" element={<ProductList />} />
//         <Route path="categories" element={<CategoryList />} />

//         <Route path="debts" element={<DebtList />} />
//         <Route path="parties" element={<PartyList />} />
//         <Route path="inventory" element={<InventoryList />} />
//         <Route path="transactions" element={<TransactionList />} />
//         <Route path="transaction-items" element={<TransactionItemList />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import RegisterForm from "./features/auth/RegisterForm";
import Reports from "./pages/Report";

import CategoryList from "./features/category/CategoryList";
import ProductList from "./features/product/ProductList";
import PartyList from "./features/party/PartyList";
import TransactionList from "./features/transaction/TransactionList";
import Auth from "./features/auth/Auth";
import UserList from "./features/users/UserList";
import DebtList from "./features/debt/DebtList";
import InventoryList from "./features/inventory/InventoryList";
import TransactionItemList from "./features/transactionItem/TransactionItemList";

function App() {
  return (
    <Routes>
      {/* public */}
      <Route path="/auth" element={<Auth />} />
      <Route path="/register" element={<RegisterForm />} />

      <Route path="/" element={<Navigate to="/auth" replace />} />

      {/* protected layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserList />} />
        <Route path="reports" element={<Reports />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="products" element={<ProductList />} />
        <Route path="debts" element={<DebtList />} />
        <Route path="parties" element={<PartyList />} />
        <Route path="inventory" element={<InventoryList />} />
        <Route path="transactions" element={<TransactionList />} />
        <Route path="transaction-items" element={<TransactionItemList />} />
      </Route>
    </Routes>
  );
}

export default App;
