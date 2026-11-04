import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { deleteProduct } from "../services/products";

import { BsExclamationTriangle, BsTrash, BsLock } from "react-icons/bs";

const DeleteProductModal = ({ isOpen = true, product, onClose, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  if (!product) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);

      if (!product.isLocal) {
        await deleteProduct(product.id);
      }

      onDeleted(product.id);
      toast.success("Product deleted successfully");
      onClose();
    } catch {
      toast.error("Failed to delete the product");
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
          Delete Product?
        </h4>
        <p
          className="text-muted small mb-4 px-2"
          style={{ fontSize: "13.5px", lineHeight: 1.5 }}
        >
          This action is permanent and cannot be undone. All data associated
          with this product will be removed from the store's inventory.
        </p>

        {/* Product Preview Card */}
        <div
          className="d-flex align-items-center gap-3 p-3 text-start mb-4 rounded-3"
          style={{
            backgroundColor: "#f0f7ff",
            border: "1px solid #dbeafe",
          }}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="rounded-2 flex-shrink-0"
            style={{ width: "56px", height: "56px", objectFit: "cover" }}
          />

          <div className="flex-grow-1 overflow-hidden">
            <div
              className="fw-bold mb-1"
              style={{
                color: product.stock > 0 ? "#059669" : "#64748b",
                fontSize: "11px",
                letterSpacing: "0.6px",
              }}
            >
              {product.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
            </div>
            <div
              className="fw-bold text-dark text-truncate mb-1"
              style={{ fontSize: "15px" }}
            >
              {product.title}
            </div>
            <div className="d-flex align-items-center gap-3 small">
              <span className="text-muted" style={{ fontSize: "12px" }}>
                SKU: {product.sku}
              </span>
              <span
                className="fw-bold"
                style={{ color: "#059669", fontSize: "14px" }}
              >
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="row g-2 mb-4">
          <div className="col-6">
            <Button
              type="button"
              variant="outline-light"
              className="border w-100 py-2 fw-semibold"
              onClick={onClose}
              style={{
                borderColor: "#6366f1",
                color: "#4338ca",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              Cancel and Go Back
            </Button>
          </div>

          <div className="col-6">
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={loading}
              className="text-white w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2 border-0"
              style={{
                backgroundColor: "#b91c1c",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              <BsTrash style={{ fontSize: "15px" }} />
              <span>{loading ? "Deleting..." : "Confirm Delete"}</span>
            </Button>
          </div>
        </div>

        <hr style={{ borderColor: "#f1f5f9", margin: "16px 0" }} />

        {/* Security Footer Note */}
        <div className="text-muted" style={{ fontSize: "11px" }}>
          <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
            <BsLock style={{ fontSize: "12px" }} />
            <span>Secure Action Required</span>
          </div>
          <div>© 2024 ShopStream Inc. Internal Admin Tool</div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteProductModal;
