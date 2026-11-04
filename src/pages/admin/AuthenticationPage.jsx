import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Card, Row, Col, Badge, Button, Spinner } from "react-bootstrap";
import { BsBoxArrowRight } from "react-icons/bs";
import { getAuthUser } from "../../services/auth";
import { logout } from "../../redux/authSlice";

// The token is a JWT: header.payload.signature
// The middle part (payload) is base64 text that holds the issue and expiry time
function decodeToken(token) {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

function formatRemaining(ms) {
  if (ms <= 0) return "Expired";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

const cardStyle = { borderRadius: "16px", borderColor: "#e2e8f0" };
const labelStyle = { fontSize: "11px", letterSpacing: "0.6px" };

const AuthenticationPage = () => {
  const token = useSelector((state) => state.auth.token);
  const savedUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  // Fetch the authenticated user from the "Get Auth User" route (/auth/me)
  const loadProfile = useCallback(async () => {
    setLoading(true);
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
        toast.error("Failed to load authentication data");
      }
    } finally {
      setLoading(false);
    }
  }, [token, dispatch, navigate]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // Update the countdown every second
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const user = profile || savedUser;
  const payload = token ? decodeToken(token) : null;
  const expiresAt = payload?.exp ? payload.exp * 1000 : null;
  const issuedAt = payload?.iat ? payload.iat * 1000 : null;
  const expired = expiresAt ? expiresAt <= now : false;

  const details = [
    ["User ID", user?.id],
    ["Username", user?.username],
    ["Email", user?.email],
    ["Phone", user?.phone],
    ["Gender", user?.gender],
  ];

  const tokenPreview = token
    ? `${token.slice(0, 16)}...${token.slice(-6)}`
    : "—";

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h1
          className="fw-bold mb-1"
          style={{ fontSize: "28px", color: "#0f172a" }}
        >
          Authentication
        </h1>
        <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
          Your signed-in account and current session details.
        </p>
      </div>

      <Row className="g-4 mb-4">
        {/* Authenticated user */}
        <Col xs={12} lg={7}>
          <Card className="p-4 bg-white h-100" style={cardStyle}>
            <div className="text-secondary fw-semibold mb-3" style={labelStyle}>
              AUTHENTICATED USER
            </div>

            {loading && !user ? (
              <div className="d-flex justify-content-center py-5">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <>
                <div className="d-flex align-items-center gap-3 mb-4">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt={user.firstName}
                      className="rounded-circle"
                      style={{
                        width: "64px",
                        height: "64px",
                        objectFit: "cover",
                        backgroundColor: "#e2e8f0",
                      }}
                    />
                  ) : (
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                      style={{
                        width: "64px",
                        height: "64px",
                        backgroundColor: "#e0e7ff",
                        color: "#4338ca",
                        fontSize: "22px",
                      }}
                    >
                      {user?.firstName?.[0]}
                    </div>
                  )}
                  <div>
                    <div
                      className="fw-bold text-dark"
                      style={{ fontSize: "18px" }}
                    >
                      {user?.firstName} {user?.lastName}
                    </div>
                    <Badge
                      bg="primary"
                      className="text-uppercase mt-1"
                      style={{ fontSize: "11px" }}
                    >
                      {user?.role || "user"}
                    </Badge>
                  </div>
                </div>

                <Row className="g-3">
                  {details.map(([label, value]) => (
                    <Col xs={12} sm={6} key={label}>
                      <div
                        className="text-secondary fw-semibold"
                        style={labelStyle}
                      >
                        {label.toUpperCase()}
                      </div>
                      <div
                        className="text-dark text-break"
                        style={{ fontSize: "14px" }}
                      >
                        {value ?? "—"}
                      </div>
                    </Col>
                  ))}
                </Row>
              </>
            )}
          </Card>
        </Col>

        {/* Session */}
        <Col xs={12} lg={5}>
          <Card className="p-4 bg-white h-100" style={cardStyle}>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="text-secondary fw-semibold" style={labelStyle}>
                SESSION
              </div>
              <Badge bg={expired ? "danger" : "success"}>
                {expired ? "Expired" : "Active"}
              </Badge>
            </div>

            <div className="mb-3">
              <div className="text-secondary fw-semibold" style={labelStyle}>
                ACCESS TOKEN
              </div>
              <div
                className="text-dark text-break"
                style={{ fontSize: "13px", fontFamily: "monospace" }}
              >
                {tokenPreview}
              </div>
            </div>

            <div className="mb-3">
              <div className="text-secondary fw-semibold" style={labelStyle}>
                ISSUED AT
              </div>
              <div className="text-dark" style={{ fontSize: "14px" }}>
                {issuedAt ? new Date(issuedAt).toLocaleString() : "—"}
              </div>
            </div>

            <div className="mb-3">
              <div className="text-secondary fw-semibold" style={labelStyle}>
                EXPIRES AT
              </div>
              <div className="text-dark" style={{ fontSize: "14px" }}>
                {expiresAt ? new Date(expiresAt).toLocaleString() : "—"}
              </div>
            </div>

            <div>
              <div className="text-secondary fw-semibold" style={labelStyle}>
                TIME LEFT
              </div>
              <div
                className="fw-bold"
                style={{
                  fontSize: "22px",
                  color: expired ? "#b91c1c" : "#0f172a",
                }}
              >
                {expiresAt ? formatRemaining(expiresAt - now) : "—"}
              </div>
            </div>

            <p className="text-muted mt-3 mb-0" style={{ fontSize: "12px" }}>
              The token is saved in the browser, so you stay signed in after a
              page reload.
            </p>
          </Card>
        </Col>
      </Row>

      {/* Actions */}
      <div className="d-flex flex-wrap gap-2">
        <Button
          variant="outline-danger"
          className="d-inline-flex align-items-center gap-2 fw-semibold"
          onClick={handleLogout}
        >
          <BsBoxArrowRight />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AuthenticationPage;
