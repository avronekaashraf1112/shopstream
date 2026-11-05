import React, { useState } from "react";
import { IMAGES } from "../../assets/images";
import {
  BsTruck,
  BsCreditCard,
  BsCreditCard2Front,
  BsWallet2,
  BsArrowRight,
  BsShieldCheck,
  BsArrowRepeat,
} from "react-icons/bs";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <Container fluid className="px-lg-5 px-3 py-4">
      {/* Title & Subtitle */}
      <div className="mb-4">
        <h2
          className="fw-bold mb-1"
          style={{ fontSize: "28px", color: "#0f172a" }}
        >
          Secure Checkout
        </h2>
        <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
          Complete your order with ShopStream's verified protection.
        </p>
      </div>

      {/* Progress Steps */}
      <div
        className="d-flex align-items-center mb-5"
        style={{ maxWidth: "420px" }}
      >
        <div className="d-flex align-items-center gap-2">
          <div
            className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold"
            style={{
              width: "26px",
              height: "26px",
              backgroundColor: "#4338ca",
              fontSize: "13px",
            }}
          >
            1
          </div>
          <span
            className="fw-bold"
            style={{ fontSize: "14px", color: "#4338ca" }}
          >
            Shipping
          </span>
        </div>

        <div
          className="flex-grow-1 mx-3"
          style={{ height: "2px", backgroundColor: "#e2e8f0" }}
        />

        <div className="d-flex align-items-center gap-2">
          <div
            className="rounded-circle text-muted d-flex align-items-center justify-content-center fw-medium border"
            style={{
              width: "26px",
              height: "26px",
              backgroundColor: "#ffffff",
              borderColor: "#cbd5e1",
              fontSize: "13px",
            }}
          >
            2
          </div>
          <span className="text-muted" style={{ fontSize: "14px" }}>
            Payment
          </span>
        </div>

        <div
          className="flex-grow-1 mx-3"
          style={{ height: "2px", backgroundColor: "#e2e8f0" }}
        />

        <div className="d-flex align-items-center gap-2">
          <div
            className="rounded-circle text-muted d-flex align-items-center justify-content-center fw-medium border"
            style={{
              width: "26px",
              height: "26px",
              backgroundColor: "#ffffff",
              borderColor: "#cbd5e1",
              fontSize: "13px",
            }}
          >
            3
          </div>
          <span className="text-muted" style={{ fontSize: "14px" }}>
            Review
          </span>
        </div>
      </div>

      {/* Main Grid: Forms on Left, Order Summary on Right */}
      <Row className="g-4">
        {/* Left Column: Forms */}
        <Col xs={12} lg={7}>
          {/* Shipping Information Card */}
          <Card
            className="p-4 mb-4 border bg-white"
            style={{
              borderRadius: "16px",
              borderColor: "#e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <div className="d-flex align-items-center gap-2 mb-4">
              <BsTruck style={{ color: "#4338ca", fontSize: "22px" }} />
              <h5
                className="fw-bold mb-0"
                style={{ fontSize: "18px", color: "#0f172a" }}
              >
                Shipping Information
              </h5>
            </div>

            <Row className="g-3">
              <Col xs={12} sm={6}>
                <Form.Label
                  className="text-dark fw-medium mb-1"
                  style={{ fontSize: "13px" }}
                >
                  First Name
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control-custom"
                  defaultValue="John"
                />
              </Col>

              <Col xs={12} sm={6}>
                <Form.Label
                  className="text-dark fw-medium mb-1"
                  style={{ fontSize: "13px" }}
                >
                  Last Name
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control-custom"
                  defaultValue="Doe"
                />
              </Col>

              <Col xs={12}>
                <Form.Label
                  className="text-dark fw-medium mb-1"
                  style={{ fontSize: "13px" }}
                >
                  Address
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control-custom"
                  defaultValue="123 Commerce Way"
                />
              </Col>

              <Col xs={12} sm={4}>
                <Form.Label
                  className="text-dark fw-medium mb-1"
                  style={{ fontSize: "13px" }}
                >
                  City
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control-custom"
                  defaultValue="New York"
                />
              </Col>

              <Col xs={12} sm={4}>
                <Form.Label
                  className="text-dark fw-medium mb-1"
                  style={{ fontSize: "13px" }}
                >
                  Zip Code
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control-custom"
                  defaultValue="10001"
                />
              </Col>

              <Col xs={12} sm={4}>
                <Form.Label
                  className="text-dark fw-medium mb-1"
                  style={{ fontSize: "13px" }}
                >
                  Phone Number
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control-custom"
                  defaultValue="+1 (555) 000-0000"
                />
              </Col>
            </Row>
          </Card>

          {/* Payment Method Card */}
          <Card
            className="p-4 mb-4 border bg-white"
            style={{
              borderRadius: "16px",
              borderColor: "#e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <div className="d-flex align-items-center gap-2 mb-4">
              <BsCreditCard style={{ color: "#4338ca", fontSize: "20px" }} />
              <h5
                className="fw-bold mb-0"
                style={{ fontSize: "18px", color: "#0f172a" }}
              >
                Payment Method
              </h5>
            </div>

            {/* Credit or Debit Card Option */}
            <div
              className="p-3 mb-3 border rounded-3"
              style={{
                borderColor: paymentMethod === "card" ? "#4338ca" : "#e2e8f0",
                borderWidth: paymentMethod === "card" ? "1.5px" : "1px",
                backgroundColor: "#ffffff",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-between mb-3"
                role="button"
                onClick={() => setPaymentMethod("card")}
              >
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    className="form-check-input m-0"
                    name="payment"
                    id="card-option"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    style={{ accentColor: "#4338ca", cursor: "pointer" }}
                  />
                  <label
                    htmlFor="card-option"
                    className="fw-semibold mb-0"
                    style={{
                      fontSize: "14px",
                      cursor: "pointer",
                      color: "#1e293b",
                    }}
                  >
                    Credit or Debit Card
                  </label>
                </div>
                <BsCreditCard2Front
                  style={{ fontSize: "20px", color: "#64748b" }}
                />
              </div>

              {paymentMethod === "card" && (
                <div className="mt-3">
                  <div className="mb-3">
                    <Form.Label
                      className="text-dark fw-medium mb-1"
                      style={{ fontSize: "13px" }}
                    >
                      Card Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control-custom"
                      defaultValue="0000 0000 0000 0000"
                    />
                  </div>

                  <Row className="g-3">
                    <Col xs={6}>
                      <Form.Label
                        className="text-dark fw-medium mb-1"
                        style={{ fontSize: "13px" }}
                      >
                        Expiry Date
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control-custom"
                        defaultValue="MM/YY"
                      />
                    </Col>
                    <Col xs={6}>
                      <Form.Label
                        className="text-dark fw-medium mb-1"
                        style={{ fontSize: "13px" }}
                      >
                        CVC
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control-custom"
                        defaultValue="123"
                      />
                    </Col>
                  </Row>
                </div>
              )}
            </div>

            {/* PayPal Option */}
            <div
              className="p-3 border rounded-3"
              style={{
                borderColor: paymentMethod === "paypal" ? "#4338ca" : "#e2e8f0",
                borderWidth: paymentMethod === "paypal" ? "1.5px" : "1px",
                backgroundColor: "#ffffff",
              }}
              role="button"
              onClick={() => setPaymentMethod("paypal")}
            >
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    className="form-check-input m-0"
                    name="payment"
                    id="paypal-option"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                    style={{ accentColor: "#4338ca", cursor: "pointer" }}
                  />
                  <label
                    htmlFor="paypal-option"
                    className="fw-semibold mb-0"
                    style={{
                      fontSize: "14px",
                      cursor: "pointer",
                      color: "#1e293b",
                    }}
                  >
                    PayPal
                  </label>
                </div>
                <BsWallet2 style={{ fontSize: "18px", color: "#64748b" }} />
              </div>
            </div>
          </Card>

          {/* Place Order Button */}
          <div className="d-flex justify-content-center justify-content-lg-end mb-4">
            <Button
              type="button"
              variant={null}
              className="text-white px-5 py-3 fw-bold d-inline-flex align-items-center gap-2 shadow-sm border-0"
              style={{
                backgroundColor: "#4338ca",
                borderRadius: "8px",
                fontSize: "15px",
              }}
            >
              <span>Place Order</span>
              <BsArrowRight style={{ fontSize: "18px" }} />
            </Button>
          </div>
        </Col>

        {/* Right Column: Order Summary */}
        <Col xs={12} lg={5}>
          <Card
            className="p-4 border"
            style={{
              borderRadius: "16px",
              borderColor: "#e2e8f0",
              backgroundColor: "#DEE9FC",
            }}
          >
            <h5
              className="fw-bold mb-4"
              style={{ fontSize: "18px", color: "#0f172a" }}
            >
              Order Summary
            </h5>

            {/* Item 1 */}
            <div className="d-flex align-items-center gap-3 mb-3">
              <img
                src={IMAGES.headphones}
                alt="Pro Stream Headphones"
                className="rounded-3"
                style={{ width: "60px", height: "60px", objectFit: "cover" }}
              />
              <div className="flex-grow-1">
                <div className="fw-bold text-dark" style={{ fontSize: "14px" }}>
                  Pro Stream Headphones
                </div>
                <div className="text-muted" style={{ fontSize: "13px" }}>
                  Qty: 1
                </div>
                <div
                  className="fw-bold"
                  style={{ fontSize: "15px", color: "#4338ca" }}
                >
                  $249.00
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <img
                src={IMAGES.keyboard}
                alt="Tactile Series Keyboard"
                className="rounded-3"
                style={{ width: "60px", height: "60px", objectFit: "cover" }}
              />
              <div className="flex-grow-1">
                <div className="fw-bold text-dark" style={{ fontSize: "14px" }}>
                  Tactile Series Keyboard
                </div>
                <div className="text-muted" style={{ fontSize: "13px" }}>
                  Qty: 1
                </div>
                <div
                  className="fw-bold"
                  style={{ fontSize: "15px", color: "#4338ca" }}
                >
                  $129.00
                </div>
              </div>
            </div>

            <hr style={{ borderColor: "#cbd5e1", margin: "16px 0" }} />

            {/* Cost Breakdown */}
            <div
              className="d-flex justify-content-between mb-2"
              style={{ fontSize: "14px" }}
            >
              <span className="text-secondary">Subtotal</span>
              <span className="fw-semibold text-dark">$378.00</span>
            </div>

            <div
              className="d-flex justify-content-between mb-2"
              style={{ fontSize: "14px" }}
            >
              <span className="text-secondary">Shipping</span>
              <span className="fw-bold" style={{ color: "#059669" }}>
                FREE
              </span>
            </div>

            <div
              className="d-flex justify-content-between mb-3"
              style={{ fontSize: "14px" }}
            >
              <span className="text-secondary">Tax (Est.)</span>
              <span className="fw-semibold text-dark">$31.18</span>
            </div>

            <hr style={{ borderColor: "#cbd5e1", margin: "16px 0" }} />

            {/* Total */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <span className="fw-bold text-dark" style={{ fontSize: "18px" }}>
                Total
              </span>
              <span
                className="fw-bold"
                style={{ fontSize: "24px", color: "#4338ca" }}
              >
                $409.18
              </span>
            </div>

            {/* Promo Code Input */}
            <div className="d-flex gap-2 mb-4">
              <Form.Control
                type="text"
                className="form-control-custom bg-white"
                placeholder="Promo Code"
                style={{ borderRadius: "8px" }}
              />
              <Button
                type="button"
                variant={null}
                className="btn-purple-outline px-4"
                style={{ borderRadius: "8px", fontSize: "14px" }}
              >
                Apply
              </Button>
            </div>

            {/* Security Guarantee Box */}
            <div
              className="p-3 border rounded-3"
              style={{
                backgroundColor: "#ccfbf1",
                borderColor: "#99f6e4",
              }}
            >
              <div className="d-flex align-items-center gap-2 mb-2">
                <BsShieldCheck style={{ color: "#0f766e", fontSize: "18px" }} />
                <span
                  className="fw-semibold"
                  style={{ fontSize: "13px", color: "#0f766e" }}
                >
                  256-bit SSL Secure Payment
                </span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <BsArrowRepeat style={{ color: "#0f766e", fontSize: "18px" }} />
                <span
                  className="fw-semibold"
                  style={{ fontSize: "13px", color: "#0f766e" }}
                >
                  30-Day Money Back Guarantee
                </span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
