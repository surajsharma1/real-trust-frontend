import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landingpage"; // Ensure this matches your file path
import AdminLogin from "./pages/adminlogin";
import AdminDashboard from "./pages/admindashboard";
import ProtectedRoute from "./protectedroute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Facing Website */}
        <Route path="/" element={<LandingPage />} />

        {/* Admin Portal */}
        <Route path="/admin" element={<AdminLogin />} />
        
        {/* Protected Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Catch-all route to redirect unknown URLs to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}