import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Nav, Button, Offcanvas } from "react-bootstrap";
import {
  BsGrid,
  BsBoxSeam,
  BsBag,
  BsPeople,
  BsShieldLock,
  BsBoxArrowRight,
  BsList,
} from "react-icons/bs";
import { logout } from "../../redux/authSlice";

const NAV_ITEMS = [
  {
    name: "Dashboard",
    icon: <BsGrid />,
    path: "/admin/dashboard",
    match: ["/dashboard"],
  },
  {
    name: "Inventory",
    icon: <BsBoxSeam />,
    path: "/admin/inventory",
    match: ["/inventory", "-product"],
  },
  {
    name: "Orders",
    icon: <BsBag />,
    path: "/admin/carts",
    match: ["/carts"],
  },
  {
    name: "Customers",
    icon: <BsPeople />,
    path: "/admin/users",
    match: ["/users", "-user"],
  },
  {
    name: "Authentication",
    icon: <BsShieldLock />,
    path: "/admin/authentication",
    match: ["/authentication"],
  },
];

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [showMenu, setShowMenu] = useState(false); // Menu on small screens

  const isItemActive = (item) =>
    item.match.some((part) => location.pathname.includes(part));

  const handleLogout = () => {
    setShowMenu(false);
    dispatch(logout());
    navigate("/login");
  };

  // The content of the menu: used in the sidebar (large screens) and in the offcanvas (small screens)
  const renderMenu = (showBrand) => (
    <>
      <div>
        {/* Brand */}
        {showBrand && (
          <div className="px-3 pt-3 pb-4">
            <Link to="/admin/dashboard" className="text-decoration-none">
              <h4
                className="fw-bold mb-0"
                style={{
                  color: "#4338ca",
                  fontSize: "24px",
                  letterSpacing: "-0.5px",
                }}
              >
                ShopStream
              </h4>
              <div
                className="text-muted fw-semibold"
                style={{ fontSize: "12px", letterSpacing: "0.2px" }}
              >
                Admin Panel
              </div>
            </Link>
          </div>
        )}

        {/* Navigation links */}
        <Nav className="flex-column gap-2 px-2">
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item);
            return (
              <Nav.Link
                as={Link}
                key={item.name}
                to={item.path}
                onClick={() => setShowMenu(false)}
                className="d-flex align-items-center gap-3 px-3 py-2"
                style={{
                  borderRadius: "10px",
                  backgroundColor: active ? "#4338ca" : "transparent",
                  color: active ? "#ffffff" : "#64748b",
                  fontWeight: active ? 600 : 500,
                  fontSize: "14px",
                }}
              >
                <span style={{ fontSize: "18px" }}>{item.icon}</span>
                <span>{item.name}</span>
              </Nav.Link>
            );
          })}
        </Nav>
      </div>

      {/* Admin user section at the bottom */}
      <div
        className="d-flex align-items-center justify-content-between p-2 mt-4 rounded-3"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
      >
        <div className="d-flex align-items-center gap-2 overflow-hidden">
          {user?.image ? (
            <img
              src={user.image}
              alt={user.firstName}
              className="rounded-circle"
              style={{
                width: "36px",
                height: "36px",
                objectFit: "cover",
                backgroundColor: "#e2e8f0",
              }}
            />
          ) : (
            <div
              className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: "#e0e7ff",
                color: "#4338ca",
              }}
            >
              {user?.firstName?.[0]}
            </div>
          )}
          <div className="text-truncate">
            <div
              className="fw-bold text-dark text-truncate"
              style={{ fontSize: "13px" }}
            >
              {user?.firstName} {user?.lastName}
            </div>
            <div
              className="text-muted fw-semibold text-truncate"
              style={{ fontSize: "11px" }}
            >
              @{user?.username}
            </div>
          </div>
        </div>

        <Button
          variant="link"
          onClick={handleLogout}
          className="text-muted p-1 border-0"
          title="Logout"
        >
          <BsBoxArrowRight style={{ fontSize: "18px" }} />
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Top bar with a menu button (small screens only) */}
      <div
        className="d-flex d-lg-none align-items-center justify-content-between px-3 py-2 border-bottom"
        style={{ backgroundColor: "#eef2ff", borderColor: "#e2e8f0" }}
      >
        <Link to="/admin/dashboard" className="text-decoration-none">
          <span
            className="fw-bold"
            style={{
              color: "#4338ca",
              fontSize: "20px",
              letterSpacing: "-0.5px",
            }}
          >
            ShopStream
          </span>
          <span
            className="text-muted fw-semibold ms-2"
            style={{ fontSize: "12px" }}
          >
            Admin
          </span>
        </Link>

        <Button
          variant="light"
          aria-label="Open menu"
          onClick={() => setShowMenu(true)}
          className="d-flex align-items-center justify-content-center p-0"
          style={{
            "--bs-btn-bg": "#ffffff",
            "--bs-btn-color": "#4338ca",
            "--bs-btn-border-color": "#c7d2fe",
            width: "40px",
            height: "40px",
            borderRadius: "10px",
          }}
        >
          <BsList style={{ fontSize: "22px" }} />
        </Button>
      </div>

      {/* Sidebar (large screens only) */}
      <aside
        className="d-none d-lg-flex flex-column justify-content-between p-3 border-end"
        style={{
          width: "260px",
          minWidth: "260px",
          minHeight: "100vh",
          backgroundColor: "#eef2ff",
          borderColor: "#e2e8f0",
        }}
      >
        {renderMenu(true)}
      </aside>

      {/* Menu that slides in (small screens only) */}
      <Offcanvas
        show={showMenu}
        onHide={() => setShowMenu(false)}
        placement="start"
        className="d-lg-none"
        style={{ width: "280px", backgroundColor: "#eef2ff" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title
            className="fw-bold"
            style={{ color: "#4338ca", letterSpacing: "-0.5px" }}
          >
            ShopStream
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column justify-content-between">
          {renderMenu(false)}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AdminSidebar;
