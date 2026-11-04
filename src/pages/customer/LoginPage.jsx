import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import {
  BsEnvelope,
  BsLock,
  BsEye,
  BsEyeSlash,
  BsArrowRight,
  BsApple,
} from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { loginUser, getAuthUser } from "../../services/auth";
import { useState } from "react";
import { useDispatch } from "react-redux"; // To make the Loginpage use the AuthSlice
import { loginSucess } from "../../redux/authSlice";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(false);

  // For user Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // To make the user go to another page after Login

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password) {
      toast.error("Please enter your Username and Password");
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(username.trim(), password);
      const me = await getAuthUser(data.accessToken); // the full user (has the role)
      dispatch(loginSucess({ ...data, role: me.role }));
      toast.success(`Welcome back, ${data.firstName}!`);

      if (me.role === "admin" || me.role === "moderator") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="py-5"
      style={{ backgroundColor: "#f1f5f9", minHeight: "calc(100vh - 160px)" }}
    >
      <div className="container d-flex justify-content-center align-items-center">
        <div
          className="card border bg-white p-4 p-sm-5 shadow-sm w-100"
          style={{
            maxWidth: "480px",
            borderRadius: "20px",
            borderColor: "#e2e8f0",
          }}
        >
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2 text-dark" style={{ fontSize: "28px" }}>
              Welcome Back
            </h2>
            <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
              Please enter your details to sign in.
            </p>
          </div>

          {/* Form */}
          <Form onSubmit={handleSubmit}>
            {/* Email or Username */}
            <div className="mb-3">
              <Form.Label
                htmlFor="username"
                className="text-dark fw-medium mb-1"
                style={{ fontSize: "13px" }}
              >
                Username
              </Form.Label>
              <div
                className="d-flex align-items-center px-3 rounded-3 border"
                style={{
                  borderColor: "#cbd5e1",
                  backgroundColor: "#ffffff",
                  height: "46px",
                }}
              >
                <BsEnvelope
                  className="text-muted me-2"
                  style={{ fontSize: "16px" }}
                />
                <Form.Control
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-0 bg-transparent p-0 shadow-none"
                  placeholder="name@example.com"
                  style={{ fontSize: "14px", color: "#1e293b" }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <Form.Label
                  htmlFor="password"
                  className="text-dark fw-medium mb-0"
                  style={{ fontSize: "13px" }}
                >
                  Password
                </Form.Label>
                <Link
                  to="#"
                  className="text-decoration-none fw-semibold"
                  style={{ fontSize: "13px", color: "#4338ca" }}
                >
                  Forgot?
                </Link>
              </div>
              <div
                className="d-flex align-items-center px-3 rounded-3 border"
                style={{
                  borderColor: "#cbd5e1",
                  backgroundColor: "#ffffff",
                  height: "46px",
                }}
              >
                <BsLock
                  className="text-muted me-2"
                  style={{ fontSize: "16px" }}
                />
                <Form.Control
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-0 bg-transparent p-0 shadow-none"
                  placeholder="••••••••"
                  style={{ fontSize: "14px", color: "#1e293b" }}
                />
                <Button
                  type="button"
                  variant="link"
                  className="text-muted p-0 border-0 ms-2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <BsEyeSlash style={{ fontSize: "16px" }} />
                  ) : (
                    <BsEye style={{ fontSize: "16px" }} />
                  )}
                </Button>
              </div>
            </div>

            {/* Stay signed in */}
            <Form.Check
              type="checkbox"
              id="staySignedIn"
              className="mb-4 text-secondary user-select-none"
              label="Stay signed in for 30 days"
              checked={staySignedIn}
              onChange={() => setStaySignedIn(!staySignedIn)}
              style={{ accentColor: "#4338ca", fontSize: "13px" }}
            />

            {/* Submit button */}
            <Button
              type="submit"
              disabled={loading}
              className="text-white w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2 border-0 mb-4 shadow-sm"
              style={{
                backgroundColor: "#3730a3",
                borderRadius: "8px",
                fontSize: "15px",
                height: "46px",
              }}
            >
              <span>{loading ? "Signing in..." : "Sign In"}</span>
              <BsArrowRight />
            </Button>

            {/* Or continue with */}
            <div className="position-relative text-center mb-4">
              <hr style={{ borderColor: "#e2e8f0", margin: 0 }} />
              <span
                className="position-absolute top-50 start-50 translate-middle px-3 text-muted small bg-white"
                style={{ fontSize: "12px" }}
              >
                Or continue with
              </span>
            </div>

            {/* Social Buttons */}
            <div className="row g-2 mb-4">
              <div className="col-6">
                <Button
                  type="button"
                  variant="outline-light"
                  className="border w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                  style={{
                    borderColor: "#cbd5e1",
                    borderRadius: "8px",
                    backgroundColor: "#ffffff",
                    color: "#1e293b",
                    fontSize: "14px",
                    fontWeight: 500,
                    height: "42px",
                  }}
                >
                  <FcGoogle style={{ fontSize: "18px" }} />
                  <span>Google</span>
                </Button>
              </div>
              <div className="col-6">
                <Button
                  type="button"
                  variant="outline-light"
                  className="border w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                  style={{
                    borderColor: "#cbd5e1",
                    borderRadius: "8px",
                    backgroundColor: "#ffffff",
                    color: "#1e293b",
                    fontSize: "14px",
                    fontWeight: 500,
                    height: "42px",
                  }}
                >
                  <BsApple style={{ fontSize: "18px", color: "#000000" }} />
                  <span>Apple</span>
                </Button>
              </div>
            </div>

            {/* Register link */}
            <div
              className="text-center text-secondary small"
              style={{ fontSize: "13.5px" }}
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                className="fw-semibold text-decoration-none"
                style={{ color: "#4338ca" }}
              >
                Register
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
