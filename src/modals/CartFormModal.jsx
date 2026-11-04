import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { getCartById, addCart, updateCart } from "../services/carts";
import { fetchProductsBasic } from "../services/products";
import { buildCartFromLines } from "../utils/cart";
import { BsX, BsCart2, BsTrash } from "react-icons/bs";

const CartFormModal = ({
  isOpen = true,
  mode = "add",
  cart,
  users = [],
  onClose,
  onSaved,
}) => {
  const [catalog, setCatalog] = useState([]);
  const [userId, setUserId] = useState("");
  const [lines, setLines] = useState([]);
  const [pickProductId, setPickProductId] = useState("");
  const [pickQty, setPickQty] = useState("1");
  const [loadingCart, setLoadingCart] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadCatalog() {
      try {
        const data = await fetchProductsBasic();
        setCatalog(data);
      } catch {
        toast.error("Failed to load products");
      }
    }
    loadCatalog();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    setPickProductId("");
    setPickQty("1");

    if (mode === "add") {
      setUserId("");
      setLines([]);
      return;
    }

    if (!cart) return;

    let cancelled = false;

    async function loadCart() {
      try {
        setLoadingCart(true);
        const data =
          cart.isLocal || cart.modified ? cart : await getCartById(cart.id);

        if (!cancelled) {
          setUserId(String(cart.userId));
          setLines(
            data.products.map((p) => ({
              id: p.id,
              title: p.title,
              price: p.price,
              thumbnail: p.thumbnail,
              discountPercentage: p.discountPercentage,
              quantity: p.quantity,
            })),
          );
        }
      } catch {
        if (!cancelled) {
          toast.error("Failed to load the cart");
        }
      } finally {
        if (!cancelled) {
          setLoadingCart(false);
        }
      }
    }

    loadCart();

    return () => {
      cancelled = true;
    };
  }, [isOpen, mode, cart]);

  if (mode === "edit" && !cart) return null;

  const owner = users.find((u) => String(u.id) === userId);
  const summary = buildCartFromLines(lines);

  const handleAddLine = () => {
    const qty = Number(pickQty);

    if (!pickProductId) {
      toast.error("Please choose a product");
      return;
    }

    if (!Number.isInteger(qty) || qty < 1) {
      toast.error("Quantity must be a whole number (1 or more)");
      return;
    }

    const product = catalog.find((p) => p.id === Number(pickProductId));
    if (!product) return;

    setLines((prev) => {
      const exists = prev.find((l) => l.id === product.id);

      if (exists) {
        return prev.map((l) =>
          l.id === product.id ? { ...l, quantity: l.quantity + qty } : l,
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          discountPercentage: product.discountPercentage,
          quantity: qty,
        },
      ];
    });

    setPickProductId("");
    setPickQty("1");
  };

  const handleQtyChange = (id, value) => {
    const qty = Math.max(1, Math.floor(Number(value)) || 1);
    setLines((prev) =>
      prev.map((l) => (l.id === id ? { ...l, quantity: qty } : l)),
    );
  };

  const handleRemoveLine = (id) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  };

  const handleSave = async () => {
    if (mode === "add" && !userId) {
      toast.error("Please choose a user");
      return;
    }

    if (lines.length === 0) {
      toast.error("Add at least one product");
      return;
    }

    const payload = {
      products: lines.map((l) => ({ id: l.id, quantity: l.quantity })),
    };
    const built = buildCartFromLines(lines);

    try {
      setSaving(true);

      if (mode === "add") {
        await addCart({ userId: Number(userId), ...payload });
        onSaved({
          id: Date.now(),
          isLocal: true,
          userId: Number(userId),
          ...built,
        });
        toast.success("Cart created successfully");
      } else {
        if (!cart.isLocal) {
          await updateCart(cart.id, { merge: false, ...payload });
        }
        onSaved({ ...cart, ...built, modified: true }); // Modified flag to indicate that the cart has been changed locally .. no need to fetch it again from the API
        toast.success("Cart updated successfully");
      }

      onClose();
    } catch {
      toast.error("Failed to save the cart");
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
      style={{ "--bs-modal-width": "620px" }}
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
              <BsCart2 />
            </div>
            <div>
              <h5
                className="fw-bold mb-0 text-dark"
                style={{ fontSize: "18px" }}
              >
                {mode === "add" ? "Add New Cart" : `Edit Cart #${cart.id}`}
              </h5>
              <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
                {mode === "add"
                  ? "Choose a user and add products to the cart."
                  : "Change quantities or add and remove products."}
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

        {loadingCart ? (
          <div className="text-center text-muted py-5">Loading cart...</div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {/* User */}
            <div>
              <Form.Label
                className="text-dark fw-medium mb-1"
                style={{ fontSize: "13px" }}
              >
                User
              </Form.Label>
              {mode === "add" ? (
                <Form.Select
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="form-select-custom"
                >
                  <option value="">Select a user</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.firstName} {u.lastName}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <div className="form-control form-control-custom bg-light">
                  {owner
                    ? `${owner.firstName} ${owner.lastName}`
                    : `User #${userId}`}
                </div>
              )}
            </div>

            {/* Product picker */}
            <div>
              <Form.Label
                className="text-dark fw-medium mb-1"
                style={{ fontSize: "13px" }}
              >
                Add a product
              </Form.Label>
              <div className="d-flex gap-2">
                <Form.Select
                  value={pickProductId}
                  onChange={(e) => setPickProductId(e.target.value)}
                  className="form-select-custom flex-grow-1"
                >
                  <option value="">Choose a product</option>
                  {catalog.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} - ${p.price.toFixed(2)}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control
                  type="number"
                  min="1"
                  value={pickQty}
                  onChange={(e) => setPickQty(e.target.value)}
                  className="form-control-custom"
                  style={{ width: "80px" }}
                />
                <Button
                  type="button"
                  onClick={handleAddLine}
                  className="text-white fw-semibold border-0 px-3"
                  style={{
                    backgroundColor: "#10b981",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Lines */}
            <div style={{ maxHeight: "220px", overflowY: "auto" }}>
              {lines.length === 0 && (
                <div
                  className="text-center text-muted py-4"
                  style={{ fontSize: "13px" }}
                >
                  No products in this cart yet.
                </div>
              )}

              {lines.map((l) => (
                <div
                  key={l.id}
                  className="d-flex align-items-center gap-3 py-2 border-bottom"
                  style={{ borderColor: "#f1f5f9" }}
                >
                  <img
                    src={l.thumbnail}
                    alt={l.title}
                    className="rounded-2"
                    style={{
                      width: "44px",
                      height: "44px",
                      objectFit: "cover",
                      backgroundColor: "#e2e8f0",
                    }}
                  />
                  <div className="flex-grow-1 overflow-hidden">
                    <div
                      className="fw-semibold text-dark text-truncate"
                      style={{ fontSize: "13px" }}
                    >
                      {l.title}
                    </div>
                    <div className="text-muted" style={{ fontSize: "12px" }}>
                      ${l.price.toFixed(2)} each
                    </div>
                  </div>
                  <Form.Control
                    type="number"
                    min="1"
                    value={l.quantity}
                    onChange={(e) => handleQtyChange(l.id, e.target.value)}
                    className="form-control-custom"
                    style={{ width: "70px" }}
                  />
                  <div
                    className="fw-bold text-dark text-end"
                    style={{ fontSize: "13px", width: "70px" }}
                  >
                    ${(l.price * l.quantity).toFixed(2)}
                  </div>
                  <span
                    role="button"
                    title="Remove"
                    onClick={() => handleRemoveLine(l.id)}
                    style={{
                      color: "#ef4444",
                      cursor: "pointer",
                      fontSize: "15px",
                    }}
                  >
                    <BsTrash />
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div
              className="d-flex justify-content-between align-items-center p-3 rounded-3"
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <span className="text-muted" style={{ fontSize: "13px" }}>
                {summary.totalQuantity} items - ${summary.total.toFixed(2)}{" "}
                before discount
              </span>
              <span
                className="fw-bold"
                style={{ color: "#4338ca", fontSize: "18px" }}
              >
                ${summary.discountedTotal.toFixed(2)}
              </span>
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
            disabled={saving || loadingCart}
            className="text-white fw-semibold px-4 py-2 border-0"
            style={{
              backgroundColor: "#4338ca",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            {saving
              ? "Saving..."
              : mode === "add"
                ? "Create Cart"
                : "Save Changes"}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CartFormModal;
