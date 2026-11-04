import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProductById } from "../../redux/productSlice";
import { IMAGES } from "../../assets/images";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
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

const ProductDetailsPage = () => {
  // Find the product by id from the API using useParams
  const { id } = useParams();
  const dispatch = useDispatch();
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
    return <div className="text-center py-5">Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div className="text-center py-5 text-danger">
        {error || "Product not found!"}
      </div>
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
      <div className="container-fluid px-lg-5 px-3 py-4">
        {/* Breadcrumbs */}
        <nav className="mb-4" style={{ fontSize: "13px" }}>
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-muted">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link
                to="/products"
                className="text-decoration-none text-muted text-capitalize"
              >
                {product.category}
              </Link>
            </li>
            <li
              className="breadcrumb-item active text-dark fw-semibold"
              aria-current="page"
            >
              {product.title}
            </li>
          </ol>
        </nav>

        {/* Top Product Section */}
        <div className="row g-4 g-lg-5 mb-5">
          {/* Left Column: Gallery */}
          <div className="col-12 col-lg-7">
            <div className="row g-3">
              {/* Thumbnails */}
              <div className="col-2 d-flex flex-column gap-2">
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
              </div>

              {/* Main Image */}
              <div className="col-10">
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
                  <button
                    type="button"
                    className="btn btn-white position-absolute top-0 end-0 m-3 rounded-circle d-flex align-items-center justify-content-center shadow-sm p-0"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      color: "#64748b",
                    }}
                  >
                    <BsHeart style={{ fontSize: "18px" }} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="col-12 col-lg-5">
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
              <div
                className="d-flex align-items-center text-success"
                style={{ color: "#10b981" }}
              >
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
                <span
                  role="button"
                  className="rounded-circle d-inline-block"
                  style={{
                    width: "26px",
                    height: "26px",
                    backgroundColor: "#4338ca",
                    boxShadow:
                      selectedColor === "Midnight Indigo"
                        ? "0 0 0 2px #fff, 0 0 0 4px #4338ca"
                        : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedColor("Midnight Indigo")}
                />
                <span
                  role="button"
                  className="rounded-circle d-inline-block"
                  style={{
                    width: "26px",
                    height: "26px",
                    backgroundColor: "#334155",
                    boxShadow:
                      selectedColor === "Dark Charcoal"
                        ? "0 0 0 2px #fff, 0 0 0 4px #4338ca"
                        : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedColor("Dark Charcoal")}
                />
                <span
                  role="button"
                  className="rounded-circle d-inline-block border"
                  style={{
                    width: "26px",
                    height: "26px",
                    backgroundColor: "#f8fafc",
                    boxShadow:
                      selectedColor === "Silver"
                        ? "0 0 0 2px #fff, 0 0 0 4px #4338ca"
                        : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedColor("Silver")}
                />
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                className="d-flex align-items-center border rounded-3 px-2 py-1"
                style={{ borderColor: "#cbd5e1", height: "44px" }}
              >
                <button
                  type="button"
                  className="btn btn-link text-muted p-0 border-0"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ textDecoration: "none", fontSize: "16px" }}
                >
                  -
                </button>
                <span
                  className="px-3 fw-bold text-dark"
                  style={{ fontSize: "14px" }}
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  className="btn btn-link text-muted p-0 border-0"
                  onClick={
                    () => setQuantity(Math.min(product.stock, quantity + 1)) // Math.min => to ensure that quantity does not exceed stock ..
                  }
                  style={{ textDecoration: "none", fontSize: "16px" }}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="btn text-white fw-bold d-flex align-items-center justify-content-center gap-2 flex-grow-1 border-0"
                style={{
                  backgroundColor: "#4338ca",
                  borderRadius: "8px",
                  height: "44px",
                  fontSize: "14px",
                }}
              >
                <BsBagPlus style={{ fontSize: "16px" }} />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              type="button"
              className="btn text-white fw-bold w-100 mb-4 border-0"
              style={{
                backgroundColor: "#059669",
                borderRadius: "8px",
                height: "44px",
                fontSize: "14px",
              }}
            >
              Buy Now
            </button>

            {/* 4 Value Props Grid */}
            <div
              className="row g-2 pt-2 text-secondary"
              style={{ fontSize: "12px" }}
            >
              <div className="col-6 d-flex align-items-center gap-2">
                <BsShieldCheck style={{ color: "#059669", fontSize: "15px" }} />
                <span>2 Year Warranty</span>
              </div>
              <div className="col-6 d-flex align-items-center gap-2">
                <BsTruck style={{ color: "#059669", fontSize: "15px" }} />
                <span>Fast 2-Day Delivery</span>
              </div>
              <div className="col-6 d-flex align-items-center gap-2">
                <BsArrowRepeat style={{ color: "#059669", fontSize: "15px" }} />
                <span>30-Day Returns</span>
              </div>
              <div className="col-6 d-flex align-items-center gap-2">
                <BsHeadset style={{ color: "#059669", fontSize: "15px" }} />
                <span>Lifetime Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-bottom mb-4" style={{ borderColor: "#e2e8f0" }}>
          <div className="d-flex align-items-center gap-4">
            {["specifications", "user reviews", "q&a", "downloads"].map(
              (tab) => (
                <button
                  key={tab}
                  type="button"
                  className="btn btn-link text-decoration-none px-0 py-2 position-relative text-capitalize fw-semibold"
                  style={{
                    color: activeTab === tab ? "#4338ca" : "#64748b",
                    fontSize: "14px",
                    borderBottom:
                      activeTab === tab ? "2px solid #4338ca" : "none",
                  }}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "q&a" ? "Q&A" : tab}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Tab Cards: Audio Specs, Physical, In the Box */}
        <div className="row g-4 mb-5">
          {/* Audio Specs */}
          <div className="col-12 col-md-4">
            <div
              className="card p-4 border h-100 shadow-sm"
              style={{
                borderRadius: "16px",
                borderColor: "#e2e8f0",
                backgroundColor: "#f8fafc",
              }}
            >
              <h5
                className="fw-bold text-dark mb-4"
                style={{ fontSize: "16px" }}
              >
                Audio Specs
              </h5>
              <div className="d-flex flex-column gap-3 small">
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Driver Diameter</span>
                  <span className="fw-semibold text-dark">50mm Neodymium</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Freq. Response</span>
                  <span className="fw-semibold text-dark">5Hz - 40kHz</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Impedance</span>
                  <span className="fw-semibold text-dark">32 Ohms</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Sensitivity</span>
                  <span className="fw-semibold text-dark">102 dB/mW</span>
                </div>
              </div>
            </div>
          </div>

          {/* Physical Specs */}
          <div className="col-12 col-md-4">
            <div
              className="card p-4 border h-100 shadow-sm"
              style={{
                borderRadius: "16px",
                borderColor: "#e2e8f0",
                backgroundColor: "#f8fafc",
              }}
            >
              <h5
                className="fw-bold text-dark mb-4"
                style={{ fontSize: "16px" }}
              >
                Physical
              </h5>
              <div className="d-flex flex-column gap-3 small">
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Weight</span>
                  <span className="fw-semibold text-dark">285g (9.8 oz)</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Cable Type</span>
                  <span className="fw-semibold text-dark">
                    Detachable Coiled
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Earcup Material</span>
                  <span className="fw-semibold text-dark">Memory Foam</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Folding</span>
                  <span className="fw-semibold text-dark">
                    Flat-fold design
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* In the Box */}
          <div className="col-12 col-md-4">
            <div
              className="card p-4 border h-100 shadow-sm"
              style={{
                borderRadius: "16px",
                borderColor: "#e2e8f0",
                backgroundColor: "#f8fafc",
              }}
            >
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
                {[
                  "Hard Case",
                  "3.5mm Cable",
                  "6.3mm Adapter",
                  "Extra Pads",
                ].map((item) => (
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
            </div>
          </div>
        </div>

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

          <div className="row g-4">
            {crossSellProducts.map((p) => (
              <div key={p.id} className="col-12 col-sm-6 col-lg-3">
                <div
                  className="card h-100 border bg-white p-3 shadow-sm"
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
                    <button
                      type="button"
                      className="btn d-flex align-items-center justify-content-center border"
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "8px",
                        backgroundColor: "#e0e7ff",
                        borderColor: "#c7d2fe",
                        color: "#4338ca",
                      }}
                    >
                      <BsCartPlus style={{ fontSize: "16px" }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
