import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../../redux/productSlice";
import { IMAGES } from "../../assets/images";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Breadcrumb,
  Nav,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  BsStarFill,
  BsHeart,
  BsBagPlus,
  BsShieldCheck,
  BsTruck,
  BsArrowRepeat,
  BsHeadset,
  BsCartPlus,
  BsArrowRight,
} from "react-icons/bs";

const TABS = [
  { key: "specifications", label: "specifications" },
  { key: "user reviews", label: "user reviews" },
  { key: "q&a", label: "Q&A" },
  { key: "downloads", label: "downloads" },
];

const COLORS = [
  { name: "Midnight Indigo", value: "#4338ca" },
  { name: "Dark Charcoal", value: "#334155" },
  { name: "Silver", value: "#f8fafc" },
];

const VALUE_PROPS = [
  { icon: BsShieldCheck, label: "2 Year Warranty" },
  { icon: BsTruck, label: "Fast 2-Day Delivery" },
  { icon: BsArrowRepeat, label: "30-Day Returns" },
  { icon: BsHeadset, label: "Lifetime Support" },
];

const AUDIO_SPECS = [
  ["Driver Diameter", "50mm Neodymium"],
  ["Freq. Response", "5Hz - 40kHz"],
  ["Impedance", "32 Ohms"],
  ["Sensitivity", "102 dB/mW"],
];

const PHYSICAL_SPECS = [
  ["Weight", "285g (9.8 oz)"],
  ["Cable Type", "Detachable Coiled"],
  ["Earcup Material", "Memory Foam"],
  ["Folding", "Flat-fold design"],
];

const BOX_ITEMS = ["Hard Case", "3.5mm Cable", "6.3mm Adapter", "Extra Pads"];

const specCardStyle = {
  borderRadius: "16px",
  borderColor: "#e2e8f0",
  backgroundColor: "#f8fafc",
};

