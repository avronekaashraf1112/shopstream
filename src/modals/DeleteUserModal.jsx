import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { deleteUser } from "../services/users";
import {
  BsExclamationTriangle,
  BsTrash,
  BsArrowLeft,
  BsShieldCheck,
  BsKey,
  BsInfoCircle,
} from "react-icons/bs";

const DeleteUserModal = ({ user, isOpen = true, onClose, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleConfirm = async function () {
    try {
      setLoading(true);
      if (!user.isLocal) {
        await deleteUser(user.id);
      }
      onDeleted(user.id);
      toast.success("User deleted successfully");
      onClose();
    } catch {
      toast.error("Failed to delete the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      contentClassName="border-0 rounded-4"
    >
      <Modal.Body className="p-4 text-center">
        {/* Top Handle Pill */}
        <div
          className="mx-auto mb-3"
          style={{
            width: "40px",
            height: "4px",
            backgroundColor: "#e2e8f0",
            borderRadius: "2px",
          }}
        />

        {/* Warning Icon */}
        <div
          className="mx-auto d-flex align-items-center justify-content-center rounded-circle mb-3"
          style={{
            width: "48px",
            height: "48px",
            backgroundColor: "#fee2e2",
            color: "#dc2626",
            fontSize: "22px",
          }}
        >
          <BsExclamationTriangle />
        </div>

        {/* Title & Description */}
        <h4 className="fw-bold text-dark mb-2" style={{ fontSize: "22px" }}>
          Delete User Account?
        </h4>
        <p
          className="text-muted small mb-4 px-2"
          style={{ fontSize: "13.5px", lineHeight: 1.5 }}
        >
          This action is permanent and cannot be undone. All data associated
          with this user will be permanently removed from the ShopStream
          systems.
        </p>

        {/* User Preview Card */}
        <div
          className="d-flex align-items-center gap-3 p-3 text-start mb-4 rounded-3"
          style={{
            backgroundColor: "#f0f7ff",
            border: "1px solid #dbeafe",
          }}
        >
          <div className="position-relative flex-shrink-0">
            <img
              src={user.image}
              alt={user.firstName}
              className="rounded-circle"
              style={{ width: "56px", height: "56px", objectFit: "cover" }}
            />
            <div
              className="position-absolute bottom-0 end-0 bg-white rounded-circle d-flex align-items-center justify-content-center text-success"
              style={{ width: "18px", height: "18px", fontSize: "14px" }}
            >
              <BsShieldCheck />
            </div>
          </div>

          <div className="flex-grow-1 overflow-hidden">
            <div
              className="fw-bold text-dark text-truncate"
              style={{ fontSize: "16px" }}
            >
              {user.firstName} {user.lastName}
            </div>
            <div
              className="text-muted small text-truncate mb-2"
              style={{ fontSize: "12px" }}
            >
              {user.email}
            </div>
            <div>
              <span
                className="badge d-inline-flex align-items-center gap-1 px-2 py-1 fw-bold"
                style={{
                  backgroundColor: "#e0e7ff",
                  color: "#4338ca",
                  borderRadius: "6px",
                  fontSize: "11px",
                  letterSpacing: "0.2px",
                }}
              >
                <BsKey style={{ fontSize: "12px" }} />
                <span>{user.company?.title || user.role}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="row g-2 mb-4">
          <div className="col-6">
            <Button
              type="button"
              className=" w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-1 border-0"
              onClick={onClose}
              style={{
                backgroundColor: "#e0e7ff",
                color: "#4338ca",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              <BsArrowLeft style={{ fontSize: "14px" }} />
              <span>Go Back</span>
            </Button>
          </div>

          <div className="col-6">
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={loading}
              className="text-white w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2 border-0"
              style={{
                backgroundColor: "#dc2626",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              <BsTrash style={{ fontSize: "15px" }} />
              <span>{loading ? "Deleting..." : "Delete User"}</span>
            </Button>
          </div>
        </div>

        {/* Bottom Note */}
        <div
          className="d-flex align-items-center justify-content-center gap-1 text-muted small"
          style={{ fontSize: "12px" }}
        >
          <BsInfoCircle style={{ fontSize: "12px" }} />
          <span>Deleting a user will also revoke all API access keys.</span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteUserModal;
