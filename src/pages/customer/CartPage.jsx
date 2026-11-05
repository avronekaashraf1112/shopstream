import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../../redux/cartSlice";
import { Link } from "react-router-dom";
import { IMAGES } from "../../assets/images";
import {
  BsTrash,
  BsArrowRight,
  BsTruck,
  BsBagCheck,
  BsCart2,
} from "react-icons/bs";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.88;
  const total = subtotal + tax;

  // Handle Empty Cart

  if (cartItems.length === 0) {
    return (
      <div className="bg-white">
        <Container as="section" fluid className="px-lg-5 px-3 py-5 text-center">
          <div className="mx-auto" style={{ maxWidth: "580px" }}>
            <div className="position-relative d-inline-block mb-4">
              <div
                className="position-absolute d-flex align-items-center justify-content-center text-white rounded-circle shadow-sm"
                style={{
                  top: "-8px",
                  left: "-8px",
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#10b981",
                  zIndex: 2,
                }}
              >
                <BsBagCheck style={{ fontSize: "15px" }} />
              </div>

              <div
                className="rounded-circle overflow-hidden shadow-sm"
                style={{
                  width: "180px",
                  height: "180px",
                  backgroundColor: "#dbeafe",
                  border: "4px solid #ffffff",
                }}
              >
                <img
                  src={IMAGES.cartEmptyIllustration}
                  alt="Empty Cart"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div
                className="position-absolute d-flex align-items-center justify-content-center text-white rounded-circle shadow-sm"
                style={{
                  bottom: "-8px",
                  right: "-8px",
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#4338ca",
                  zIndex: 2,
                }}
              >
                <BsCart2 style={{ fontSize: "15px" }} />
              </div>
            </div>

            <h2 className="fw-bold mb-2 text-dark" style={{ fontSize: "28px" }}>
              Your cart is feeling light
            </h2>
            <p
              className="text-muted mb-4"
              style={{ fontSize: "14px", lineHeight: 1.5 }}
            >
              It looks like you haven't added anything to your cart yet.
              <br />
              Let's find something special for you.
            </p>

            <div className="d-flex align-items-center justify-content-center gap-3">
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
                Start Shopping
              </Button>
              <Button
                type="button"
                variant="outline-light"
                className="border px-4 py-2 fw-semibold"
                style={{
                  borderColor: "#cbd5e1",
                  backgroundColor: "#ffffff",
                  color: "#4338ca",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              >
                View Saved Items
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-white py-4 py-lg-5">
      <Container fluid className="px-lg-5 px-3">
        {/* Title */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="fw-bold text-dark mb-0" style={{ fontSize: "28px" }}>
            Your Shopping Cart
          </h2>

          {/* Clear cart button  */}
          <Button
            type="button"
            variant="link"
            className="p-0 text-decoration-none d-flex align-items-center gap-1 border-0"
            style={{ color: "#dc2626", fontSize: "14px", fontWeight: 600 }}
            onClick={() => {
              if (
                window.confirm(
                  "Are you want to remove all items from your cart?",
                )
              ) {
                dispatch(clearCart());
              }
            }}
          >
            <BsTrash style={{ fontSize: "15px" }} />
            <span>Clear Cart</span>
          </Button>
        </div>

        <Row className="g-4">
          {/* Left Column: Cart Items List */}
          <Col xs={12} lg={8}>
            <div className="d-flex flex-column gap-3">
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="p-3 border bg-white shadow-sm"
                  style={{ borderRadius: "16px", borderColor: "#e2e8f0" }}
                >
                  <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="rounded-3 flex-shrink-0"
                        style={{
                          width: "90px",
                          height: "90px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <h5
                          className="fw-bold text-dark mb-1"
                          style={{ fontSize: "18px" }}
                        >
                          {item.title}
                        </h5>
                        <p
                          className="text-muted small mb-3"
                          style={{ fontSize: "13px" }}
                        >
                          {item.category}
                        </p>

                        {/* Quantity Counter */}
                        <div
                          className="d-inline-flex align-items-center border rounded-pill px-2 py-1"
                          style={{ borderColor: "#cbd5e1", height: "36px" }}
                        >
                          <Button
                            type="button"
                            variant="link"
                            className="text-muted p-0 border-0 px-2"
                            onClick={() => dispatch(decreaseQty(item.id))}
                            style={{
                              textDecoration: "none",
                              fontSize: "16px",
                              lineHeight: 1,
                            }}
                          >
                            &minus;
                          </Button>
                          <span
                            className="px-2 fw-bold text-dark small"
                            style={{ fontSize: "14px" }}
                          >
                            {item.quantity}
                          </span>
                          <Button
                            type="button"
                            variant="link"
                            className="text-muted p-0 border-0 px-2"
                            onClick={() => dispatch(increaseQty(item.id))}
                            style={{
                              textDecoration: "none",
                              fontSize: "16px",
                              lineHeight: 1,
                            }}
                          >
                            &#43;
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Price and Remove */}
                    <div className="d-flex flex-sm-column align-items-center align-items-sm-end justify-content-between pt-2 pt-sm-0">
                      <div
                        className="fw-bold mb-sm-3"
                        style={{ fontSize: "20px", color: "#3730a3" }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>

                      <Button
                        type="button"
                        variant="link"
                        className="p-0 text-decoration-none d-flex align-items-center gap-1 border-0"
                        style={{
                          color: "#dc2626",
                          fontSize: "13px",
                          fontWeight: 600,
                        }}
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <BsTrash style={{ fontSize: "15px" }} />
                        <span>Remove</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Col>

          {/* Right Column: Order Summary */}
          <Col xs={12} lg={4}>
            <Card
              className="p-4 border shadow-sm"
              style={{
                borderRadius: "20px",
                borderColor: "#e2e8f0",
                backgroundColor: "#f8fafc",
              }}
            >
              <h5
                className="fw-bold text-dark mb-4"
                style={{ fontSize: "20px" }}
              >
                Order Summary
              </h5>

              <div className="d-flex justify-content-between mb-3 small">
                <span className="text-secondary">Subtotal</span>
                <span className="fw-bold text-dark">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-3 small">
                <span className="text-secondary">Shipping</span>
                <span className="fw-bold" style={{ color: "#059669" }}>
                  Free
                </span>
              </div>

              <div className="d-flex justify-content-between mb-3 small">
                <span className="text-secondary">Estimated Tax</span>
                <span className="fw-bold text-dark">${tax.toFixed(2)}</span>
              </div>

              <hr style={{ borderColor: "#cbd5e1", margin: "16px 0" }} />

              <div className="d-flex justify-content-between align-items-center mb-4">
                <span
                  className="fw-bold text-dark"
                  style={{ fontSize: "18px" }}
                >
                  Total
                </span>
                <span
                  className="fw-bold"
                  style={{ fontSize: "24px", color: "#4338ca" }}
                >
                  ${total.toFixed(2)}
                </span>
              </div>

              <Button
                to="/checkout"
                as={Link}
                variant={null}
                className="text-white w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 border-0 mb-3 shadow-sm"
                style={{
                  backgroundColor: "#4338ca",
                  borderRadius: "10px",
                  fontSize: "15px",
                }}
              >
                <span>Proceed to Checkout</span>
                <BsArrowRight style={{ fontSize: "18px" }} />
              </Button>

              <p
                className="text-muted text-center small mb-4"
                style={{ fontSize: "12px", lineHeight: 1.4 }}
              >
                By proceeding to checkout, you agree to ShopStream's terms and
                privacy policy.
              </p>

              {/* Delivery Banner */}
              <div
                className="p-3 border rounded-3 d-flex align-items-center gap-3"
                style={{
                  backgroundColor: "#eff6ff",
                  borderColor: "#bfdbfe",
                }}
              >
                <BsTruck
                  style={{ color: "#2563eb", fontSize: "24px", flexShrink: 0 }}
                />
                <div>
                  <div
                    className="fw-bold"
                    style={{ fontSize: "13px", color: "#1e3a8a" }}
                  >
                    Free Express Delivery
                  </div>
                  <div
                    className="text-secondary small"
                    style={{ fontSize: "12px" }}
                  >
                    Arrives by Oct 24 - 26
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartPage;
