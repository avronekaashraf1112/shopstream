import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { addProduct, fetchCategories } from "../services/products";
import { BsX, BsCloudUpload } from "react-icons/bs";

const emptyForm = {
  title: "",
  sku: "",
  category: "",
  price: "",
  stock: "",
  description: "",
};

const AddProductModal = ({ isOpen = true, onClose, onAdded }) => {
  const [form, setForm] = useState(emptyForm);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async function () {
    const { title, sku, category, price, stock, description } = form;

    if (!title.trim() || !category || price === "" || stock === "") {
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

    try {
      setLoading(true);
      const created = await addProduct({
        title: title.trim(),
        sku: sku.trim(),
        category,
        price: Number(price),
        stock: Number(stock),
        description: description.trim(),
      });

      onAdded({ ...created, id: Date.now(), isLocal: true });
      toast.success("Product created successfully");
      setForm(emptyForm);
      onClose();
    } catch {
      toast.error("Failed to create the product");
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
      style={{ "--bs-modal-width": "560px" }}
    >
      <Modal.Body className="p-4">
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h5 className="fw-bold mb-0 text-dark" style={{ fontSize: "18px" }}>
            Add New Product
          </h5>
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
          {/* Row 1: Name and SKU */}
          <div className="row g-3">
            <div className="col-12 col-sm-6">
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
                placeholder="e.g. SonicWave Pro 2"
              />
            </div>
            <div className="col-12 col-sm-6">
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
                placeholder="SKU-0000-XX"
              />
            </div>
          </div>

          {/* Row 2: Category and Price */}
          <div className="row g-3">
            <div className="col-12 col-sm-6">
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
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="col-12 col-sm-6">
              <Form.Label
                className="text-dark fw-medium mb-1"
                style={{ fontSize: "13px" }}
              >
                Price ($)
              </Form.Label>
              <Form.Control
                name="price"
                value={form.price}
                type="number"
                min="0"
                step="0.01" // the price can inc or dec by 0.01 amount
                onChange={handleChange}
                className="form-control-custom"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Row 3: Stock Quantity */}
          <div className="row g-3">
            <div className="col-12 col-sm-6">
              <Form.Label
                className="text-dark fw-medium mb-1"
                style={{ fontSize: "13px" }}
              >
                Stock Quantity
              </Form.Label>
              <Form.Control
                name="stock"
                value={form.stock}
                onChange={handleChange}
                min="0"
                type="number"
                className="form-control-custom"
                placeholder="0"
              />
            </div>
          </div>

          {/* Row 4: Description */}
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
              rows="3"
              placeholder="Enter product details..."
              style={{ resize: "none" }}
            />
          </div>

          {/* Row 5: Product Images Upload Area */}
          <div>
            <Form.Label
              className="text-dark fw-medium mb-1"
              style={{ fontSize: "13px" }}
            >
              Product Images
            </Form.Label>
            <div
              className="d-flex flex-column align-items-center justify-content-center p-4 rounded-3 text-center"
              style={{
                border: "2px dashed #cbd5e1",
                backgroundColor: "#f8faff",
                cursor: "pointer",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center mb-2"
                style={{ color: "#4338ca", fontSize: "26px" }}
              >
                <BsCloudUpload />
              </div>
              <div
                className="text-secondary small fw-medium"
                style={{ fontSize: "13px" }}
              >
                Click or drag images to upload
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="d-flex align-items-center justify-content-end gap-3 mt-4 pt-2">
          <Button
            type="button"
            variant="link"
            className="text-secondary fw-semibold text-decoration-none px-3"
            onClick={onClose}
            style={{ fontSize: "14px" }}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="text-white fw-semibold px-4 py-2 border-0"
            style={{
              backgroundColor: "#4338ca",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            {loading ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;
