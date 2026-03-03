import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/UserList";
import RegisterForm from "./pages/RegisterForm";
import Reports from "./pages/Report";

function App() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/auth" replace />} />

      {/* Public Route */}
      <Route path="/auth" element={<Auth />} />
      <Route path="/register" element={<RegisterForm />} />
      {/* Protected Routes - All inside AdminLayout */}
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
        {/* Add more protected routes here */}
      </Route>
    </Routes>
  );
}

export default App;
