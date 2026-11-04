import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { addUser } from "../services/users";
import {
  BsX,
  BsPersonPlus,
  BsEnvelope,
  BsInfoCircleFill,
} from "react-icons/bs";

const emptyForm = {
  fullName: "",
  username: "",
  email: "",
  role: "user",
  password: "",
};

const AddUserModal = ({ isOpen = true, onClose, onAdded }) => {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async function () {
    const { fullName, username, email, role, password } = form;

    if (!fullName.trim() || !username.trim() || !email.trim() || !password) {
      toast.error("Please fill in all the fields");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const [firstName, ...rest] = fullName.trim().split(" ");
    const lastName = rest.join(" ");
    const cleanUsername = username.trim().replace(/^@/, ""); // ^@ to remove the @ at the beginang of the name

    try {
      setLoading(true);
      await addUser({
        firstName,
        lastName,
        username: cleanUsername,
        email: email.trim(),
        password,
        role,
      });

      onAdded({
        id: Date.now(),
        isLocal: true,
        firstName,
        lastName,
        username: cleanUsername,
        email: email.trim(),
        role,
        phone: "",
        image: "",
      });
      toast.success("User created successfully");
      setForm(emptyForm);
      onClose();
    } catch {
      toast.error("Failed to create the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      backdrop="static"
      contentClassName="border-0 rounded-4"
      style={{ "--bs-modal-width": "540px" }}
    >
      <Modal.Body className="p-4">
        {/* Header */}
        <div className="d-flex align-items-start justify-content-between mb-4">
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: "44px",
                height: "44px",
                backgroundColor: "#eef2ff",
                color: "#4338ca",
                fontSize: "20px",
              }}
            >
              <BsPersonPlus />
            </div>
            <div>
              <h5
                className="fw-bold mb-0 text-dark"
                style={{ fontSize: "18px" }}
              >
                Add New User
              </h5>
              <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
                Create a new account for your store management team.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="link"
            className="text-muted p-0 border-0"
            onClick={onClose}
            style={{ fontSize: "20px", lineHeight: 1 }}
          >
            <BsX />
          </Button>
        </div>

        {/* Form Body */}
        <div className="d-flex flex-column gap-3">
          {/* Row 1: Full Name and Username */}
          <div className="row g-3">
            <div className="col-12 col-sm-6">
              <Form.Label
                className="text-dark fw-medium mb-1"
                style={{ fontSize: "13px" }}
              >
                Full Name
              </Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="form-control-custom"
              />
            </div>
            <div className="col-12 col-sm-6">
              <Form.Label
                className="text-dark fw-medium mb-1"
                style={{ fontSize: "13px" }}
              >
                Username
              </Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="form-control-custom"
              />
            </div>
          </div>

          {/* Row 2: Email Address */}
          <div>
            <Form.Label
              className="text-dark fw-medium mb-1"
              style={{ fontSize: "13px" }}
            >
              Email Address
            </Form.Label>
            <div
              className="d-flex align-items-center px-3 py-1 rounded-3 border"
              style={{ borderColor: "#cbd5e1", backgroundColor: "#ffffff" }}
            >
              <BsEnvelope
                className="text-muted me-2"
                style={{ fontSize: "15px" }}
              />
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="border-0 bg-transparent p-0 shadow-none"
                style={{ fontSize: "14px", color: "#1e293b" }}
              />
            </div>
          </div>

          {/* Row 3: Role and Password */}
          <div className="row g-3">
            <div className="col-12 col-sm-6">
              <Form.Label
                className="text-dark fw-medium mb-1"
                style={{ fontSize: "13px" }}
              >
                Role
              </Form.Label>
              <Form.Select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="form-select-custom"
              >
                <option value="user">Customer</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </Form.Select>
            </div>
            <div className="col-12 col-sm-6">
              <Form.Label
                className="text-dark fw-medium mb-1"
                style={{ fontSize: "13px" }}
              >
                Password
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-control-custom"
                placeholder="At least 6 characters"
              />
            </div>
          </div>

          {/* Info Box: Multi-Factor Authentication note */}
          <div
            className="p-3 border rounded-3 d-flex align-items-start gap-2 mt-1"
            style={{
              backgroundColor: "#eff6ff",
              borderColor: "#bfdbfe",
            }}
          >
            <BsInfoCircleFill
              style={{
                color: "#3b82f6",
                fontSize: "16px",
                marginTop: "2px",
                flexShrink: 0,
              }}
            />
            <span
              style={{ fontSize: "13px", color: "#1e3a8a", lineHeight: "1.4" }}
            >
              A verification email will be sent to the new user automatically to
              set up their multi-factor authentication.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="d-flex align-items-center justify-content-end gap-3 mt-4 pt-2">
          <Button
            type="button"
            variant="outline-light"
            className="border text-secondary fw-semibold px-4 py-2"
            onClick={onClose}
            style={{
              borderColor: "#cbd5e1",
              borderRadius: "8px",
              fontSize: "14px",
              backgroundColor: "#ffffff",
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="d-inline-flex align-items-center gap-2 text-white fw-semibold px-4 py-2 border-0"
            style={{
              backgroundColor: "#4338ca",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            <BsPersonPlus style={{ fontSize: "16px" }} />
            <span>{loading ? "Creating..." : "Create User"}</span>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserModal;