const ProductDetailsPage = () => {
  // Find the product by id from the API using useParams
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    selectedProduct: product,
    loading,
    error,
  } = useSelector((state) => state.products);

  const [selectedImage, setSelectedImage] = useState("");

  const [selectedColor, setSelectedColor] = useState("Midnight Indigo");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specifications");

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0] || product.thumbnail);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <div className="text-muted mt-2">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center mb-0">
          {error || "Product not found!"}
        </Alert>
      </Container>
    );
  }

  const thumbnails = product.images;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        category: product.category,
        stock: product.stock,
        quantity: quantity,
      }),
    );
  };

  // Add the product to the cart, then go to the cart page
  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const crossSellProducts = [
    {
      id: 1,
      title: "AudioMaster Interface Pro",
      price: "$189.00",
      badge: "PRO CHOICE",
      image: IMAGES.audioInterface,
    },
    {
      id: 2,
      title: "VocalStream Condenser Mic",
      price: "$149.00",
      badge: null,
      image: IMAGES.condenserMic,
    },
    {
      id: 3,
      title: "Walnut Headphone Throne",
      price: "$59.00",
      badge: null,
      image: IMAGES.headphoneThrone,
    },
    {
      id: 4,
      title: "Pro-Link Braided Audio Cable",
      price: "$35.00",
      badge: null,
      image: IMAGES.braidedCable,
    },
  ];

  return (
    <div className="bg-white">
      <Container fluid className="px-lg-5 px-3 py-4">
        {/* Breadcrumbs */}
        <Breadcrumb
          className="mb-4"
          listProps={{ className: "mb-0" }}
          style={{ fontSize: "13px" }}
        >
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{
              to: "/",
              className: "text-decoration-none text-muted",
            }}
          >
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{
              to: "/products",
              className: "text-decoration-none text-muted text-capitalize",
            }}
          >
            {product.category}
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="text-dark fw-semibold">
            {product.title}
          </Breadcrumb.Item>
        </Breadcrumb>

        {/* Top Product Section */}
        <Row className="g-4 g-lg-5 mb-5">
          {/* Left Column: Gallery */}
          <Col xs={12} lg={7}>
            <Row className="g-3">
              {/* Thumbnails */}
              <Col xs={2} className="d-flex flex-column gap-2">
                {thumbnails.map((thumb, idx) => (
                  <div
                    key={idx}
                    role="button"
                    className="rounded-3 overflow-hidden"
                    style={{
                      border:
                        selectedImage === thumb
                          ? "2px solid #4338ca"
                          : "1px solid #cbd5e1",
                      aspectRatio: "1/1",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedImage(thumb)}
                  >
                    <img
                      src={thumb}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </Col>

              {/* Main Image */}
              <Col xs={10}>
                <div
                  className="position-relative rounded-4 overflow-hidden shadow-sm"
                  style={{
                    backgroundColor: "#e2e8f0",
                    aspectRatio: "1/1",
                    maxHeight: "520px",
                  }}
                >
                  <img
                    src={selectedImage}
                    alt={product.title}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />

                  {/* Wishlist Button */}
                  <Button
                    type="button"
                    variant="light"
                    aria-label="Add to wishlist"
                    className="position-absolute top-0 end-0 m-3 rounded-circle d-flex align-items-center justify-content-center shadow-sm p-0"
                    style={{
                      "--bs-btn-bg": "#ffffff",
                      "--bs-btn-color": "#64748b",
                      "--bs-btn-border-color": "#e2e8f0",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <BsHeart style={{ fontSize: "18px" }} />
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>

          {/* Right Column: Product Info & Actions */}
          <Col xs={12} lg={5}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span
                className="badge text-white px-2 py-1 fw-bold"
                style={{
                  backgroundColor: "#10b981",
                  borderRadius: "4px",
                  fontSize: "10px",
                }}
              >
                New Arrival
              </span>
              <span className="text-muted small" style={{ fontSize: "12px" }}>
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="fw-bold text-dark mb-2" style={{ fontSize: "28px" }}>
              {product.title}
            </h1>

            {/* Rating */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="d-flex align-items-center">
                {[1, 2, 3, 4, 5].map((s) => (
                  <BsStarFill
                    key={s}
                    style={{
                      fontSize: "13px",
                      marginRight: "2px",
                      color: "#10b981",
                    }}
                  />
                ))}
              </div>
              <span className="fw-bold text-dark small">{product.rating}</span>
              <span
                className="text-muted small"
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                {product.reviews.length} Reviews
              </span>
            </div>

            {/* Price */}
            <div className="d-flex align-items-baseline gap-2 mb-1">
              <span className="fw-bold text-dark" style={{ fontSize: "32px" }}>
                ${product.price.toFixed(2)}
              </span>
              <span
                className="text-decoration-line-through text-muted"
                style={{ fontSize: "16px" }}
              >
                $
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
              <span
                className="fw-bold"
                style={{ color: "#059669", fontSize: "14px" }}
              >
                ({Math.round(product.discountPercentage)} % OFF )
              </span>
            </div>
            <p className="text-muted small mb-3" style={{ fontSize: "12px" }}>
              Shipping calculated at checkout. Free shipping on orders over
              $500.
            </p>

            {/* Description */}
            <p
              className="text-secondary small mb-4"
              style={{ lineHeight: 1.6, fontSize: "13.5px" }}
            >
              {product.description}
            </p>

            <hr style={{ borderColor: "#e2e8f0", margin: "16px 0" }} />

            {/* Color Swatch */}
            <div className="mb-4">
              <div
                className="fw-bold text-dark small mb-2"
                style={{ fontSize: "13px" }}
              >
                Select Color:{" "}
                <span className="fw-normal text-muted">{selectedColor}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                {COLORS.map((color) => (
                  <span
                    key={color.name}
                    role="button"
                    title={color.name}
                    className={`rounded-circle d-inline-block ${
                      color.name === "Silver" ? "border" : ""
                    }`}
                    style={{
                      width: "26px",
                      height: "26px",
                      backgroundColor: color.value,
                      boxShadow:
                        selectedColor === color.name
                          ? "0 0 0 2px #fff, 0 0 0 4px #4338ca"
                          : "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedColor(color.name)}
                  />
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                className="d-flex align-items-center border rounded-3 px-2 py-1"
                style={{ borderColor: "#cbd5e1", height: "44px" }}
              >
                <Button
                  type="button"
                  variant="link"
                  aria-label="Decrease quantity"
                  className="text-muted p-0 border-0"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ textDecoration: "none", fontSize: "16px" }}
                >
                  -
                </Button>
                <span
                  className="px-3 fw-bold text-dark"
                  style={{ fontSize: "14px" }}
                >
                  {quantity}
                </span>
                <Button
                  type="button"
                  variant="link"
                  aria-label="Increase quantity"
                  className="text-muted p-0 border-0"
                  onClick={
                    () => setQuantity(Math.min(product.stock, quantity + 1)) // Math.min => to ensure that quantity does not exceed stock ..
                  }
                  style={{ textDecoration: "none", fontSize: "16px" }}
                >
                  +
                </Button>
              </div>

              <Button
                type="button"
                onClick={handleAddToCart}
                className="fw-bold d-flex align-items-center justify-content-center gap-2 flex-grow-1 border-0"
                style={{
                  "--bs-btn-bg": "#4338ca",
                  "--bs-btn-hover-bg": "#3730a3",
                  "--bs-btn-active-bg": "#3730a3",
                  borderRadius: "8px",
                  height: "44px",
                  fontSize: "14px",
                }}
              >
                <BsBagPlus style={{ fontSize: "16px" }} />
                <span>Add to Cart</span>
              </Button>
            </div>

            {/* Buy Now Button */}
            <Button
              type="button"
              onClick={handleBuyNow}
              className="fw-bold w-100 mb-4 border-0"
              style={{
                "--bs-btn-bg": "#059669",
                "--bs-btn-hover-bg": "#047857",
                "--bs-btn-active-bg": "#047857",
                borderRadius: "8px",
                height: "44px",
                fontSize: "14px",
              }}
            >
              Buy Now
            </Button>

            {/* 4 Value Props Grid */}
            <Row
              className="g-2 pt-2 text-secondary"
              style={{ fontSize: "12px" }}
            >
              {VALUE_PROPS.map(({ icon: Icon, label }) => (
                <Col
                  key={label}
                  xs={6}
                  className="d-flex align-items-center gap-2"
                >
                  <Icon style={{ color: "#059669", fontSize: "15px" }} />
                  <span>{label}</span>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Tab Navigation */}
        <Nav
          activeKey={activeTab}
          onSelect={(key) => setActiveTab(key)}
          className="border-bottom mb-4 gap-4"
          style={{ borderColor: "#e2e8f0" }}
        >
          {TABS.map((tab) => (
            <Nav.Item key={tab.key}>
              <Nav.Link
                eventKey={tab.key}
                className="px-0 py-2 text-capitalize fw-semibold"
                style={{
                  color: activeTab === tab.key ? "#4338ca" : "#64748b",
                  fontSize: "14px",
                  borderBottom:
                    activeTab === tab.key ? "2px solid #4338ca" : "none",
                }}
              >
                {tab.label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        {/* Tab Cards: Audio Specs, Physical, In the Box */}
        <Row className="g-4 mb-5">
          {/* Audio Specs and Physical Specs */}
          {[
            { title: "Audio Specs", specs: AUDIO_SPECS },
            { title: "Physical", specs: PHYSICAL_SPECS },
          ].map((group) => (
            <Col key={group.title} xs={12} md={4}>
              <Card className="p-4 h-100 shadow-sm" style={specCardStyle}>
                <h5
                  className="fw-bold text-dark mb-4"
                  style={{ fontSize: "16px" }}
                >
                  {group.title}
                </h5>
                <div className="d-flex flex-column gap-3 small">
                  {group.specs.map(([label, value]) => (
                    <div key={label} className="d-flex justify-content-between">
                      <span className="text-secondary">{label}</span>
                      <span className="fw-semibold text-dark">{value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          ))}

          {/* In the Box */}
          <Col xs={12} md={4}>
            <Card className="p-4 h-100 shadow-sm" style={specCardStyle}>
              <h5
                className="fw-bold text-dark mb-2"
                style={{ fontSize: "16px" }}
              >
                In the Box
              </h5>
              <p className="text-muted small mb-3" style={{ fontSize: "12px" }}>
                Everything you need to start your professional audio journey
                immediately.
              </p>

              <div className="d-flex flex-wrap gap-2 mb-3">
                {BOX_ITEMS.map((item) => (
                  <span
                    key={item}
                    className="badge border text-dark fw-normal px-2 py-1"
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: "#cbd5e1",
                      fontSize: "11px",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="text-center mt-auto pt-2">
                <img
                  src={IMAGES.inTheBoxSet}
                  alt="In the box contents"
                  className="rounded-3 shadow-sm"
                  style={{ width: "100px", height: "80px", objectFit: "cover" }}
                />
              </div>
            </Card>
          </Col>
        </Row>

        {/* Complete Your Setup Section */}
        <section className="mb-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h4
                className="fw-bold text-dark mb-1"
                style={{ fontSize: "20px" }}
              >
                Complete Your Setup
              </h4>
              <p className="text-muted small mb-0" style={{ fontSize: "13px" }}>
                Recommended products based on your interest.
              </p>
            </div>

            <Link
              to="/products"
              className="d-flex align-items-center gap-1 text-decoration-none fw-semibold"
              style={{ color: "#4338ca", fontSize: "13px" }}
            >
              <span>View All</span>
              <BsArrowRight />
            </Link>
          </div>

          <Row className="g-4">
            {crossSellProducts.map((p) => (
              <Col key={p.id} xs={12} sm={6} lg={3}>
                <Card
                  className="h-100 bg-white p-3 shadow-sm"
                  style={{ borderRadius: "16px", borderColor: "#e2e8f0" }}
                >
                  <div
                    className="position-relative overflow-hidden rounded-3 mb-3"
                    style={{ backgroundColor: "#0f172a", paddingTop: "85%" }}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                    {p.badge && (
                      <span
                        className="position-absolute px-2 py-1 text-white fw-bold"
                        style={{
                          top: "10px",
                          left: "10px",
                          backgroundColor: "#059669",
                          borderRadius: "4px",
                          fontSize: "10px",
                        }}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <h6
                    className="fw-bold text-dark text-truncate mb-2"
                    style={{ fontSize: "14px" }}
                    title={p.title}
                  >
                    {p.title}
                  </h6>

                  <div className="mt-auto d-flex align-items-center justify-content-between">
                    <span
                      className="fw-bold"
                      style={{ fontSize: "15px", color: "#047857" }}
                    >
                      {p.price}
                    </span>
                    <Button
                      type="button"
                      variant="light"
                      aria-label={`Add ${p.title} to cart`}
                      className="d-flex align-items-center justify-content-center p-0"
                      style={{
                        "--bs-btn-bg": "#e0e7ff",
                        "--bs-btn-color": "#4338ca",
                        "--bs-btn-border-color": "#c7d2fe",
                        "--bs-btn-hover-bg": "#c7d2fe",
                        "--bs-btn-hover-color": "#4338ca",
                        width: "34px",
                        height: "34px",
                        borderRadius: "8px",
                      }}
                    >
                      <BsCartPlus style={{ fontSize: "16px" }} />
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default ProductDetailsPage;
