import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  BsBoxSeam,
  BsPeople,
  BsCart2,
  BsArrowRight,
  BsBoxArrowRight,
} from "react-icons/bs";
import { fetchDashboardStats } from "../../services/dashboard";
import { logout } from "../../redux/authSlice";
import { Button, Card, Col, Row } from "react-bootstrap";

const WIDGETS = [
  {
    key: "products",
    label: "TOTAL PRODUCTS",
    icon: <BsBoxSeam />,
    link: "/admin/inventory",
    linkText: "Manage products",
    bg: "#e0e7ff",
    color: "#4338ca",
  },
  {
    key: "users",
    label: "TOTAL USERS",
    icon: <BsPeople />,
    link: "/admin/users",
    linkText: "Manage users",
    bg: "#d1fae5",
    color: "#059669",
  },
  {
    key: "carts",
    label: "TOTAL CARTS",
    icon: <BsCart2 />,
    link: "/admin/carts",
    linkText: "Manage carts",
    bg: "#fef3c7",
    color: "#b45309",
  },
];

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth.user); // Retrieve the authenticated user from the Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function loadStats() {
      try {
        const data = await fetchDashboardStats();
        if (!cancelled) setStats(data);
      } catch (error) {
        if (!cancelled) toast.error("Failed to load dashboard data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadStats();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h2
          className="fw-bold mb-1"
          style={{ fontSize: "26px", color: "#0f172a" }}
        >
          Dashboard
        </h2>
        <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
          A quick overview of your store.
        </p>
      </div>

      {/* Summary widgets */}
      <Row className="g-4 mb-4">
        {WIDGETS.map((w) => (
          <Col key={w.key} xs={12} md={4}>
            <Card
              className="p-4 border bg-white h-100"
              style={{ borderRadius: "16px", borderColor: "#e2e8f0" }}
            >
              <div
                className="d-flex align-items-center justify-content-center rounded-3 mb-3"
                style={{
                  width: "44px",
                  height: "44px",
                  backgroundColor: w.bg,
                  color: w.color,
                  fontSize: "20px",
                }}
              >
                {w.icon}
              </div>
              <div
                className="text-secondary fw-semibold mb-1"
                style={{ fontSize: "11px", letterSpacing: "0.6px" }}
              >
                {w.label}
              </div>
              <div
                className="fw-bold mb-3"
                style={{ fontSize: "30px", color: "#0f172a" }}
              >
                {loading ? "..." : stats ? stats[w.key].toLocaleString() : "—"}
              </div>
              <Link
                to={w.link}
                className="text-decoration-none fw-semibold d-inline-flex align-items-center gap-2"
                style={{ color: "#4338ca", fontSize: "13px" }}
              >
                {w.linkText} <BsArrowRight />
              </Link>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Authentication */}
      <Card
        className="p-4 border bg-white"
        style={{ borderRadius: "16px", borderColor: "#e2e8f0" }}
      >
        <div
          className="text-secondary fw-semibold mb-3"
          style={{ fontSize: "11px", letterSpacing: "0.6px" }}
        >
          AUTHENTICATION
        </div>

        <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            {user?.image ? (
              <img
                src={user.image}
                alt={user.firstName}
                className="rounded-circle"
                style={{
                  width: "52px",
                  height: "52px",
                  objectFit: "cover",
                  backgroundColor: "#e2e8f0",
                }}
              />
            ) : (
              <div
                className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                style={{
                  width: "52px",
                  height: "52px",
                  backgroundColor: "#e0e7ff",
                  color: "#4338ca",
                }}
              >
                {user?.firstName?.[0]}
              </div>
            )}
            <div>
              <div className="fw-bold text-dark" style={{ fontSize: "15px" }}>
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-muted" style={{ fontSize: "13px" }}>
                {user?.email}
              </div>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleLogout}
            variant={null}
            className="d-inline-flex align-items-center justify-content-center gap-2 fw-semibold px-4 py-2"
            style={{
              border: "1px solid #fecaca",
              color: "#b91c1c",
              backgroundColor: "#fef2f2",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            <BsBoxArrowRight />
            <span>Logout</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
