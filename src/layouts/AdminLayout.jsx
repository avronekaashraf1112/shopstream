import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="d-flex min-vh-100 bg-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0, backgroundColor: '#ffffff' }}>
        <main className="flex-grow-1 p-4 p-lg-5 overflow-auto">
          {children}
        </main>

        {/* Bottom subtle link strip as visible in Figma screenshot 3 */}
        <div
          className="border-top py-3 px-4 px-lg-5 d-flex align-items-center justify-content-around text-muted small"
          style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0', fontSize: '13px' }}
        >
          <Link to="/" className="text-decoration-none text-muted">Home</Link>
          <Link to="/products" className="text-decoration-none text-muted">Products</Link>
          <Link to="/products" className="text-decoration-none text-muted">Categories</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
