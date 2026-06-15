import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AllRequests from "./pages/AllRequests";
import Register from "./pages/Register";
import CreateRequest from "./pages/CreateRequest";
import MyRequests from "./pages/MyRequests";
import AcceptedRequests from "./pages/AcceptedRequests";
import RequestDetails from "./pages/RequestDetails";
import RecommendedDonors from "./pages/RecommendedDonors";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminUsers from "./pages/AdminUsers";
import AdminRequests from "./pages/AdminRequests";
import AIChat from "./pages/AIChat";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./components/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            duration: 3000,
            style: { background: "#ecfdf5", color: "#065f46" },
          },
          error: {
            duration: 4000,
            style: { background: "#fef2f2", color: "#991b1b" },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-request"
          element={
            <ProtectedRoute>
              <CreateRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-requests"
          element={
            <ProtectedRoute>
              <AllRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-requests"
          element={
            <ProtectedRoute>
              <MyRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accepted-requests"
          element={
            <ProtectedRoute>
              <AcceptedRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-chat"
          element={
            <ProtectedRoute>
              <AIChat />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="requests" element={<AdminRequests />} />
        </Route>
        <Route
          path="/details/:id"
          element={
            <ProtectedRoute>
              <RequestDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommended-donors/:requestId"
          element={
            <ProtectedRoute>
              <RecommendedDonors />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
