import { Container, Row, Col } from "react-bootstrap";
import { BsGlobe, BsEnvelope } from "react-icons/bs";

const FOOTER_LINKS = [
  "Privacy Policy",
  "Terms of Service",
  "Contact Us",
  "Shipping Info",
];

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
      <Container fluid className="px-lg-5 px-3">
        <Row className="align-items-center gy-3 text-center text-md-start">
          {/* Brand & copyright */}
          <Col xs={12} md={4}>
            <div className="fw-bold fs-5 mb-1" style={{ color: "#4338ca" }}>
              ShopStream
            </div>
            <div
              className="small"
              style={{ color: "#475569", fontSize: "13px" }}
            >
              © {new Date().getFullYear()} ShopStream Inc. All rights reserved.
            </div>
          </Col>

          {/* Links */}
          <Col xs={12} md={5}>
            <div
              className="d-flex align-items-center justify-content-center flex-wrap gap-4 small"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              {FOOTER_LINKS.map((label) => (
                <span
                  key={label}
                  style={{ cursor: "pointer", color: "#334155" }}
                >
                  {label}
                </span>
              ))}
            </div>
          </Col>

          {/* Icons */}
          <Col xs={12} md={3}>
            <div className="d-flex align-items-center justify-content-center justify-content-md-end gap-3">
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
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
