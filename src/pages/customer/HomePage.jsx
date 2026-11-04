import { Link } from "react-router-dom";
import { IMAGES } from "../../assets/images";
import { getProducts } from "../../services/products";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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

const HomePage = () => {
  const dispatch = useDispatch(); // To send the action to the redux

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async function () {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className="container-fluid px-lg-5 px-3 py-4 py-lg-5">
        <div
          className="row align-items-center g-4 p-4 p-lg-5 rounded-4"
          style={{
            background: "linear-gradient(135deg, #f8faff 0%, #edf2fe 100%)",
            border: "1px solid #e2e8f0",
          }}
        >
          <div className="col-12 col-lg-6">
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
              <Link
                to="/products"
                className="btn text-white px-4 py-2 fw-semibold border-0"
                style={{
                  backgroundColor: "#4338ca",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              >
                Shop Now
              </Link>
              <Link
                to="/products"
                className="btn btn-outline-light border px-4 py-2 fw-semibold"
                style={{
                  borderColor: "#cbd5e1",
                  backgroundColor: "#ffffff",
                  color: "#4338ca",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              >
                View Collections
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-6 text-center">
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
          </div>
        </div>
      </section>

      {/* 2. Top Categories Section */}
      <section className="container-fluid px-lg-5 px-3 py-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h3
              className="fw-bold mb-1"
              style={{ fontSize: "24px", color: "#0f172a" }}
            >
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
        <div className="row g-3">
          {/* Large Left Card: Computing */}
          <div className="col-12 col-lg-6">
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
          </div>

          {/* Right Column: 3 Cards */}
          <div className="col-12 col-lg-6">
            <div className="row g-3">
              {/* Wearables */}
              <div className="col-12 col-sm-6">
                <div
                  className="position-relative rounded-4 overflow-hidden shadow-sm"
                  style={{ height: "172px", backgroundColor: "#0f172a" }}
                >
                  <img
                    src={IMAGES.wearableWatch}
                    alt="Wearables"
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
                      Wearables
                    </span>
                  </div>
                </div>
              </div>

              {/* Audio */}
              <div className="col-12 col-sm-6">
                <div
                  className="position-relative rounded-4 overflow-hidden shadow-sm"
                  style={{ height: "172px", backgroundColor: "#0f172a" }}
                >
                  <img
                    src={IMAGES.audioSpeaker}
                    alt="Audio"
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
                      Audio
                    </span>
                  </div>
                </div>
              </div>

              {/* Home Theater */}
              <div className="col-12">
                <div
                  className="position-relative rounded-4 overflow-hidden shadow-sm"
                  style={{ height: "172px", backgroundColor: "#0f172a" }}
                >
                  <img
                    src={IMAGES.homeTheater}
                    alt="Home Theater"
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
                      Home Theater
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Products Section */}
      <section className="container-fluid px-lg-5 px-3 py-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h3
              className="fw-bold mb-1"
              style={{ fontSize: "24px", color: "#0f172a" }}
            >
              Featured Products
            </h3>
            <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
              The latest and greatest collection.
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-outline-light border text-muted d-flex align-items-center justify-content-center"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#ffffff",
              }}
            >
              <BsChevronLeft style={{ fontSize: "11px" }} />
            </button>
            <button
              type="button"
              className="btn btn-outline-light border text-muted d-flex align-items-center justify-content-center"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#ffffff",
              }}
            >
              <BsChevronRight style={{ fontSize: "11px" }} />
            </button>
          </div>
        </div>

        {/* 4 Cards Grid */}

        <div className="row g-4">
          {products.slice(0, 4).map(
            (
              prod,
              // To show only the four products not all
            ) => (
              <div key={prod.id} className="col-12 col-sm-6 col-lg-3">
                <div
                  className="card h-100 border bg-white p-3 shadow-sm"
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

                    {prod.badge && (
                      <span
                        className="position-absolute px-2 py-1 text-white fw-bold"
                        style={{
                          top: "10px",
                          right: prod.badge === "NEW" ? "10px" : "auto",
                          left: prod.badge === "BEST SELLER" ? "10px" : "auto",
                          backgroundColor: prod.badgeColor,
                          borderRadius: "6px",
                          fontSize: "10px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {prod.badge}
                      </span>
                    )}
                  </div>

                  <div className="d-flex flex-column flex-grow-1">
                    <div
                      className="fw-bold mb-1"
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
                        {prod.price}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          console.log("Add to Cart clicked:", prod);
                          dispatch(addToCart(prod));
                        }}
                        className="btn d-flex align-items-center justify-content-center border"
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          backgroundColor: "#f8fafc",
                          borderColor: "#e2e8f0",
                          color: "#4338ca",
                        }}
                      >
                        <BsCartPlus style={{ fontSize: "16px" }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      {/* 4. Newsletter Banner */}
      <section className="container-fluid px-lg-5 px-3 py-4 py-lg-5">
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

            <div
              className="d-flex flex-column flex-sm-row gap-2"
              style={{ maxWidth: "480px" }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control text-white border-0 px-3 py-2 flex-grow-1"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              />
              <button
                type="button"
                className="btn text-white fw-bold px-4 py-2 border-0"
                style={{
                  backgroundColor: "#059669",
                  borderRadius: "8px",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Extended Customer Footer */}
      <footer
        className="py-5 border-top"
        style={{
          backgroundColor: "#e6effd",
          borderColor: "#cbd5e1",
          color: "#475569",
        }}
      >
        <div className="container-fluid px-lg-5 px-3">
          <div className="row g-4 mb-5">
            {/* Brand & mission */}
            <div className="col-12 col-lg-5">
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
                <span
                  role="button"
                  className="rounded-circle border d-flex align-items-center justify-content-center text-secondary"
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "#ffffff",
                    borderColor: "#cbd5e1",
                  }}
                >
                  <BsGlobe style={{ fontSize: "14px" }} />
                </span>
                <span
                  role="button"
                  className="rounded-circle border d-flex align-items-center justify-content-center text-secondary"
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "#ffffff",
                    borderColor: "#cbd5e1",
                  }}
                >
                  <BsChatDots style={{ fontSize: "14px" }} />
                </span>
                <span
                  role="button"
                  className="rounded-circle border d-flex align-items-center justify-content-center text-secondary"
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "#ffffff",
                    borderColor: "#cbd5e1",
                  }}
                >
                  <BsSliders style={{ fontSize: "14px" }} />
                </span>
              </div>
            </div>

            {/* Shop Links */}
            <div className="col-6 col-sm-4 col-lg-2">
              <h6
                className="fw-bold text-dark mb-3"
                style={{ fontSize: "12px", letterSpacing: "0.8px" }}
              >
                SHOP
              </h6>
              <ul className="list-unstyled d-flex flex-column gap-2 small mb-0">
                <li>
                  <Link
                    to="/products"
                    className="text-decoration-none text-muted"
                  >
                    All Electronics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-decoration-none text-muted"
                  >
                    Wearables
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-decoration-none text-muted"
                  >
                    Home Office
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-decoration-none text-muted"
                  >
                    New Arrivals
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div className="col-6 col-sm-4 col-lg-2">
              <h6
                className="fw-bold text-dark mb-3"
                style={{ fontSize: "12px", letterSpacing: "0.8px" }}
              >
                SUPPORT
              </h6>
              <ul className="list-unstyled d-flex flex-column gap-2 small mb-0">
                <li>
                  <span className="text-muted" style={{ cursor: "pointer" }}>
                    Contact Us
                  </span>
                </li>
                <li>
                  <span className="text-muted" style={{ cursor: "pointer" }}>
                    Shipping Info
                  </span>
                </li>
                <li>
                  <span className="text-muted" style={{ cursor: "pointer" }}>
                    Returns
                  </span>
                </li>
                <li>
                  <span className="text-muted" style={{ cursor: "pointer" }}>
                    FAQ
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
