import { Link } from "react-router-dom";
import { IMAGES } from "../../assets/images";
import { getProducts } from "../../services/products";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import { addToCart } from "../../redux/cartSlice";
import {
  BsArrowRight,
  BsChevronLeft,
  BsChevronRight,
  BsCartPlus,
  BsGlobe,
  BsChatDots,
  BsSliders,
} from "react-icons/bs";

const VISIBLE_PRODUCTS = 4; // How many featured products are shown at once

const SOCIAL_ICONS = [BsGlobe, BsChatDots, BsSliders];
const SHOP_LINKS = [
  "All Electronics",
  "Wearables",
  "Home Office",
  "New Arrivals",
];
const SUPPORT_LINKS = ["Contact Us", "Shipping Info", "Returns", "FAQ"];

const sectionTitleStyle = { fontSize: "24px", color: "#0f172a" };
const footerHeadingStyle = { fontSize: "12px", letterSpacing: "0.8px" };

const HomePage = () => {
  const dispatch = useDispatch(); // To send the action to the redux

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(0); // First visible product in the featured slider
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchProducts = async function () {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        toast.error("Failed to load featured products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const maxStart = Math.max(products.length - VISIBLE_PRODUCTS, 0);
  const visibleProducts = products.slice(start, start + VISIBLE_PRODUCTS); // To show only four products not all

  const handleSubscribe = (event) => {
    event.preventDefault();
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <Container as="section" fluid className="px-lg-5 px-3 py-4 py-lg-5">
        <Row
          className="align-items-center g-4 p-4 p-lg-5 rounded-4"
          style={{
            background: "linear-gradient(135deg, #f8faff 0%, #edf2fe 100%)",
            border: "1px solid #e2e8f0",
          }}
        >
          <Col xs={12} lg={6}>
            <div className="mb-3">
              <span
                className="badge text-white px-3 py-2 fw-bold"
                style={{
                  backgroundColor: "#10b981",
                  borderRadius: "20px",
                  fontSize: "11px",
                  letterSpacing: "0.8px",
                }}
              >
                NEW SEASON ARRIVAL
              </span>
            </div>

            <h1
              className="fw-bold mb-3"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                lineHeight: 1.15,
                color: "#0f172a",
              }}
            >
              Experience the Future of{" "}
              <span style={{ color: "#4338ca" }}>Innovation.</span>
            </h1>

            <p
              className="text-muted mb-4 pe-lg-4"
              style={{ fontSize: "15px", lineHeight: 1.6 }}
            >
              Explore our curated selection of premium electronics designed to
              elevate your daily stream of life. Precision engineering meets
              minimalist design.
            </p>

            <div className="d-flex flex-wrap align-items-center gap-3">
              <Button
                as={Link}
                to="/products"
                className="px-4 py-2 fw-semibold border-0"
                style={{
                  "--bs-btn-bg": "#4338ca",
                  "--bs-btn-hover-bg": "#3730a3",
                  "--bs-btn-active-bg": "#3730a3",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              >
                Shop Now
              </Button>
              <Button
                as={Link}
                to="/products"
                variant="light"
                className="px-4 py-2 fw-semibold"
                style={{
                  "--bs-btn-bg": "#ffffff",
                  "--bs-btn-color": "#4338ca",
                  "--bs-btn-border-color": "#cbd5e1",
                  "--bs-btn-hover-bg": "#f8fafc",
                  "--bs-btn-hover-color": "#4338ca",
                  "--bs-btn-hover-border-color": "#cbd5e1",
                  "--bs-btn-active-bg": "#f1f5f9",
                  "--bs-btn-active-color": "#4338ca",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              >
                View Collections
              </Button>
            </div>
          </Col>

          <Col xs={12} lg={6} className="text-center">
            <div
              className="position-relative overflow-hidden rounded-4 shadow-sm"
              style={{
                backgroundColor: "#1e293b",
                aspectRatio: "16/10",
                maxHeight: "380px",
              }}
            >
              <img
                src={IMAGES.heroHeadphones}
                alt="Headphones"
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Col>
        </Row>
      </Container>

      {/* 2. Top Categories Section */}
      <Container as="section" fluid className="px-lg-5 px-3 py-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h3 className="fw-bold mb-1" style={sectionTitleStyle}>
              Top Categories
            </h3>
            <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
              Curated gear for every lifestyle.
            </p>
          </div>

          <Link
            to="/products"
            className="d-flex align-items-center gap-1 text-decoration-none fw-semibold"
            style={{ color: "#4338ca", fontSize: "14px" }}
          >
            <span>See All</span>
            <BsArrowRight />
          </Link>
        </div>

        {/* Bento Grid */}
        <Row className="g-3">
          {/* Large Left Card: Computing */}
          <Col xs={12} lg={6}>
            <div
              className="position-relative rounded-4 overflow-hidden h-100 shadow-sm"
              style={{ minHeight: "360px", backgroundColor: "#0f172a" }}
            >
              <img
                src={IMAGES.computingLaptop}
                alt="Computing"
                className="w-100 h-100 position-absolute top-0 start-0"
                style={{ objectFit: "cover" }}
              />
              <div
                className="position-absolute bottom-0 start-0 w-100 p-4 text-white"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
                }}
              >
                <h4 className="fw-bold mb-1" style={{ fontSize: "20px" }}>
                  Computing
                </h4>
                <p className="mb-0 text-light opacity-75 small">
                  Work and play without limits.
                </p>
              </div>
            </div>
          </Col>

          {/* Right Column: 3 Cards */}
          <Col xs={12} lg={6}>
            <Row className="g-3">
              {[
                { name: "Wearables", image: IMAGES.wearableWatch, width: 6 },
                { name: "Audio", image: IMAGES.audioSpeaker, width: 6 },
                { name: "Home Theater", image: IMAGES.homeTheater, width: 12 },
              ].map((category) => (
                <Col key={category.name} xs={12} sm={category.width}>
                  <div
                    className="position-relative rounded-4 overflow-hidden shadow-sm"
                    style={{ height: "172px", backgroundColor: "#0f172a" }}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-100 h-100 position-absolute top-0 start-0"
                      style={{ objectFit: "cover" }}
                    />
                    <div
                      className="position-absolute bottom-0 start-0 w-100 p-3 text-white"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
                      }}
                    >
                      <span className="fw-bold" style={{ fontSize: "15px" }}>
                        {category.name}
                      </span>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* 3. Featured Products Section */}
      <Container as="section" fluid className="px-lg-5 px-3 py-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h3 className="fw-bold mb-1" style={sectionTitleStyle}>
              Featured Products
            </h3>
            <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
              The latest and greatest collection.
            </p>
          </div>

          {/* Slider arrows: move the visible products one step */}
          <div className="d-flex align-items-center gap-2">
            {[
              {
                label: "Previous products",
                icon: <BsChevronLeft style={{ fontSize: "11px" }} />,
                disabled: start === 0,
                onClick: () => setStart(start - 1),
              },
              {
                label: "Next products",
                icon: <BsChevronRight style={{ fontSize: "11px" }} />,
                disabled: start >= maxStart,
                onClick: () => setStart(start + 1),
              },
            ].map((arrow) => (
              <Button
                key={arrow.label}
                type="button"
                variant="light"
                aria-label={arrow.label}
                disabled={arrow.disabled}
                onClick={arrow.onClick}
                className="d-flex align-items-center justify-content-center p-0"
                style={{
                  "--bs-btn-bg": "#ffffff",
                  "--bs-btn-color": "#6c757d",
                  "--bs-btn-border-color": "#dee2e6",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                }}
              >
                {arrow.icon}
              </Button>
            ))}
          </div>
        </div>

        {/* 4 Cards Grid */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row className="g-4">
            {visibleProducts.map((prod) => (
              <Col key={prod.id} xs={12} sm={6} lg={3}>
                <Card
                  className="h-100 bg-white p-3 shadow-sm"
                  style={{ borderRadius: "16px", borderColor: "#e2e8f0" }}
                >
                  <div
                    className="position-relative overflow-hidden rounded-3 mb-3"
                    style={{
                      backgroundColor: "#0f172a",
                      paddingTop: "90%",
                    }}
                  >
                    <Link to={`/products/${prod.id}`}>
                      <img
                        src={prod.thumbnail}
                        alt={prod.title}
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                  </div>

                  <div className="d-flex flex-column flex-grow-1">
                    <div
                      className="fw-bold mb-1 text-uppercase"
                      style={{
                        color: "#4338ca",
                        fontSize: "11px",
                        letterSpacing: "0.6px",
                      }}
                    >
                      {prod.category}
                    </div>
                    <Link
                      to={`/products/${prod.id}`}
                      className="text-decoration-none"
                    >
                      <h6
                        className="fw-bold text-dark text-truncate mb-3"
                        style={{ fontSize: "15px" }}
                        title={prod.title}
                      >
                        {prod.title}
                      </h6>
                    </Link>

                    <div className="mt-auto d-flex align-items-center justify-content-between">
                      <span
                        className="fw-bold"
                        style={{ fontSize: "16px", color: "#0f172a" }}
                      >
                        ${prod.price.toFixed(2)}
                      </span>

                      <Button
                        type="button"
                        variant="light"
                        aria-label={`Add ${prod.title} to cart`}
                        onClick={() => dispatch(addToCart(prod))}
                        className="d-flex align-items-center justify-content-center p-0"
                        style={{
                          "--bs-btn-bg": "#f8fafc",
                          "--bs-btn-color": "#4338ca",
                          "--bs-btn-border-color": "#e2e8f0",
                          "--bs-btn-hover-bg": "#e0e7ff",
                          "--bs-btn-hover-color": "#4338ca",
                          "--bs-btn-hover-border-color": "#c7d2fe",
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                        }}
                      >
                        <BsCartPlus style={{ fontSize: "16px" }} />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* 4. Newsletter Banner */}
      <Container as="section" fluid className="px-lg-5 px-3 py-4 py-lg-5">
        <div
          className="p-4 p-lg-5 rounded-4 text-white position-relative overflow-hidden"
          style={{
            backgroundColor: "#3730a3",
            background:
              "radial-gradient(circle at 90% 50%, #4f46e5 0%, #3730a3 70%)",
          }}
        >
          {/* Radial decorative arc rings */}
          <div
            className="position-absolute d-none d-lg-block"
            style={{
              right: "-50px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "420px",
              height: "420px",
              borderRadius: "50%",
              border: "18px dashed rgba(255, 255, 255, 0.12)",
              pointerEvents: "none",
            }}
          />

          <div
            className="position-relative"
            style={{ maxWidth: "640px", zIndex: 1 }}
          >
            <h2
              className="fw-bold mb-2"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Stay Ahead of the Stream
            </h2>
            <p
              className="text-light opacity-90 mb-4"
              style={{ fontSize: "14px", lineHeight: 1.6 }}
            >
              Join our inner circle for exclusive early access to product
              launches, seasonal deals, and curated tech trends. No spam, just
              high-quality updates.
            </p>

            <Form
              onSubmit={handleSubscribe}
              className="d-flex flex-column flex-sm-row gap-2"
              style={{ maxWidth: "480px" }}
            >
              <Form.Control
                type="email"
                required
                placeholder="Enter your email"
                aria-label="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="text-white border-0 px-3 py-2 flex-grow-1"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              />
              <Button
                type="submit"
                className="fw-bold px-4 py-2 border-0"
                style={{
                  "--bs-btn-bg": "#059669",
                  "--bs-btn-hover-bg": "#047857",
                  "--bs-btn-active-bg": "#047857",
                  borderRadius: "8px",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                Join Now
              </Button>
            </Form>
          </div>
        </div>
      </Container>

      {/* 5. Extended Customer Footer */}
      <footer
        className="py-5 border-top"
        style={{
          backgroundColor: "#e6effd",
          borderColor: "#cbd5e1",
          color: "#475569",
        }}
      >
        <Container fluid className="px-lg-5 px-3">
          <Row className="g-4 mb-5">
            {/* Brand & mission */}
            <Col xs={12} lg={5}>
              <h4 className="fw-bold mb-2" style={{ color: "#4338ca" }}>
                ShopStream
              </h4>
              <p
                className="text-muted small mb-4"
                style={{ maxWidth: "340px", lineHeight: 1.6 }}
              >
                A premium e-commerce experience dedicated to delivering the
                world's most innovative electronics right to your doorstep.
              </p>
              <div className="d-flex align-items-center gap-2">
                {SOCIAL_ICONS.map((Icon, index) => (
                  <span
                    key={index}
                    role="button"
                    className="rounded-circle border d-flex align-items-center justify-content-center text-secondary"
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "#ffffff",
                      borderColor: "#cbd5e1",
                    }}
                  >
                    <Icon style={{ fontSize: "14px" }} />
                  </span>
                ))}
              </div>
            </Col>

            {/* Shop Links */}
            <Col xs={6} sm={4} lg={2}>
              <h6 className="fw-bold text-dark mb-3" style={footerHeadingStyle}>
                SHOP
              </h6>
              <ul className="list-unstyled d-flex flex-column gap-2 small mb-0">
                {SHOP_LINKS.map((label) => (
                  <li key={label}>
                    <Link
                      to="/products"
                      className="text-decoration-none text-muted"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>

            {/* Support Links */}
            <Col xs={6} sm={4} lg={2}>
              <h6 className="fw-bold text-dark mb-3" style={footerHeadingStyle}>
                SUPPORT
              </h6>
              <ul className="list-unstyled d-flex flex-column gap-2 small mb-0">
                {SUPPORT_LINKS.map((label) => (
                  <li key={label}>
                    <span className="text-muted" style={{ cursor: "pointer" }}>
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;
