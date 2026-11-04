import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { updateProduct, fetchCategories } from "../services/products";
import { BsX, BsCamera, BsInfoCircle, BsCheck2, BsImage } from "react-icons/bs";

const EditProductModal = ({ isOpen = true, onClose, product, onUpdated }) => {
  const [publishStatus, setPublishStatus] = useState(true);
  const [form, setForm] = useState({
    title: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch {
        toast.error("Failed to load categories");
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title,
        sku: product.sku || "",
        category: product.category,
        price: product.price,
        stock: product.stock,
        description: product.description || "",
      });
    }
  }, [product]);

  if (!product) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async function () {
    const { title, sku, category, price, stock, description } = form;

    if (!String(title).trim() || !category || price === "" || stock === "") {
      toast.error("Please fill in all the required fields");
      return;
    }
    if (Number(price) <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }
    if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
      toast.error("Stock must be a whole number (0 or more)");
      return;
    }

    // To collect all the variables in one object
    const updates = {
      title: String(title).trim(),
      sku: String(sku).trim(),
      category,
      price: Number(price),
      stock: Number(stock),
      description: String(description).trim(),
    };

    try {
      setLoading(true);
      if (!product.isLocal) {
        await updateProduct(product.id, updates);
      }
      onUpdated({ ...product, ...updates });
      toast.success("Product updated successfully");
      onClose();
    } catch {
      toast.error("Failed to update the product");
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
      style={{ "--bs-modal-width": "740px" }}
    >
      <Modal.Body className="p-4">
        {/* Header */}
        <div className="d-flex align-items-start justify-content-between mb-4">
          <div>
            <h5 className="fw-bold mb-1 text-dark" style={{ fontSize: "18px" }}>
              Edit Product
            </h5>
            <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
              Update details for {product.title}
            </p>
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

        {/* Modal Body: 2 Columns */}
        <div className="row g-4">
          {/* Left Column: Product Images & Publish Status */}
          <div className="col-12 col-md-5">
            <h6
              className="text-secondary fw-bold mb-3"
              style={{ fontSize: "12px", letterSpacing: "0.8px" }}
            >
              PRODUCT IMAGES
            </h6>

            {/* Main Featured Image */}
            <div
              className="position-relative rounded-3 overflow-hidden mb-3 d-flex align-items-center justify-content-center"
              style={{
                border: "2px solid #4338ca",
                height: "180px",
                backgroundColor: "#0f172a",
              }}
            >
              {product.thumbnail ? (
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <BsImage style={{ fontSize: "32px", color: "#64748b" }} />
              )}
            </div>

            {/* Sub-images row */}
            <div className="row g-2 mb-4">
              {product.images?.[1] && (
                <div className="col-6">
                  <div
                    className="rounded-3 overflow-hidden"
                    style={{
                      border: "1px solid #cbd5e1",
                      height: "84px",
                      backgroundColor: "#0f172a",
                    }}
                  >
                    <img
                      src={product.images[1]}
                      alt={product.title}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              )}

              <div className="col-6">
                <div
                  className="rounded-3 d-flex flex-column align-items-center justify-content-center text-secondary h-100 p-2 text-center"
                  style={{
                    border: "1.5px dashed #cbd5e1",
                    backgroundColor: "#f8fafc",
                    cursor: "pointer",
                  }}
                >
                  <BsCamera style={{ fontSize: "18px", color: "#64748b" }} />
                  <span
                    className="small mt-1"
                    style={{ fontSize: "11px", fontWeight: 600 }}
                  >
                    Add Image
                  </span>
                </div>
              </div>
            </div>

            {/* Publish Status Toggle Card */}
            <div
              className="p-3 rounded-3 d-flex align-items-center justify-content-between"
              style={{
                backgroundColor: "#eff2fe",
                border: "1px solid #dbeafe",
              }}
            >
              <div>
                <div className="fw-bold text-dark" style={{ fontSize: "13px" }}>
                  Publish Status
                </div>
                <div className="text-muted small" style={{ fontSize: "12px" }}>
                  Visible on storefront
                </div>
              </div>

              <div className="form-check form-switch m-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  checked={publishStatus}
                  onChange={() => setPublishStatus(!publishStatus)}
                  style={{
                    backgroundColor: publishStatus ? "#4338ca" : "#cbd5e1",
                    borderColor: publishStatus ? "#4338ca" : "#cbd5e1",
                    cursor: "pointer",
                    width: "38px",
                    height: "20px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Form Inputs */}
          <div className="col-12 col-md-7">
            <div className="d-flex flex-column gap-3">
              {/* Product Name */}
              <div>
                <Form.Label
                  className="text-dark fw-medium mb-1"
                  style={{ fontSize: "13px" }}
                >
                  Product Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="form-control-custom"
                />
              </div>

              {/* SKU & Category */}
              <div className="row g-3">
                <div className="col-6">
                  <Form.Label
                    className="text-dark fw-medium mb-1"
                    style={{ fontSize: "13px" }}
                  >
                    SKU
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="sku"
                    value={form.sku}
                    onChange={handleChange}
                    className="form-control-custom"
                  />
                </div>
                <div className="col-6">
                  <Form.Label
                    className="text-dark fw-medium mb-1"
                    style={{ fontSize: "13px" }}
                  >
                    Category
                  </Form.Label>
                  <Form.Select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="form-select-custom"
                  >
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>

              {/* Price & Current Stock */}
              <div className="row g-3">
                <div className="col-6">
                  <Form.Label
                    className="text-dark fw-medium mb-1"
                    style={{ fontSize: "13px" }}
                  >
                    Price (USD)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="form-control-custom"
                  />
                </div>
                <div className="col-6">
                  <Form.Label
                    className="text-dark fw-medium mb-1"
                    style={{ fontSize: "13px" }}
                  >
                    Current Stock
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    min="0"
                    className="form-control-custom"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <Form.Label
                  className="text-dark fw-medium mb-1"
                  style={{ fontSize: "13px" }}
                >
                  Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="form-control-custom"
                  rows="4"
                  style={{ resize: "none" }}
                />
              </div>

              {/* Info Alert Box */}
              <div
                className="p-3 rounded-3 d-flex align-items-start gap-2"
                style={{
                  backgroundColor: "#ecfdf5",
                  border: "1px solid #a7f3d0",
                }}
              >
                <BsInfoCircle
                  style={{
                    color: "#059669",
                    fontSize: "16px",
                    marginTop: "2px",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "12.5px",
                    color: "#065f46",
                    lineHeight: 1.4,
                  }}
                >
                  Changes will be reflected immediately in the Customer Facing
                  store. Inventory sync takes approximately 2-3 minutes.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className="d-flex align-items-center justify-content-between mt-4 pt-3 border-top"
          style={{ borderColor: "#f1f5f9" }}
        >
          <Button
            type="button"
            variant="link"
            className="text-secondary fw-semibold text-decoration-none p-0"
            onClick={onClose}
            style={{ fontSize: "14px" }}
          >
            Discard
          </Button>

          <div className="d-flex align-items-center gap-2">
            <Button
              type="button"
              variant="outline-light"
              className="border fw-semibold px-3 py-2"
              style={{
                borderColor: "#cbd5e1",
                backgroundColor: "#ffffff",
                color: "#4338ca",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              Duplicate
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="text-white fw-semibold px-4 py-2 border-0 d-inline-flex align-items-center gap-2"
              style={{
                backgroundColor: "#4338ca",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              <BsCheck2 style={{ fontSize: "16px" }} />
              <span>{loading ? "Saving ... " : "Save Changes"}</span>
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;
