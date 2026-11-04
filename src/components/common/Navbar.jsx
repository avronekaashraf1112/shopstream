import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch, BsCart3, BsPersonCircle } from "react-icons/bs";
import { useSelector } from "react-redux"; // Redux tool to make the component read the stored data(tokens) from the store

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  const isHome = location.pathname === "/" || location.pathname === "/home";
  const isProducts = location.pathname === "/products";

  return (
    <header
      className="bg-white border-bottom py-3"
      style={{ borderColor: "#f1f5f9" }}
    >
      <div className="container-fluid px-lg-5 px-3">
        <div className="d-flex align-items-center justify-content-between">
          {/* Logo & Navigation links */}
          <div className="d-flex align-items-center gap-4">
            <Link to="/" className="text-decoration-none">
              <span
                className="fw-bold fs-4"
                style={{ color: "#4338ca", letterSpacing: "-0.5px" }}
              >
                ShopStream
              </span>
            </Link>

            <nav className="d-none d-md-flex align-items-center gap-3 ms-2">
              <Link
                to="/"
                className={`nav-link-custom ${isHome ? "active" : ""}`}
                style={{
                  color: isHome ? "#4338ca" : "#475569",
                  fontSize: "15px",
                  fontWeight: isHome ? 700 : 500,
                }}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`nav-link-custom ${isProducts ? "active" : ""}`}
                style={{
                  color: isProducts ? "#4338ca" : "#475569",
                  fontWeight: isProducts ? 700 : 500,
                  fontSize: "15px",
                }}
              >
                Products
              </Link>
              <Link
                to="/products"
                className="nav-link-custom"
                style={{ color: "#475569", fontSize: "15px", fontWeight: 500 }}
              >
                Categories
              </Link>
            </nav>
          </div>

          {/* Right items: Search, Cart, Profile */}
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center px-3 py-1 rounded-pill"
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                width: "260px",
              }}
            >
              <BsSearch
                className="text-muted me-2"
                style={{ fontSize: "14px" }}
              />
              <input
                type="text"
                className="form-control border-0 bg-transparent p-0 shadow-none"
                placeholder="Search products..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && search.trim()) {
                    navigate(
                      `/products?search=${encodeURIComponent(search.trim())}`,
                    );
                  }
                }}
                style={{ fontSize: "14px", color: "#1e293b" }}
              />
            </div>

            <Link
              to="/cart"
              className="text-decoration-none text-dark p-2 rounded-circle hover-bg-light position-relative"
              title="Shopping Cart"
            >
              <BsCart3 style={{ fontSize: "20px", color: "#1e293b" }} />
              <span
                className="position-absolute badge rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  top: "2px",
                  right: "2px",
                  backgroundColor: "#10b981",
                  color: "#ffffff",
                  fontSize: "9px",
                  width: "15px",
                  height: "15px",
                  padding: 0,
                }}
              >
                {totalItems}
              </span>
            </Link>

            <Link
              to="/profile"
              className="text-decoration-none text-dark p-1 rounded-circle"
              title="My Account / Profile"
            >
              <BsPersonCircle style={{ fontSize: "24px", color: "#1e293b" }} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
