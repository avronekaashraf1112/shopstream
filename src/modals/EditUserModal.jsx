import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { getUserById, updateUser } from "../services/users";
import { BsX, BsPencil, BsEnvelope, BsTelephone } from "react-icons/bs";

const emptyForm = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  role: "user",
  phone: "",
};

const EditUserModal = ({ isOpen = true, user, onClose, onUpdated }) => {
  const [form, setForm] = useState(emptyForm);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen || !user) return;

    let cancelled = false;

    async function loadUser() {
      try {
        setLoadingUser(true);
        setLoadError(false);
        const data = user.isLocal ? user : await getUserById(user.id);

        if (!cancelled) {
          setForm({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            username: data.username || "",
            email: data.email || "",
            role: data.role || "user",
            phone: data.phone || "",
          });
        }
      } catch {
        if (!cancelled) {
          setLoadError(true);
          toast.error("Failed to load the user details");
        }
      } finally {
        if (!cancelled) {
          setLoadingUser(false);
        }
      }
    }
    loadUser();

    return () => {
      cancelled = true;
    };
  }, [isOpen, user]);

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async function () {
    const { firstName, lastName, username, email, role, phone } = form;

    if (!firstName.trim() || !username.trim() || !email.trim()) {
      toast.error("First name, username and email are required");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    const updates = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      username: username.trim().replace(/^@/, ""),
      email: email.trim(),
      role,
      phone: phone.trim(),
    };

    try {
      setSaving(true);
      if (!user.isLocal) {
        await updateUser(user.id, updates);
      }
      onUpdated({ ...user, ...updates });
      toast.success("User updated successfully");
      onClose();
    } catch {
      toast.error("Failed to update the user");
    } finally {
      setSaving(false);
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
              <BsPencil />
            </div>
            <div>
              <h5
                className="fw-bold mb-0 text-dark"
                style={{ fontSize: "18px" }}
              >
                Edit User
              </h5>
              <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
                Update details for {user.firstName} {user.lastName}
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

        {/* Body */}
        {loadingUser && (
          <div className="text-center text-muted py-5">
            Loading user details...
          </div>
        )}

        {!loadingUser && loadError && (
          <div className="text-center text-danger py-5">
            Could not load this user. Please close and try again.
          </div>
        )}

        {!loadingUser && !loadError && (
          <div className="d-flex flex-column gap-3">
            <div className="row g-3">
              <div className="col-12 col-sm-6">
                <Form.Label
                  className="text-dark fw-medium mb-1"
                  style={{ fontSize: "13px" }}
                >
                  First Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="form-control-custom"
                />
              </div>
              <div className="col-12 col-sm-6">
                <Form.Label
                  className="text-dark fw-medium mb-1"
                  style={{ fontSize: "13px" }}
                >
                  Last Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="form-control-custom"
                />
              </div>
            </div>

            <div>
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
                  Phone
                </Form.Label>
                <div
                  className="d-flex align-items-center px-3 py-1 rounded-3 border"
                  style={{ borderColor: "#cbd5e1", backgroundColor: "#ffffff" }}
                >
                  <BsTelephone
                    className="text-muted me-2"
                    style={{ fontSize: "14px" }}
                  />
                  <Form.Control
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="border-0 bg-transparent p-0 shadow-none"
                    style={{ fontSize: "14px", color: "#1e293b" }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
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
            onClick={handleSave}
            disabled={saving || loadingUser || loadError}
            className="text-white fw-semibold px-4 py-2 border-0"
            style={{
              backgroundColor: "#4338ca",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserModal;
