import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Navbar as BsNavbar,
  Nav,
  Container,
  Form,
  Button,
} from "react-bootstrap";
import { BsSearch, BsCart3, BsPersonCircle } from "react-icons/bs";
import { useSelector } from "react-redux"; // Redux tool to make the component read the stored data(tokens) from the store

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false); // Open/close the menu on small screens

  const token = useSelector((state) => state.auth.token);
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  const isHome = location.pathname === "/" || location.pathname === "/home";
  const isProducts = location.pathname === "/products";

  const links = [
    { label: "Home", to: "/", active: isHome },
    { label: "Products", to: "/products", active: isProducts },
  ];

  const handleSearch = (event) => {
    event.preventDefault();
    const term = search.trim();
    if (!term) return;
    navigate(`/products?search=${encodeURIComponent(term)}`);
    setExpanded(false);
  };

  return (
    <BsNavbar
      as="header"
      expand="md"
      bg="white"
      expanded={expanded}
      onToggle={setExpanded}
      collapseOnSelect
      className="border-bottom py-3"
      style={{ borderColor: "#f1f5f9" }}
    >
      <Container fluid className="px-lg-5 px-3">
        {/* Logo */}
        <BsNavbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-4 me-4"
          style={{ color: "#4338ca", letterSpacing: "-0.5px" }}
        >
          ShopStream
        </BsNavbar.Brand>

        {/* Cart, Profile / Login and the menu button (always visible) */}
        <div className="d-flex align-items-center gap-3 ms-auto order-md-3">
          <Link
            to="/cart"
            className="text-decoration-none text-dark p-2 rounded-circle position-relative"
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

          {token ? (
            <Link
              to="/profile"
              className="text-decoration-none text-dark p-1 rounded-circle"
              title="My Account / Profile"
            >
              <BsPersonCircle style={{ fontSize: "24px", color: "#1e293b" }} />
            </Link>
          ) : (
            <Button
              as={Link}
              to="/login"
              size="sm"
              className="fw-semibold px-3"
              style={{
                "--bs-btn-bg": "#4338ca",
                "--bs-btn-border-color": "#4338ca",
                "--bs-btn-hover-bg": "#3730a3",
                "--bs-btn-hover-border-color": "#3730a3",
                "--bs-btn-active-bg": "#3730a3",
                "--bs-btn-active-border-color": "#3730a3",
                borderRadius: "8px",
              }}
            >
              Login
            </Button>
          )}

          <BsNavbar.Toggle aria-controls="main-navbar" />
        </div>

        {/* Links and search (collapse into a menu on small screens) */}
        <BsNavbar.Collapse id="main-navbar" className="order-md-2">
          <Nav className="me-auto ms-md-2 gap-md-2">
            {links.map((link) => (
              <Nav.Link
                as={Link}
                key={link.label}
                to={link.to}
                className={`nav-link-custom ${link.active ? "active" : ""}`}
                style={{
                  color: link.active ? "#4338ca" : "#475569",
                  fontSize: "15px",
                  fontWeight: link.active ? 700 : 500,
                }}
              >
                {link.label}
              </Nav.Link>
            ))}
          </Nav>

          <Form
            onSubmit={handleSearch}
            className="d-flex align-items-center px-3 py-1 rounded-pill my-3 my-md-0 me-md-3"
            style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              width: "100%",
              maxWidth: "260px",
            }}
          >
            <BsSearch
              className="text-muted me-2 flex-shrink-0"
              style={{ fontSize: "14px" }}
            />
            <Form.Control
              type="search"
              className="border-0 bg-transparent p-0 shadow-none"
              placeholder="Search products..."
              aria-label="Search products"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              style={{ fontSize: "14px", color: "#1e293b" }}
            />
          </Form>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
