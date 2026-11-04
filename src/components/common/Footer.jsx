import { BsGlobe, BsEnvelope } from "react-icons/bs";

const Footer = () => {
  return (
    <footer
      className="py-4 mt-auto border-top"
      style={{
        backgroundColor: "#dbe7fb",
        borderColor: "#cbd5e1",
        color: "#475569",
      }}
    >
      <div className="container-fluid px-lg-5 px-3">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          {/* Brand & copyright */}
          <div>
            <div className="fw-bold fs-5 mb-1" style={{ color: "#4338ca" }}>
              ShopStream
            </div>
            <div
              className="small"
              style={{ color: "#475569", fontSize: "13px" }}
            >
              © 2024 ShopStream Inc. All rights reserved.
            </div>
          </div>

          {/* Links */}
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

          {/* Icons */}
          <div className="d-flex align-items-center gap-3">
            <span
              role="button"
              className="d-flex align-items-center justify-content-center text-secondary"
              style={{ fontSize: "18px", cursor: "pointer" }}
            >
              <BsGlobe />
            </span>
            <span
              role="button"
              className="d-flex align-items-center justify-content-center text-secondary"
              style={{ fontSize: "18px", cursor: "pointer" }}
            >
              <BsEnvelope />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
