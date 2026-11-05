import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMAGES } from "../../assets/images";
import {
  BsPersonFill,
  BsClockHistory,
  BsGear,
  BsBoxArrowRight,
  BsPencilFill,
  BsBag,
  BsWallet2,
  BsStar,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logout } from "../../redux/authSlice";
import { getAuthUser } from "../../services/auth";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const RECENT_ORDERS_DATA = [
  {
    id: 1,
    title: "StreamX Pro Wireless Headphones",
    orderNumber: "Order #SS-98231",
    date: "Placed on Oct 12, 2023",
    price: "$299.00",
    status: "Delivered",
    statusBg: "#d1fae5",
    statusColor: "#059669",
    actionText: "Track Package",
    image: IMAGES.headphones,
  },
  {
    id: 2,
    title: "Quantum Watch Series 4",
    orderNumber: "Order #SS-98442",
    date: "Placed on Oct 15, 2023",
    price: "$449.00",
    status: "Shipped",
    statusBg: "#e0e7ff",
    statusColor: "#4338ca",
    actionText: "Track Package",
    image: IMAGES.smartwatch,
  },
  {
    id: 3,
    title: "Mechanical Chroma Keyboard",
    orderNumber: "Order #SS-98771",
    date: "Placed on Oct 18, 2023",
    price: "$189.00",
    status: "Processing",
    statusBg: "#e2e8f0",
    statusColor: "#475569",
    actionText: "Edit Order",
    image: IMAGES.keyboard,
  },
];

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if user not register => go to login page
    if (!token) {
      navigate("/login");
      return;
    }

    async function loadProfile() {
      try {
        const data = await getAuthUser(token);
        setProfile(data);
      } catch (error) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          dispatch(logout());
          toast.error("Your session expired, please sign in again");
          navigate("/login");
        } else {
          toast.error("Failed to load your profile");
        }
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [token, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (loading || !profile) {
    return <div className="text-center py-5">Loading profile...</div>;
  }

  return (
    <div className="bg-white py-4 py-lg-5">
      <Container fluid className="px-lg-5 px-3">
        <Row className="g-4">
          {/* Left Column: Account Navigation Sidebar */}
          <Col xs={12} lg={3}>
            <Card
              className="p-3 border bg-white shadow-sm"
              style={{ borderRadius: "16px", borderColor: "#e2e8f0" }}
            >
              <div className="p-2 mb-2">
                <h5
                  className="fw-bold text-dark mb-1"
                  style={{ fontSize: "18px" }}
                >
                  Account
                </h5>
                <p
                  className="text-muted small mb-0"
                  style={{ fontSize: "13px" }}
                >
                  Manage your settings
                </p>
              </div>

              <hr style={{ borderColor: "#f1f5f9", margin: "8px 0 16px 0" }} />

              <nav className="d-flex flex-column gap-2 mb-3">
                <Button
                  type="button"
                  variant={null}
                  className="d-flex align-items-center gap-3 text-start w-100 py-2 px-3 border-0"
                  style={{
                    backgroundColor:
                      activeTab === "profile" ? "#4338ca" : "transparent",
                    color: activeTab === "profile" ? "#ffffff" : "#475569",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                  onClick={() => setActiveTab("profile")}
                >
                  <BsPersonFill style={{ fontSize: "18px" }} />
                  <span>My Profile</span>
                </Button>

                <Button
                  type="button"
                  variant={null}
                  className="d-flex align-items-center gap-3 text-start w-100 py-2 px-3 border-0"
                  style={{
                    backgroundColor:
                      activeTab === "orders" ? "#4338ca" : "transparent",
                    color: activeTab === "orders" ? "#ffffff" : "#475569",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                  onClick={() => setActiveTab("orders")}
                >
                  <BsClockHistory style={{ fontSize: "16px" }} />
                  <span>Order History</span>
                </Button>

                <Button
                  type="button"
                  variant={null}
                  className="d-flex align-items-center gap-3 text-start w-100 py-2 px-3 border-0"
                  style={{
                    backgroundColor:
                      activeTab === "settings" ? "#4338ca" : "transparent",
                    color: activeTab === "settings" ? "#ffffff" : "#475569",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                  onClick={() => setActiveTab("settings")}
                >
                  <BsGear style={{ fontSize: "16px" }} />
                  <span>Account Settings</span>
                </Button>
              </nav>

              <hr style={{ borderColor: "#f1f5f9", margin: "8px 0 16px 0" }} />

              <Button
                type="button"
                onClick={handleLogout}
                variant={null}
                className="d-flex align-items-center gap-3 text-start w-100 py-2 px-3 border-0"
                style={{ color: "#ef4444", fontSize: "14px", fontWeight: 600 }}
              >
                <BsBoxArrowRight style={{ fontSize: "18px" }} />
                <span>Sign Out</span>
              </Button>
            </Card>
          </Col>

          {/* Right Column: Profile Content */}
          <Col xs={12} lg={9}>
            {/* Profile Header Card */}
            <Card
              className="p-4 border bg-white mb-4 shadow-sm"
              style={{ borderRadius: "20px", borderColor: "#e2e8f0" }}
            >
              <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4">
                <div className="d-flex align-items-center gap-4">
                  {/* Avatar with edit badge */}
                  <div className="position-relative flex-shrink-0">
                    <img
                      src={profile.image}
                      alt={`${profile.firstName} ${profile.lastName}`}
                      className="rounded-circle shadow-sm"
                      style={{
                        width: "92px",
                        height: "92px",
                        objectFit: "cover",
                      }}
                    />
                    <Button
                      type="button"
                      variant={null}
                      className="position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-content-center text-white border-0 shadow-sm"
                      style={{
                        width: "28px",
                        height: "28px",
                        backgroundColor: "#4338ca",
                        fontSize: "12px",
                      }}
                      title="Edit avatar"
                    >
                      <BsPencilFill />
                    </Button>
                  </div>

                  {/* User info */}
                  <div>
                    <h3
                      className="fw-bold text-dark mb-1"
                      style={{ fontSize: "24px" }}
                    >
                      {profile.firstName} {profile.lastName}
                    </h3>
                    <p
                      className="text-muted small mb-2"
                      style={{ fontSize: "14px" }}
                    >
                      {profile.email}
                    </p>

                    <div className="d-flex flex-wrap gap-2">
                      <span
                        className="badge px-3 py-1 fw-semibold"
                        style={{
                          backgroundColor: "#d1fae5",
                          color: "#059669",
                          borderRadius: "20px",
                          fontSize: "12px",
                        }}
                      >
                        Premium Member
                      </span>
                      <span
                        className="badge px-3 py-1 fw-semibold"
                        style={{
                          backgroundColor: "#e2e8f0",
                          color: "#475569",
                          borderRadius: "20px",
                          fontSize: "12px",
                        }}
                      >
                        Member since 2022
                      </span>
                    </div>
                  </div>
                </div>

                {/* Header Action Buttons */}
                <div
                  className="d-flex flex-column gap-2"
                  style={{ minWidth: "160px" }}
                >
                  <Button
                    type="button"
                    variant={null}
                    className="text-white fw-semibold border-0 py-2 shadow-sm"
                    style={{
                      backgroundColor: "#3730a3",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    type="button"
                    variant="outline-light"
                    className="border fw-semibold py-2"
                    style={{
                      borderColor: "#cbd5e1",
                      color: "#4338ca",
                      backgroundColor: "#ffffff",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  >
                    View Analytics
                  </Button>
                </div>
              </div>
            </Card>

            {/* 3 Metric Stat Cards */}
            <Row className="g-3 mb-4">
              {/* Total Orders */}
              <Col xs={12} md={4}>
                <Card
                  className="p-4 border bg-white h-100 shadow-sm"
                  style={{ borderRadius: "16px", borderColor: "#e2e8f0" }}
                >
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "42px",
                        height: "42px",
                        backgroundColor: "#e0e7ff",
                        color: "#4338ca",
                        fontSize: "18px",
                      }}
                    >
                      <BsBag />
                    </div>
                    <span
                      className="fw-bold"
                      style={{ color: "#10b981", fontSize: "12px" }}
                    >
                      +2 this month
                    </span>
                  </div>
                  <div
                    className="text-secondary fw-semibold small mb-1"
                    style={{ fontSize: "13px" }}
                  >
                    Total Orders
                  </div>
                  <div
                    className="fw-bold text-dark"
                    style={{ fontSize: "28px" }}
                  >
                    24
                  </div>
                </Card>
              </Col>

              {/* Wallet Balance */}
              <Col xs={12} md={4}>
                <Card
                  className="p-4 border bg-white h-100 shadow-sm"
                  style={{ borderRadius: "16px", borderColor: "#e2e8f0" }}
                >
                  <div className="mb-2">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "42px",
                        height: "42px",
                        backgroundColor: "#d1fae5",
                        color: "#059669",
                        fontSize: "18px",
                      }}
                    >
                      <BsWallet2 />
                    </div>
                  </div>
                  <div
                    className="text-secondary fw-semibold small mb-1"
                    style={{ fontSize: "13px" }}
                  >
                    Wallet Balance
                  </div>
                  <div
                    className="fw-bold text-dark"
                    style={{ fontSize: "28px" }}
                  >
                    $1,248.50
                  </div>
                </Card>
              </Col>

              {/* Loyalty Points */}
              <Col xs={12} md={4}>
                <Card
                  className="p-4 border bg-white h-100 shadow-sm"
                  style={{ borderRadius: "16px", borderColor: "#e2e8f0" }}
                >
                  <div className="mb-2">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "42px",
                        height: "42px",
                        backgroundColor: "#e0e7ff",
                        color: "#4338ca",
                        fontSize: "18px",
                      }}
                    >
                      <BsStar />
                    </div>
                  </div>
                  <div
                    className="text-secondary fw-semibold small mb-1"
                    style={{ fontSize: "13px" }}
                  >
                    Loyalty Points
                  </div>
                  <div
                    className="fw-bold text-dark"
                    style={{ fontSize: "28px" }}
                  >
                    4,800
                  </div>
                </Card>
              </Col>
            </Row>

            {/* Recent Orders Card */}
            <Card
              className="p-4 border bg-white shadow-sm"
              style={{ borderRadius: "20px", borderColor: "#e2e8f0" }}
            >
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5
                  className="fw-bold text-dark mb-0"
                  style={{ fontSize: "18px" }}
                >
                  Recent Orders
                </h5>
                <Link
                  to="#"
                  className="fw-semibold text-decoration-none small"
                  style={{ color: "#4338ca" }}
                >
                  View All
                </Link>
              </div>

              <div className="d-flex flex-column gap-3">
                {RECENT_ORDERS_DATA.map((order, idx) => (
                  <div
                    key={order.id}
                    className={`d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 ${
                      idx !== RECENT_ORDERS_DATA.length - 1
                        ? "pb-3 border-bottom"
                        : ""
                    }`}
                    style={{ borderColor: "#f1f5f9" }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={order.image}
                        alt={order.title}
                        className="rounded-3 flex-shrink-0"
                        style={{
                          width: "64px",
                          height: "64px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <h6
                          className="fw-bold text-dark mb-1"
                          style={{ fontSize: "15px" }}
                        >
                          {order.title}
                        </h6>
                        <div
                          className="text-muted small"
                          style={{ fontSize: "12px" }}
                        >
                          {order.orderNumber} &bull; {order.date}
                        </div>
                      </div>
                    </div>

                    <div className="text-sm-end">
                      <div
                        className="fw-bold mb-1"
                        style={{ fontSize: "17px", color: "#3730a3" }}
                      >
                        {order.price}
                      </div>
                      <div className="d-flex align-items-center justify-content-sm-end gap-2">
                        <span
                          className="badge px-3 py-1 fw-semibold"
                          style={{
                            backgroundColor: order.statusBg,
                            color: order.statusColor,
                            borderRadius: "20px",
                            fontSize: "11px",
                          }}
                        >
                          {order.status}
                        </span>
                        <Link
                          to="#"
                          className="fw-semibold text-decoration-none small"
                          style={{ color: "#4338ca", fontSize: "12px" }}
                        >
                          {order.actionText}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserProfilePage;
