import { Navigate } from "react-router-dom";
import { isAdmin, isAuthenticated } from "../services/auth";

function AdminRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default AdminRoute;
