import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  BsGrid,
  BsBoxSeam,
  BsBag,
  BsPeople,
  BsGear,
  BsBoxArrowRight,
} from "react-icons/bs";
import { logout } from "../../redux/authSlice";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const navItems = [
    { name: "Dashboard", icon: <BsGrid />, path: "/admin/dashboard" },
    { name: "Inventory", icon: <BsBoxSeam />, path: "/admin/inventory" },
    { name: "Orders", icon: <BsBag />, path: "/admin/carts" },
    { name: "Customers", icon: <BsPeople />, path: "/admin/users" },
  ];

  const isItemActive = (item) => {
    if (item.name === "Dashboard" && location.pathname.includes("/dashboard"))
      return true;
    if (item.name === "Inventory" && location.pathname.includes("/inventory"))
      return true;
    if (item.name === "Orders" && location.pathname.includes("/carts"))
      return true;
    if (item.name === "Customers" && location.pathname.includes("/users"))
      return true;
    return false;
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside
      className="d-flex flex-column justify-content-between p-3 border-end"
      style={{
        width: "260px",
        minWidth: "260px",
        minHeight: "100vh",
        backgroundColor: "#eef2ff",
        borderColor: "#e2e8f0",
      }}
    >
      <div>
        {/* Brand */}
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

        {/* Navigation links */}
        <nav className="d-flex flex-column gap-2 px-2">
          {navItems.map((item) => {
            const active = isItemActive(item);
            return (
              <Link
                key={item.name}
                to={item.path}
                className="d-flex align-items-center gap-3 px-3 py-2 text-decoration-none transition-all"
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
              </Link>
            );
          })}

          <div className="my-2" />

          {/* Settings link */}
          <Link
            to="/admin/dashboard"
            className="d-flex align-items-center gap-3 px-3 py-2 text-decoration-none"
            style={{
              borderRadius: "10px",
              color: "#64748b",
              fontWeight: 500,
              fontSize: "14px",
            }}
          >
            <span style={{ fontSize: "18px" }}>
              <BsGear />
            </span>
            <span>Settings</span>
          </Link>
        </nav>
      </div>

      {/* Admin User Section at Bottom */}
      <div
        className="d-flex align-items-center justify-content-between p-2 mt-4 rounded-3"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
      >
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

          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-link text-muted p-1 border-0"
            title="Logout"
          >
            <BsBoxArrowRight style={{ fontSize: "18px" }} />
          </button>
        </div>

        <button
          type="button"
          className="btn btn-link text-muted p-1 border-0"
          title="Logout"
        >
          <BsBoxArrowRight style={{ fontSize: "18px" }} />
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
