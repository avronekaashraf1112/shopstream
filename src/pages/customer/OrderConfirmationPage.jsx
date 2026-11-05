import { Link } from "react-router-dom";
import { IMAGES } from "../../assets/images";
import { BsCheck, BsTruck, BsBoxSeam, BsQuestionCircle } from "react-icons/bs";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const OrderConfirmationPage = () => {
  return (
    <Container fluid className="px-lg-5 px-3 py-5">
      {/* Top Success Header */}
      <div className="text-center mb-5">
        <div
          className="mx-auto rounded-circle d-flex align-items-center justify-content-center text-white mb-3 shadow-sm"
          style={{
            width: "64px",
            height: "64px",
            backgroundColor: "#10b981",
            fontSize: "32px",
          }}
        >
          <BsCheck />
        </div>

        <h1 className="fw-bold mb-2 text-dark" style={{ fontSize: "32px" }}>
          Order #12345 Confirmed
        </h1>
        <p
          className="text-muted mx-auto"
          style={{ maxWidth: "600px", fontSize: "15px" }}
        >
          Woohoo! Your order has been placed successfully. We've sent a
          confirmation email to{" "}
          <span className="fw-semibold text-dark">alex.design@example.com</span>
          .
        </p>
      </div>

      {/* Main Grid */}
      <Row
        className="g-4 mb-5"
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >
        {/* Left Column: Estimated Delivery & Shipment Tracker */}
        <Col xs={12} lg={7}>
          <Card
            className="p-4 border bg-white h-100 shadow-sm"
            style={{ borderRadius: "16px", borderColor: "#e2e8f0" }}
          >
            <div className="d-flex align-items-center justify-content-between mb-1">
              <h5
                className="fw-bold mb-0 text-dark"
                style={{ fontSize: "18px" }}
              >
                Estimated Delivery
              </h5>
              <BsTruck style={{ color: "#64748b", fontSize: "20px" }} />
            </div>

            <div
              className="fw-bold mb-4"
              style={{ color: "#059669", fontSize: "15px" }}
            >
              Tuesday, October 24th, 2024
            </div>

            {/* Stepper */}
            <div className="d-flex align-items-center justify-content-between position-relative mb-4 px-2">
              {/* Step 1: Placed */}
              <div
                className="d-flex flex-column align-items-center text-center position-relative"
                style={{ zIndex: 2 }}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold mb-2 shadow-sm"
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "#4338ca",
                    fontSize: "18px",
                  }}
                >
                  <BsCheck />
                </div>
                <span
                  className="fw-bold text-dark small"
                  style={{ fontSize: "12px" }}
                >
                  Placed
                </span>
              </div>

              {/* Line 1 */}
              <div
                className="flex-grow-1 mx-2"
                style={{
                  height: "3px",
                  backgroundColor: "#4338ca",
                  marginTop: "-20px",
                }}
              />

              {/* Step 2: Processing */}
              <div
                className="d-flex flex-column align-items-center text-center position-relative"
                style={{ zIndex: 2 }}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-secondary border mb-2 bg-white"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderColor: "#cbd5e1",
                    fontSize: "16px",
                  }}
                >
                  <BsBoxSeam />
                </div>
                <span
                  className="text-secondary small"
                  style={{ fontSize: "12px" }}
                >
                  Processing
                </span>
              </div>

              {/* Line 2 */}
              <div
                className="flex-grow-1 mx-2"
                style={{
                  height: "3px",
                  backgroundColor: "#e2e8f0",
                  marginTop: "-20px",
                }}
              />

              {/* Step 3: Shipped */}
              <div
                className="d-flex flex-column align-items-center text-center position-relative"
                style={{ zIndex: 2 }}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-secondary border mb-2 bg-white"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderColor: "#cbd5e1",
                    fontSize: "16px",
                  }}
                >
                  <BsTruck />
                </div>
                <span
                  className="text-secondary small"
                  style={{ fontSize: "12px" }}
                >
                  Shipped
                </span>
              </div>
            </div>

            <hr style={{ borderColor: "#e2e8f0", margin: "20px 0" }} />

            {/* Shipping Info Details */}
            <Row className="g-3">
              <Col xs={12} sm={6}>
                <div
                  className="text-secondary fw-bold mb-1"
                  style={{ fontSize: "11px", letterSpacing: "0.6px" }}
                >
                  SHIPPING ADDRESS
                </div>
                <div className="text-dark fw-medium small mb-1">
                  Alex Johnston
                </div>
                <div className="text-muted small">
                  123 Indigo Way, Suite 404
                </div>
                <div className="text-muted small">San Francisco, CA 94103</div>
              </Col>

              <Col xs={12} sm={6}>
                <div
                  className="text-secondary fw-bold mb-1"
                  style={{ fontSize: "11px", letterSpacing: "0.6px" }}
                >
                  SHIPPING METHOD
                </div>
                <div className="text-dark fw-medium small">
                  Express Delivery (2-3 Business Days)
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Right Column: Order Summary */}
        <Col xs={12} lg={5}>
          <Card
            className="p-4 border h-100 shadow-sm"
            style={{
              backgroundColor: "#f8fafc",
              borderColor: "#e2e8f0",
              borderRadius: "16px",
            }}
          >
            <h5 className="fw-bold mb-4 text-dark" style={{ fontSize: "18px" }}>
              Order Summary
            </h5>

            {/* Item 1 */}
            <div className="d-flex align-items-center gap-3 mb-3">
              <img
                src={IMAGES.hpAngle1}
                alt="StreamPeak Pro Headphones"
                className="rounded-2"
                style={{ width: "56px", height: "56px", objectFit: "cover" }}
              />
              <div className="flex-grow-1 overflow-hidden">
                <div
                  className="fw-bold text-dark text-truncate"
                  style={{ fontSize: "14px" }}
                >
                  StreamPeak Pro Headphones
                </div>
                <div className="text-muted small" style={{ fontSize: "12px" }}>
                  Qty: 1 • Midnight Black
                </div>
              </div>
              <div className="fw-bold text-dark" style={{ fontSize: "15px" }}>
                $299.00
              </div>
            </div>

            {/* Item 2 */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <img
                src={IMAGES.mintCable}
                alt="Ultra-Link Braided Cable"
                className="rounded-2"
                style={{ width: "56px", height: "56px", objectFit: "cover" }}
              />
              <div className="flex-grow-1 overflow-hidden">
                <div
                  className="fw-bold text-dark text-truncate"
                  style={{ fontSize: "14px" }}
                >
                  Ultra-Link Braided Cable
                </div>
                <div className="text-muted small" style={{ fontSize: "12px" }}>
                  Qty: 2 • Mint Green
                </div>
              </div>
              <div className="fw-bold text-dark" style={{ fontSize: "15px" }}>
                $48.00
              </div>
            </div>

            <hr style={{ borderColor: "#cbd5e1", margin: "16px 0" }} />

            {/* Price rows */}
            <div className="d-flex justify-content-between mb-2 small">
              <span className="text-secondary">Subtotal</span>
              <span className="fw-semibold text-dark">$347.00</span>
            </div>

            <div className="d-flex justify-content-between mb-2 small">
              <span className="text-secondary">Shipping</span>
              <span className="fw-bold" style={{ color: "#059669" }}>
                FREE
              </span>
            </div>

            <div className="d-flex justify-content-between mb-3 small">
              <span className="text-secondary">Tax</span>
              <span className="fw-semibold text-dark">$27.76</span>
            </div>

            <hr style={{ borderColor: "#cbd5e1", margin: "16px 0" }} />

            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-bold text-dark" style={{ fontSize: "17px" }}>
                Total
              </span>
              <span
                className="fw-bold"
                style={{ fontSize: "22px", color: "#4338ca" }}
              >
                $374.76
              </span>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Buttons Row */}
      <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 mb-5">
        <Button
          to="/products"
          as={Link}
          variant={null}
          className="text-white px-4 py-2 fw-semibold border-0"
          style={{
            backgroundColor: "#4338ca",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        >
          Continue Shopping
        </Button>
        <Button
          to="/products"
          as={Link}
          variant="outline-light"
          className="border px-4 py-2 fw-semibold"
          style={{
            borderColor: "#6366f1",
            color: "#4338ca",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        >
          View Order History
        </Button>
      </div>

      {/* Support Alert Box */}
      <div
        className="p-3 px-4 rounded-4 border d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 shadow-sm"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          backgroundColor: "#d1fae5",
          borderColor: "#a7f3d0",
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
            style={{
              width: "38px",
              height: "38px",
              backgroundColor: "#10b981",
              fontSize: "20px",
            }}
          >
            <BsQuestionCircle />
          </div>
          <div>
            <div className="fw-bold text-dark" style={{ fontSize: "14px" }}>
              Need help with your order?
            </div>
            <div className="text-secondary small" style={{ fontSize: "13px" }}>
              Our support team is available 24/7. Reference order #12345 when
              contacting us.
            </div>
          </div>
        </div>

        <Button
          type="button"
          variant={null}
          className="text-white fw-bold px-4 py-2 border-0 flex-shrink-0"
          style={{
            backgroundColor: "#065f46",
            borderRadius: "20px",
            fontSize: "13px",
          }}
        >
          Contact Support
        </Button>
      </div>
    </Container>
  );
};

export default OrderConfirmationPage;
