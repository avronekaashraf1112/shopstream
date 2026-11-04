import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { registerUser } from "../../services/auth";

import {
  BsPerson,
  BsAt,
  BsEnvelope,
  BsLock,
  BsShieldCheck,
  BsEye,
  BsEyeSlash,
  BsArrowRight,
  BsApple,
} from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, username, email, password, confirmPassword } = form;

    if (!fullName.trim() || !username.trim() || !email.trim() || !password) {
      toast.error("Please fill in all the fields");
      return;
    }
    // Regex is the part inside the // (^\S+@\S+\.\S+$)
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!agreed) {
      toast.error("Please agree to the Terms and Privacy Policy");
      return;
    }

    // split on spaces: the first word is the first name, the rest is the last name
    const [firstName, ...rest] = fullName.trim().split(" ");
    const lastName = rest.join(" ");

    try {
      setLoading(true);
      await registerUser({
        firstName,
        lastName,
        username: username.trim(),
        email: email.trim(),
        password,
      });

      toast.success("Account created! Please sign in.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
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
            maxWidth: "520px",
            borderRadius: "20px",
            borderColor: "#e2e8f0",
          }}
        >
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2 text-dark" style={{ fontSize: "28px" }}>
              Create Account
            </h2>
            <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
              Join ShopStream for a personalized shopping experience.
            </p>
          </div>

          {/* Form */}
          <Form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-3">
              <Form.Label
                htmlFor="fullName"
                className="text-dark fw-medium mb-1"
                style={{ fontSize: "13px" }}
              >
                Full Name
              </Form.Label>
              <div
                className="d-flex align-items-center px-3 rounded-3 border"
                style={{
                  borderColor: "#cbd5e1",
                  backgroundColor: "#ffffff",
                  height: "46px",
                }}
              >
                <BsPerson
                  className="text-muted me-2"
                  style={{ fontSize: "18px" }}
                />
                <Form.Control
                  id="fullName"
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={handleChange}
                  className="border-0 bg-transparent p-0 shadow-none"
                  placeholder="John Doe"
                  style={{ fontSize: "14px", color: "#1e293b" }}
                />
              </div>
            </div>

            {/* Username & Email row */}
            <div className="row g-3 mb-3">
              <div className="col-12 col-sm-6">
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
                  <BsAt
                    className="text-muted me-2"
                    style={{ fontSize: "16px" }}
                  />
                  <Form.Control
                    id="username"
                    type="text"
                    name="username"
                    autoComplete="username"
                    value={form.username}
                    onChange={handleChange}
                    className="border-0 bg-transparent p-0 shadow-none"
                    placeholder="johndoe"
                    style={{ fontSize: "14px", color: "#1e293b" }}
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <Form.Label
                  htmlFor="email"
                  className="text-dark fw-medium mb-1"
                  style={{ fontSize: "13px" }}
                >
                  Email Address
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
                    style={{ fontSize: "15px" }}
                  />
                  <Form.Control
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    className="border-0 bg-transparent p-0 shadow-none"
                    placeholder="john@example.com"
                    style={{ fontSize: "14px", color: "#1e293b" }}
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <Form.Label
                htmlFor="password"
                className="text-dark fw-medium mb-1"
                style={{ fontSize: "13px" }}
              >
                Password
              </Form.Label>
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
                  name="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
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

            {/* Confirm Password */}
            <div className="mb-3">
              <Form.Label
                htmlFor="confirmPassword"
                className="text-dark fw-medium mb-1"
                style={{ fontSize: "13px" }}
              >
                Confirm Password
              </Form.Label>
              <div
                className="d-flex align-items-center px-3 rounded-3 border"
                style={{
                  borderColor: "#cbd5e1",
                  backgroundColor: "#ffffff",
                  height: "46px",
                }}
              >
                <BsShieldCheck
                  className="text-muted me-2"
                  style={{ fontSize: "16px" }}
                />
                <Form.Control
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="border-0 bg-transparent p-0 shadow-none"
                  placeholder="••••••••"
                  style={{ fontSize: "14px", color: "#1e293b" }}
                />
              </div>
            </div>

            {/* Terms checkbox */}
            <Form.Check
              type="checkbox"
              id="agreeTerms"
              className="mb-4 text-secondary user-select-none small"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              style={{ accentColor: "#4338ca", fontSize: "13px" }}
              label={
                <>
                  I agree to the{" "}
                  <Link
                    to="#"
                    className="text-decoration-none fw-semibold"
                    style={{ color: "#4338ca" }}
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="#"
                    className="text-decoration-none fw-semibold"
                    style={{ color: "#4338ca" }}
                  >
                    Privacy Policy
                  </Link>
                  .
                </>
              }
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
              <span>{loading ? "Creating account..." : "Sign Up"}</span>
              <BsArrowRight />
            </Button>

            {/* Or register with */}
            <div className="position-relative text-center mb-4">
              <hr style={{ borderColor: "#e2e8f0", margin: 0 }} />
              <span
                className="position-absolute top-50 start-50 translate-middle px-3 text-muted small bg-white"
                style={{ fontSize: "12px" }}
              >
                Or register with
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

            {/* Sign in link */}
            <div
              className="text-center text-secondary small"
              style={{ fontSize: "13.5px" }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="fw-semibold text-decoration-none"
                style={{ color: "#4338ca" }}
              >
                Sign In
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
