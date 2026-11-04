import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { deleteCart } from "../services/carts";
import { BsExclamationTriangle, BsTrash } from "react-icons/bs";

const DeleteCartModal = ({
  isOpen = true,
  cart,
  ownerName,
  onClose,
  onDeleted,
}) => {
  const [loading, setLoading] = useState(false);

  if (!cart) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      if (!cart.isLocal) {
        await deleteCart(cart.id);
      }
      onDeleted(cart.id);
      toast.success("Cart deleted successfully");
      onClose();
    } catch {
      toast.error("Failed to delete the cart");
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
        <div
          className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
          style={{
            width: "56px",
            height: "56px",
            backgroundColor: "#fee2e2",
            color: "#dc2626",
            fontSize: "26px",
          }}
        >
          <BsExclamationTriangle />
        </div>

        <h5 className="fw-bold text-dark mb-2" style={{ fontSize: "18px" }}>
          Delete Cart #{cart.id}?
        </h5>
        <p
          className="text-muted mb-3"
          style={{ fontSize: "14px", lineHeight: 1.5 }}
        >
          This will permanently remove the cart of <strong>{ownerName}</strong>{" "}
          ({cart.totalQuantity} items, ${cart.discountedTotal.toFixed(2)}).
        </p>

        <div className="d-flex flex-column gap-2">
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
            <span>{loading ? "Deleting..." : "Delete Cart"}</span>
          </Button>
          <Button
            type="button"
            variant="outline-light"
            onClick={onClose}
            className="border text-secondary w-100 py-2 fw-semibold"
            style={{
              borderColor: "#cbd5e1",
              borderRadius: "8px",
              fontSize: "14px",
              backgroundColor: "#ffffff",
            }}
          >
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteCartModal;
