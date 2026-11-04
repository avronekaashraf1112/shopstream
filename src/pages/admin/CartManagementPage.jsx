import { useState, useEffect } from "react";
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
import { fetchCarts } from "../../services/carts";
import { fetchUsersBasic } from "../../services/users";

import {
  BsSearch,
  BsFunnel,
  BsCart2,
  BsCashCoin,
  BsStopwatch,
  BsCartX,
  BsDownload,
  BsThreeDotsVertical,
  BsChevronLeft,
  BsChevronRight,
  BsBell,
  BsArrowRight,
  BsTrash,
  BsPencil,
  BsPlus,
} from "react-icons/bs";
import { IMAGES } from "../../assets/images";
import CartFormModal from "../../modals/CartFormModal";
import DeleteCartModal from "../../modals/DeleteCartModal";

const LIMIT = 8;

const CartManagementPage = () => {
  const [carts, setCarts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCart, setSelectedCart] = useState(null);

  const handleAdded = (cart) => {
    setCarts((prev) => [cart, ...prev].slice(0, LIMIT));
    setTotal((prev) => prev + 1);
  };

  const handleUpdated = (updated) => {
    setCarts((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleDeleted = (id) => {
    const remaining = carts.filter((c) => c.id !== id);
    setCarts(remaining);
    setTotal((prev) => prev - 1);

    if (remaining.length === 0 && page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    fetchUsersBasic()
      .then(setUsers)
      .catch(() => toast.error("Failed to load users"));
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadCarts() {
      try {
        setLoading(true);
        const data = await fetchCarts({
          userId: userFilter,
          limit: LIMIT,
          skip: (page - 1) * LIMIT,
        });
        if (!cancelled) {
          setCarts(data.carts);
          setTotal(data.total);
        }
      } catch {
        if (!cancelled) {
          setCarts([]);
          setTotal(0);
          toast.error("Failed to load carts");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCarts();
    return () => {
      cancelled = true;
    };
  }, [userFilter, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = searchInput.trim();

    if (value && !/^\d+$/.test(value)) {
      toast.error("Please enter a user ID (numbers only)");
      return;
    }
    setUserFilter(value);
    setPage(1);
  };

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

  const getOwner = (userId) => users.find((u) => u.id === userId);

  const getOwnerName = (userId) => {
    const owner = getOwner(userId);
    return owner ? `${owner.firstName} ${owner.lastName}` : `User #${userId}`;
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
            Cart Management
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
            Oversee and monitor all customer shopping activity.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Form
            onSubmit={handleSearch}
            className="d-flex align-items-center px-3 py-1 bg-white rounded-3 border"
            style={{ borderColor: "#cbd5e1", width: "260px" }}
          >
            <BsSearch
              className="text-muted me-2"
              style={{ fontSize: "14px" }}
            />
            <Form.Control
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border-0 bg-transparent p-0 shadow-none"
              placeholder="Search carts, users, or IDs..."
              style={{ fontSize: "14px" }}
            />
          </Form>

          <Button
            type="button"
            onClick={() => {
              setSelectedCart(null);
              setActiveModal("add");
            }}
            className="btn-purple d-flex align-items-center gap-2 px-3 py-2"
            style={{ borderRadius: "8px", fontSize: "14px" }}
          >
            <BsFunnel />
            <span>Add Cart</span>
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <Row className="g-3 mb-4">
        {/* Active Carts */}
        <Col xs={12} sm={6} xl={3}>
          <Card
            className="p-3 border bg-white h-100"
            style={{ borderRadius: "14px", borderColor: "#e2e8f0" }}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#ede9fe",
                  color: "#6366f1",
                }}
              >
                <BsCart2 style={{ fontSize: "20px" }} />
              </div>
              <span
                className="fw-bold"
                style={{ color: "#10b981", fontSize: "13px" }}
              >
                +12.5%
              </span>
            </div>
            <div
              className="text-muted fw-semibold"
              style={{ fontSize: "11px", letterSpacing: "0.5px" }}
            >
              ACTIVE CARTS
            </div>
            <div
              className="fw-bold"
              style={{ fontSize: "28px", color: "#0f172a" }}
            >
              {total.toLocaleString()}
            </div>
          </Card>
        </Col>

        {/* Potential Revenue */}
        <Col xs={12} sm={6} xl={3}>
          <Card
            className="p-3 border bg-white h-100"
            style={{ borderRadius: "14px", borderColor: "#e2e8f0" }}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#dcfce7",
                  color: "#10b981",
                }}
              >
                <BsCashCoin style={{ fontSize: "20px" }} />
              </div>
              <span
                className="fw-bold"
                style={{ color: "#10b981", fontSize: "13px" }}
              >
                +8.2%
              </span>
            </div>
            <div
              className="text-muted fw-semibold"
              style={{ fontSize: "11px", letterSpacing: "0.5px" }}
            >
              POTENTIAL REV
            </div>
            <div
              className="fw-bold"
              style={{ fontSize: "28px", color: "#0f172a" }}
            >
              $42,910
            </div>
          </Card>
        </Col>

        {/* Avg Session */}
        <Col xs={12} sm={6} xl={3}>
          <Card
            className="p-3 border bg-white h-100"
            style={{ borderRadius: "14px", borderColor: "#e2e8f0" }}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#e0f2fe",
                  color: "#0284c7",
                }}
              >
                <BsStopwatch style={{ fontSize: "20px" }} />
              </div>
              <span
                className="fw-bold"
                style={{ color: "#ef4444", fontSize: "13px" }}
              >
                -2.1%
              </span>
            </div>
            <div
              className="text-muted fw-semibold"
              style={{ fontSize: "11px", letterSpacing: "0.5px" }}
            >
              AVG. SESSION
            </div>
            <div
              className="fw-bold"
              style={{ fontSize: "28px", color: "#0f172a" }}
            >
              14m 32s
            </div>
          </Card>
        </Col>

        {/* Abandon Rate */}
        <Col xs={12} sm={6} xl={3}>
          <Card
            className="p-3 border bg-white h-100"
            style={{ borderRadius: "14px", borderColor: "#e2e8f0" }}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#fee2e2",
                  color: "#ef4444",
                }}
              >
                <BsCartX style={{ fontSize: "20px" }} />
              </div>
              <span
                className="fw-bold"
                style={{ color: "#ef4444", fontSize: "13px" }}
              >
                +4.5%
              </span>
            </div>
            <div
              className="text-muted fw-semibold"
              style={{ fontSize: "11px", letterSpacing: "0.5px" }}
            >
              ABANDON RATE
            </div>
            <div
              className="fw-bold"
              style={{ fontSize: "28px", color: "#0f172a" }}
            >
              34.2%
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Cart Activity Table */}
      <Card
        className="mb-4 border bg-white"
        style={{ borderRadius: "16px", borderColor: "#e2e8f0" }}
      >
        <div
          className="d-flex align-items-center justify-content-between p-4 pb-3 border-bottom"
          style={{ borderColor: "#f1f5f9" }}
        >
          <h5
            className="fw-bold mb-0"
            style={{ fontSize: "16px", color: "#0f172a" }}
          >
            Recent Cart Activity
          </h5>
          <div className="d-flex align-items-center gap-3 text-muted">
            <span role="button" title="Download" style={{ cursor: "pointer" }}>
              <BsDownload />
            </span>
            <span
              role="button"
              title="More options"
              style={{ cursor: "pointer" }}
            >
              <BsThreeDotsVertical />
            </span>
          </div>
        </div>

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
              <th className="ps-4 py-3 fw-bold border-0">PRODUCTS</th>
              <th className="py-3 fw-bold border-0">USER</th>
              <th className="py-3 fw-bold border-0">TOTAL ITEMS</th>
              <th className="py-3 fw-bold border-0">TOTAL PRICE</th>
              <th className="py-3 fw-bold border-0">STATUS</th>
              <th className="pe-4 py-3 fw-bold border-0 text-end">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="text-center text-muted py-5">
                  Loading carts...
                </td>
              </tr>
            )}

            {!loading && carts.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-muted py-5">
                  No carts found
                </td>
              </tr>
            )}

            {!loading &&
              carts.map((cart) => {
                const owner = getOwner(cart.userId);
                const ownerName = getOwnerName(cart.userId);

                return (
                  <tr key={cart.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                    <td className="ps-4 py-3">
                      <span
                        className="fw-bold"
                        style={{ color: "#4338ca", fontSize: "14px" }}
                      >
                        #{cart.id}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold"
                          style={{
                            width: "36px",
                            height: "36px",
                            backgroundColor: "#6366f1",
                            fontSize: "13px",
                          }}
                        >
                          {owner ? owner.firstName[0] : "?"}
                        </div>
                        <div>
                          <div
                            className="fw-bold text-dark"
                            style={{ fontSize: "14px" }}
                          >
                            {ownerName}
                          </div>
                          <div
                            className="text-muted"
                            style={{ fontSize: "12px" }}
                          >
                            {owner ? owner.email : `ID: ${cart.userId}`}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      className="py-3 text-secondary"
                      style={{ fontSize: "14px" }}
                    >
                      {cart.totalQuantity} items
                    </td>
                    <td
                      className="py-3 fw-bold text-dark"
                      style={{ fontSize: "15px" }}
                    >
                      ${cart.discountedTotal.toFixed(2)}
                    </td>
                    <td
                      className="py-3 text-secondary"
                      style={{ fontSize: "14px" }}
                    >
                      {cart.totalProducts}
                    </td>
                    <td className="pe-4 py-3 text-end">
                      <div className="d-flex align-items-center justify-content-end gap-3">
                        <span
                          role="button"
                          title="Edit Cart"
                          onClick={() => {
                            setSelectedCart(cart);
                            setActiveModal("edit");
                          }}
                          style={{
                            color: "#4338ca",
                            cursor: "pointer",
                            fontSize: "16px",
                          }}
                        >
                          <BsPencil />
                        </span>
                        <span
                          role="button"
                          title="Delete Cart"
                          onClick={() => {
                            setSelectedCart(cart);
                            setActiveModal("delete");
                          }}
                          style={{
                            color: "#ef4444",
                            cursor: "pointer",
                            fontSize: "16px",
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

        {/* Table Pagination footer */}
        <div
          className="d-flex flex-column flex-sm-row align-items-center justify-content-between p-3 px-4 border-top"
          style={{ borderColor: "#f1f5f9" }}
        >
          <div
            className="text-muted small mb-2 mb-sm-0"
            style={{ fontSize: "13px" }}
          >
            {total === 0
              ? "No carts"
              : `Showing ${(page - 1) * LIMIT + 1} to ${Math.min(page * LIMIT, total)} of ${total} carts`}
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

      {/* Bottom Row: AI Insights & System Alerts */}
      <Row className="g-4">
        {/* Abandoned Cart Recovery Card */}
        <Col xs={12} lg={7}>
          <Card
            className="p-4 border bg-white h-100"
            style={{ borderRadius: "16px", borderColor: "#e2e8f0" }}
          >
            <div className="mb-3">
              <Badge
                bg=""
                className="text-white px-3 py-1"
                style={{
                  backgroundColor: "#4338ca",
                  borderRadius: "20px",
                  fontSize: "11px",
                  letterSpacing: "0.5px",
                }}
              >
                INSIGHTS
              </Badge>
            </div>

            <Row className="g-3 align-items-center">
              <Col xs={12} md={5}>
                <img
                  src={IMAGES.dashboardTablet}
                  alt="Analytics Dashboard"
                  className="rounded-3 w-100 shadow-sm"
                  style={{ height: "140px", objectFit: "cover" }}
                />
              </Col>

              <Col xs={12} md={7}>
                <h5
                  className="fw-bold mb-2"
                  style={{ fontSize: "18px", color: "#0f172a" }}
                >
                  Abandoned Cart Recovery
                </h5>
                <p
                  className="text-muted mb-3"
                  style={{ fontSize: "13px", lineHeight: "1.5" }}
                >
                  Our AI detected a 14% increase in abandoned high-value carts
                  this week. Consider launching an automated "Complete Your
                  Purchase" email campaign with a 5% discount incentive.
                </p>
                <div
                  className="fw-bold d-inline-flex align-items-center gap-1"
                  style={{
                    color: "#4338ca",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  <span>View Campaign Settings</span>
                  <BsArrowRight />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* System Alerts Card */}
        <Col xs={12} lg={5}>
          <Card
            className="p-4 border-0 h-100 text-white"
            style={{
              borderRadius: "16px",
              backgroundColor: "#1e293b",
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <BsBell style={{ fontSize: "18px", color: "#94a3b8" }} />
                <h5
                  className="fw-bold mb-0 text-white"
                  style={{ fontSize: "17px" }}
                >
                  System Alerts
                </h5>
              </div>
              <span
                className="rounded-circle"
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#10b981",
                }}
              />
            </div>

            <div className="d-flex flex-column gap-3 mb-4">
              <div
                className="ps-3 py-1"
                style={{ borderLeft: "3px solid #10b981" }}
              >
                <div
                  className="text-light"
                  style={{ fontSize: "13px", lineHeight: "1.4" }}
                >
                  Payment gateway response time is optimal (142ms).
                </div>
              </div>

              <div
                className="ps-3 py-1"
                style={{ borderLeft: "3px solid #ef4444" }}
              >
                <div
                  className="text-light"
                  style={{ fontSize: "13px", lineHeight: "1.4" }}
                >
                  Unusually large cart (#CRT-88209) flagged for verification.
                </div>
              </div>
            </div>

            <Button
              type="button"
              className="w-100 py-2 border-0 mt-auto"
              style={{
                backgroundColor: "#334155",
                color: "#ffffff",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Dismiss All
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Modals  */}
      <CartFormModal
        isOpen={activeModal === "add" || activeModal === "edit"}
        mode={activeModal === "edit" ? "edit" : "add"}
        cart={selectedCart}
        users={users}
        onClose={() => setActiveModal(null)}
        onSaved={activeModal === "edit" ? handleUpdated : handleAdded}
      />

      <DeleteCartModal
        isOpen={activeModal === "delete"}
        cart={selectedCart}
        ownerName={selectedCart ? getOwnerName(selectedCart.userId) : ""}
        onClose={() => setActiveModal(null)}
        onDeleted={handleDeleted}
      />
    </div>
  );
};

export default CartManagementPage;
