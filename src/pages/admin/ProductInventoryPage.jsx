import { useState, useEffect } from "react";

import AddProductModal from "../../modals/AddProductModal";
import EditProductModal from "../../modals/EditProductModal";
import DeleteProductModal from "../../modals/DeleteProductModal";

import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import toast from "react-hot-toast";
import { fetchProducts } from "../../services/products";
import {
  BsPlus,
  BsSearch,
  BsFunnel,
  BsDownload,
  BsPencil,
  BsTrash,
  BsChevronLeft,
  BsChevronRight,
  BsGraphUpArrow,
  BsCart2,
  BsExclamationTriangle,
  BsImage,
} from "react-icons/bs";

const LIMIT = 8;

const getStockInfo = (stock) => {
  if (stock === 0) {
    return { label: "Out of Stock", color: "#64748b", dot: "#94a3b8" };
  }
  if (stock <= 10) {
    return { label: `Only ${stock} Left`, color: "#ef4444", dot: "#ef4444" };
  }
  return { label: `${stock} In Stock`, color: "#10b981", dot: "#10b981" };
};

const ProductInventoryPage = ({ defaultModal = null }) => {
  const [activeModal, setActiveModal] = useState(defaultModal);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProducts({
          search,
          limit: LIMIT,
          skip: (page - 1) * LIMIT,
        });
        if (!cancelled) {
          setProducts(data.products);
          setTotal(data.total);
        }
      } catch {
        if (!cancelled) {
          toast.error("Failed to load products");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    loadProducts();
    return () => {
      cancelled = true;
    };
  }, [search, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
    setPage(1);
  };

  const handleDeleted = (id) => {
    const remainig = products.filter((p) => p.id !== id);
    setProducts(remainig);
    setTotal((prev) => prev - 1);

    if (remainig.length === 0 && page > 1) {
      setPage(page - 1);
    }
  };

  // Pagination
  const totalPages = Math.ceil(total / LIMIT);

  const getPageNumbers = () => {
    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, start + 2);
    start = Math.max(1, end - 2);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleAdded = (product) => {
    setProducts((prev) => [product, ...prev].slice(0, LIMIT)); // Make list with the new product in the first then the prev products
    setTotal((prev) => prev + 1);
  };

  const handleUpdated = (updated) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)),
    );
  };

  return (
    <div>
      {/* Header Row */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-3">
        <div>
          <h2
            className="fw-bold mb-1"
            style={{ fontSize: "26px", color: "#0f172a" }}
          >
            Product Inventory
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
            Manage your catalog, stock levels, and pricing.
          </p>
        </div>

        <Button
          type="button"
          className="d-inline-flex align-items-center gap-1 text-white px-3 py-2 border-0 shadow-sm"
          style={{
            backgroundColor: "#10b981",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 600,
          }}
          onClick={() => setActiveModal("add")}
        >
          <BsPlus style={{ fontSize: "20px" }} />
          <span>Add New Product</span>
        </Button>
      </div>

      {/* Filter and Action Bar */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-3">
        <Form
          onSubmit={handleSearch}
          className="d-flex align-items-center px-3 py-2 bg-white rounded-3 border flex-grow-1 me-md-3"
          style={{ borderColor: "#cbd5e1", maxWidth: "460px" }}
        >
          <BsSearch className="text-muted me-2" style={{ fontSize: "14px" }} />
          <Form.Control
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border-0 bg-transparent p-0 shadow-none"
            placeholder="Search products by name, brand, or category..."
            style={{ fontSize: "14px" }}
          />
        </Form>

        <div className="d-flex align-items-center gap-2">
          <Button
            type="button"
            variant="outline-light"
            className="border text-dark d-flex align-items-center gap-2 px-3 py-2"
            style={{
              borderColor: "#cbd5e1",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            <BsFunnel />
            <span>Filters</span>
          </Button>
          <Button
            type="button"
            variant="outline-light"
            className="border text-dark d-flex align-items-center gap-2 px-3 py-2"
            style={{
              borderColor: "#cbd5e1",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            <BsDownload />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Inventory Table */}
      <Card
        className="mb-4 border bg-white shadow-sm"
        style={{ borderRadius: "16px", borderColor: "#e2e8f0" }}
      >
        <Table responsive className="align-middle mb-0">
          <thead>
            <tr
              style={{
                backgroundColor: "#f8fafc",
                color: "#64748b",
                fontSize: "12px",
                letterSpacing: "0.5px",
              }}
            >
              <th className="ps-4 py-3 fw-bold border-0">Product</th>
              <th className="py-3 fw-bold border-0">Category</th>
              <th className="py-3 fw-bold border-0">Price</th>
              <th className="py-3 fw-bold border-0">Stock Status</th>
              <th className="pe-4 py-3 fw-bold border-0 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="text-center text-muted py-5">
                  Loading products...
                </td>
              </tr>
            )}

            {!loading && products.length === 0 && (
              <tr>
                {/* colSpan 5 makes the cell takes 5 columns to center the loading... mess */}
                <td colSpan={5} className="text-center text-muted py-5">
                  No products found
                </td>
              </tr>
            )}

            {!loading &&
              products.map((item) => {
                const stockInfo = getStockInfo(item.stock);

                return (
                  <tr key={item.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                    <td className="ps-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        {item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="rounded-2"
                            style={{
                              width: "44px",
                              height: "44px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            className="rounded-2 d-flex align-items-center justify-content-center"
                            style={{
                              width: "44px",
                              height: "44px",
                              backgroundColor: "#e2e8f0",
                              color: "#94a3b8",
                            }}
                          >
                            <BsImage />
                          </div>
                        )}
                        <div>
                          <div
                            className="fw-semibold text-dark"
                            style={{ fontSize: "14px" }}
                          >
                            {item.title}
                          </div>
                          <div
                            className="text-muted"
                            style={{ fontSize: "12px" }}
                          >
                            SKU: {item.sku}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <Badge
                        bg=""
                        className="px-3 py-1 fw-bold text-uppercase"
                        style={{
                          backgroundColor: "#e0e7ff",
                          color: "#4338ca",
                          borderRadius: "20px",
                          fontSize: "11px",
                          letterSpacing: "0.4px",
                        }}
                      >
                        {item.category}
                      </Badge>
                    </td>
                    <td
                      className="py-3 fw-bold text-dark"
                      style={{ fontSize: "15px" }}
                    >
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="py-3">
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className="rounded-circle"
                          style={{
                            width: "7px",
                            height: "7px",
                            backgroundColor: stockInfo.dot,
                          }}
                        />
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: stockInfo.color,
                          }}
                        >
                          {stockInfo.label}
                        </span>
                      </div>
                    </td>
                    <td className="pe-4 py-3 text-end">
                      <div className="d-flex align-items-center justify-content-end gap-3 text-secondary">
                        <span
                          role="button"
                          title="Edit Product"
                          style={{
                            color: "#4338ca",
                            cursor: "pointer",
                            fontSize: "16px",
                          }}
                          onClick={() => {
                            setSelectedProduct(item);
                            setActiveModal("edit");
                          }}
                        >
                          <BsPencil />
                        </span>
                        <span
                          role="button"
                          title="Delete Product"
                          style={{
                            color: "#ef4444",
                            cursor: "pointer",
                            fontSize: "16px",
                          }}
                          onClick={() => {
                            setSelectedProduct(item);
                            setActiveModal("delete");
                          }}
                        >
                          <BsTrash />
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        {/* Table Pagination */}
        <div
          className="d-flex flex-column flex-sm-row align-items-center justify-content-between p-3 px-4 border-top"
          style={{ borderColor: "#f1f5f9" }}
        >
          <div
            className="text-muted small mb-2 mb-sm-0"
            style={{ fontSize: "13px" }}
          >
            {total === 0
              ? "No products"
              : `Showing ${(page - 1) * LIMIT + 1} to ${Math.min(page * LIMIT, total)} of ${total} products`}
          </div>

          {totalPages > 1 && (
            <Pagination
              className="mb-0 gap-1"
              style={{
                "--bs-pagination-active-bg": "#4338ca",
                "--bs-pagination-active-border-color": "#4338ca",
              }}
            >
              <Pagination.Prev
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <BsChevronLeft style={{ fontSize: "11px" }} />
              </Pagination.Prev>

              {getPageNumbers().map((p) => (
                <Pagination.Item
                  key={p}
                  active={p === page}
                  onClick={() => setPage(p)}
                >
                  {p}
                </Pagination.Item>
              ))}

              <Pagination.Next
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                <BsChevronRight style={{ fontSize: "11px" }} />
              </Pagination.Next>
            </Pagination>
          )}
        </div>
      </Card>

      {/* 3 Stat Cards at Bottom */}
      <Row className="g-4">
        {/* Total Sales */}
        <Col xs={12} md={4}>
          <Card
            className="p-4 border bg-white h-100 shadow-sm"
            style={{ borderRadius: "16px", borderColor: "#e2e8f0" }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "42px",
                  height: "42px",
                  backgroundColor: "#e0e7ff",
                  color: "#4338ca",
                }}
              >
                <BsGraphUpArrow style={{ fontSize: "18px" }} />
              </div>
              <span
                className="fw-bold"
                style={{ color: "#10b981", fontSize: "13px" }}
              >
                +12.5%
              </span>
            </div>
            <div
              className="text-secondary fw-semibold mb-1"
              style={{ fontSize: "11px", letterSpacing: "0.6px" }}
            >
              TOTAL SALES
            </div>
            <div
              className="fw-bold"
              style={{ fontSize: "26px", color: "#0f172a" }}
            >
              $48,290.00
            </div>
          </Card>
        </Col>

        {/* Active Carts */}
        <Col xs={12} md={4}>
          <Card
            className="p-4 border bg-white h-100 shadow-sm"
            style={{ borderRadius: "16px", borderColor: "#e2e8f0" }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "42px",
                  height: "42px",
                  backgroundColor: "#e0e7ff",
                  color: "#4338ca",
                }}
              >
                <BsCart2 style={{ fontSize: "20px" }} />
              </div>
              <span className="text-muted small" style={{ fontSize: "12px" }}>
                Current Period
              </span>
            </div>
            <div
              className="text-secondary fw-semibold mb-1"
              style={{ fontSize: "11px", letterSpacing: "0.6px" }}
            >
              ACTIVE CARTS
            </div>
            <div
              className="fw-bold"
              style={{ fontSize: "26px", color: "#0f172a" }}
            >
              1,240
            </div>
          </Card>
        </Col>

        {/* Low Stock Alerts */}
        <Col xs={12} md={4}>
          <Card
            className="p-4 border bg-white h-100 shadow-sm"
            style={{ borderRadius: "16px", borderColor: "#e2e8f0" }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "42px",
                  height: "42px",
                  backgroundColor: "#d1fae5",
                  color: "#059669",
                }}
              >
                <BsExclamationTriangle style={{ fontSize: "20px" }} />
              </div>
              <span
                className="fw-bold"
                style={{ color: "#ef4444", fontSize: "13px" }}
              >
                -4 Items
              </span>
            </div>
            <div
              className="text-secondary fw-semibold mb-1"
              style={{ fontSize: "11px", letterSpacing: "0.6px" }}
            >
              LOW STOCK ALERTS
            </div>
            <div
              className="fw-bold"
              style={{ fontSize: "26px", color: "#0f172a" }}
            >
              18
            </div>
          </Card>
        </Col>
      </Row>

      {/* Modals triggered dynamically */}
      <AddProductModal
        isOpen={activeModal === "add"}
        onClose={() => setActiveModal(null)}
        onAdded={handleAdded}
      />

      <EditProductModal
        isOpen={activeModal === "edit"}
        onClose={() => setActiveModal(null)}
        product={selectedProduct}
        onUpdated={handleUpdated}
      />

      <DeleteProductModal
        isOpen={activeModal === "delete"}
        onClose={() => setActiveModal(null)}
        product={selectedProduct}
        onDeleted={handleDeleted}
      />
    </div>
  );
};

export default ProductInventoryPage;
