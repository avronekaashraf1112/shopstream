import { Link } from "react-router-dom";
import { IMAGES } from "../../assets/images";
import {
  BsSearch,
  BsBagCheck,
  BsCart2,
  BsCheckCircle,
  BsChatSquareText,
  BsLaptop,
  BsHouseDoor,
  BsArrowsFullscreen,
  BsStars,
  BsGrid,
  BsShare,
  BsGlobe,
} from "react-icons/bs";
import { IoShirtOutline } from "react-icons/io5";

const EmptyStatesPage = () => {
  const categories = [
    { name: "Electronics", icon: <BsLaptop /> },
    { name: "Fashion", icon: <IoShirtOutline /> },
    { name: "Home", icon: <BsHouseDoor /> },
    { name: "Sports", icon: <BsArrowsFullscreen /> },
    { name: "Beauty", icon: <BsStars /> },
    { name: "All Shop", icon: <BsGrid /> },
  ];

  return (
    <div className="bg-white">
      {/* 1. Empty Cart Section */}
      <section className="container-fluid px-lg-5 px-3 py-5 text-center">
        <div className="mx-auto" style={{ maxWidth: "580px" }}>
          {/* Illustration Container */}
          <div className="position-relative d-inline-block mb-4">
            {/* Top-left floating green badge */}
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

            {/* Main circular pedestal image */}
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

            {/* Bottom-right floating purple badge */}
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
            <Link
              to="/products"
              className="btn text-white px-4 py-2 fw-semibold border-0"
              style={{
                backgroundColor: "#4338ca",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              Start Shopping
            </Link>
            <button
              type="button"
              className="btn btn-outline-light border px-4 py-2 fw-semibold"
              style={{
                borderColor: "#cbd5e1",
                backgroundColor: "#ffffff",
                color: "#4338ca",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              View Saved Items
            </button>
          </div>
        </div>
      </section>

      <hr
        className="my-5"
        style={{ borderColor: "#e2e8f0", maxWidth: "900px", margin: "0 auto" }}
      />

      {/* 2. Search No Results Section */}
      <section className="container-fluid px-lg-5 px-3 py-4">
        <div className="text-center mb-5">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-3 p-3 mb-3"
            style={{ backgroundColor: "#e0e7ff", color: "#4338ca" }}
          >
            <BsSearch style={{ fontSize: "24px" }} />
          </div>

          <h3 className="fw-bold mb-1 text-dark" style={{ fontSize: "24px" }}>
            No results for "Astro-Glider Pro"
          </h3>
          <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
            We couldn't find exactly what you were looking for.
          </p>
        </div>

        {/* Two cards */}
        <div
          className="row g-4 mb-5"
          style={{ maxWidth: "1000px", margin: "0 auto" }}
        >
          {/* Quick fix tips card */}
          <div className="col-12 col-md-7">
            <div
              className="card p-4 border h-100 shadow-sm"
              style={{
                backgroundColor: "#f8fafc",
                borderColor: "#e2e8f0",
                borderRadius: "16px",
              }}
            >
              <div className="row align-items-center g-3">
                <div className="col-12 col-sm-7">
                  <h5
                    className="fw-bold mb-3"
                    style={{ color: "#4338ca", fontSize: "16px" }}
                  >
                    Need a quick fix?
                  </h5>
                  <div className="d-flex flex-column gap-2 small">
                    <div className="d-flex align-items-start gap-2 text-secondary">
                      <BsCheckCircle
                        style={{
                          color: "#10b981",
                          marginTop: "3px",
                          flexShrink: 0,
                        }}
                      />
                      <span>Check your spelling for any typos.</span>
                    </div>
                    <div className="d-flex align-items-start gap-2 text-secondary">
                      <BsCheckCircle
                        style={{
                          color: "#10b981",
                          marginTop: "3px",
                          flexShrink: 0,
                        }}
                      />
                      <span>Try using more general keywords.</span>
                    </div>
                    <div className="d-flex align-items-start gap-2 text-secondary">
                      <BsCheckCircle
                        style={{
                          color: "#10b981",
                          marginTop: "3px",
                          flexShrink: 0,
                        }}
                      />
                      <span>Use the filters to broaden your search.</span>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-5 text-center">
                  <img
                    src={IMAGES.laptopDesk}
                    alt="Laptop Help"
                    className="rounded-3 shadow-sm w-100"
                    style={{ height: "110px", objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Chat with us card */}
          <div className="col-12 col-md-5">
            <div
              className="card p-4 border h-100 shadow-sm"
              style={{
                backgroundColor: "#d1fae5",
                borderColor: "#a7f3d0",
                borderRadius: "16px",
              }}
            >
              <h5
                className="fw-bold mb-2"
                style={{ color: "#065f46", fontSize: "16px" }}
              >
                Chat with us
              </h5>
              <p
                className="small mb-4"
                style={{ color: "#047857", lineHeight: 1.5 }}
              >
                Our shopping assistants are online and ready to help you find
                the right item.
              </p>
              <button
                type="button"
                className="btn text-white fw-bold d-inline-flex align-items-center justify-content-center gap-2 border-0 mt-auto py-2"
                style={{
                  backgroundColor: "#065f46",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              >
                <BsChatSquareText />
                <span>Start Live Chat</span>
              </button>
            </div>
          </div>
        </div>

        {/* BROWSE POPULAR CATEGORIES */}
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h6
            className="text-secondary fw-bold mb-3"
            style={{ fontSize: "12px", letterSpacing: "0.8px" }}
          >
            BROWSE POPULAR CATEGORIES
          </h6>
          <div className="row g-2">
            {categories.map((c, i) => (
              <div key={i} className="col-6 col-sm-4 col-md-2">
                <Link
                  to="/products"
                  className="btn w-100 d-flex flex-column align-items-center justify-content-center py-3 border text-decoration-none"
                  style={{
                    backgroundColor: "#e0e7ff",
                    borderColor: "#c7d2fe",
                    color: "#4338ca",
                    borderRadius: "10px",
                  }}
                >
                  <span style={{ fontSize: "18px" }} className="mb-1">
                    {c.icon}
                  </span>
                  <span style={{ fontSize: "12px", fontWeight: 600 }}>
                    {c.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-4 mt-5 border-top"
        style={{
          backgroundColor: "#e0e7ff",
          borderColor: "#c7d2fe",
          color: "#475569",
        }}
      >
        <div className="container-fluid px-lg-5 px-3">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
            <div>
              <div className="fw-bold fs-5 mb-1" style={{ color: "#4338ca" }}>
                ShopStream
              </div>
              <div
                className="small"
                style={{ color: "#64748b", fontSize: "13px" }}
              >
                © 2024 ShopStream Inc. All rights reserved.
              </div>
            </div>

            <div
              className="d-flex align-items-center flex-wrap gap-4 small"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              <span style={{ cursor: "pointer", color: "#334155" }}>
                Privacy Policy
              </span>
              <span style={{ cursor: "pointer", color: "#334155" }}>
                Terms of Service
              </span>
              <span style={{ cursor: "pointer", color: "#334155" }}>
                Contact Us
              </span>
              <span style={{ cursor: "pointer", color: "#334155" }}>
                Shipping Info
              </span>
            </div>

            <div className="d-flex align-items-center gap-3">
              <span
                role="button"
                className="text-secondary"
                style={{ fontSize: "18px", cursor: "pointer" }}
              >
                <BsShare />
              </span>
              <span
                role="button"
                className="text-secondary"
                style={{ fontSize: "18px", cursor: "pointer" }}
              >
                <BsGlobe />
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmptyStatesPage;
