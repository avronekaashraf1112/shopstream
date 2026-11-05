import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Customer Pages
import HomePage from "./pages/customer/HomePage";
import AllProductsPage from "./pages/customer/AllProductsPage";
import ProductDetailsPage from "./pages/customer/ProductDetailsPage";
import CartPage from "./pages/customer/CartPage";
import EmptyStatesPage from "./pages/customer/EmptyStatesPage";
import CheckoutPage from "./pages/customer/CheckoutPage";
import OrderConfirmationPage from "./pages/customer/OrderConfirmationPage";
import LoginPage from "./pages/customer/LoginPage";
import RegisterPage from "./pages/customer/RegisterPage";
import UserProfilePage from "./pages/customer/UserProfilePage";

// Admin Pages
import CartManagementPage from "./pages/admin/CartManagementPage";
import ProductInventoryPage from "./pages/admin/ProductInventoryPage";
import UserDirectoryPage from "./pages/admin/UserDirectoryPage";
import DashboardPage from "./pages/admin/DashboardPage";
import AuthenticationPage from "./pages/admin/AuthenticationPage";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Customer Routes */}
        <Route
          path="/"
          element={
            <CustomerLayout>
              <HomePage />
            </CustomerLayout>
          }
        />
        <Route
          path="/home"
          element={
            <CustomerLayout>
              <HomePage />
            </CustomerLayout>
          }
        />
        <Route
          path="/products"
          element={
            <CustomerLayout>
              <AllProductsPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/products/:id"
          element={
            <CustomerLayout>
              <ProductDetailsPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <CustomerLayout>
              <CartPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/empty-states"
          element={
            <CustomerLayout>
              <EmptyStatesPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CustomerLayout>
                <CheckoutPage />
              </CustomerLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <ProtectedRoute>
              <CustomerLayout>
                <OrderConfirmationPage />
              </CustomerLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <CustomerLayout>
              <LoginPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/register"
          element={
            <CustomerLayout>
              <RegisterPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <CustomerLayout>
                <UserProfilePage />
              </CustomerLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <CustomerLayout>
                <UserProfilePage />
              </CustomerLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "moderator"]}>
              <AdminLayout>
                <DashboardPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/carts"
          element={
            <ProtectedRoute allowedRoles={["admin", "moderator"]}>
              <AdminLayout>
                <CartManagementPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/inventory"
          element={
            <ProtectedRoute allowedRoles={["admin", "moderator"]}>
              <AdminLayout>
                <ProductInventoryPage defaultModal={null} />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <ProtectedRoute allowedRoles={["admin", "moderator"]}>
              <AdminLayout>
                <ProductInventoryPage defaultModal="add" />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-product"
          element={
            <ProtectedRoute allowedRoles={["admin", "moderator"]}>
              <AdminLayout>
                <ProductInventoryPage defaultModal="edit" />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/delete-product"
          element={
            <ProtectedRoute allowedRoles={["admin", "moderator"]}>
              <AdminLayout>
                <ProductInventoryPage defaultModal="delete" />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin", "moderator"]}>
              <AdminLayout>
                <UserDirectoryPage defaultModal={null} />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-user"
          element={
            <ProtectedRoute allowedRoles={["admin", "moderator"]}>
              <AdminLayout>
                <UserDirectoryPage defaultModal="add" />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/delete-user"
          element={
            <ProtectedRoute allowedRoles={["admin", "moderator"]}>
              <AdminLayout>
                <UserDirectoryPage defaultModal="delete" />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/authentication"
          element={
            <ProtectedRoute allowedRoles={["admin", "moderator"]}>
              <AdminLayout>
                <AuthenticationPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
