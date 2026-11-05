import { Link } from "react-router-dom";
import { IMAGES } from "../../assets/images";
import {
  BsSearch,
  BsCheckCircle,
  BsChatSquareText,
  BsLaptop,
  BsHouseDoor,
  BsArrowsFullscreen,
  BsStars,
  BsGrid,
} from "react-icons/bs";
import { IoShirtOutline } from "react-icons/io5";
import { Button, Card, Col, Row } from "react-bootstrap";

const categories = [
  { name: "Electronics", icon: <BsLaptop /> },
  { name: "Fashion", icon: <IoShirtOutline /> },
  { name: "Home", icon: <BsHouseDoor />, path: "/" },
  { name: "Sports", icon: <BsArrowsFullscreen /> },
  { name: "Beauty", icon: <BsStars /> },
  { name: "All Shop", icon: <BsGrid /> },
];

const NoResults = ({ searchTerm }) => {
  return (
    <section className="py-4">
      <div className="text-center mb-5">
        <div
          className="d-inline-flex align-items-center justify-content-center rounded-3 p-3 mb-3"
          style={{ backgroundColor: "#e0e7ff", color: "#4338ca" }}
        >
          <BsSearch style={{ fontSize: "24px" }} />
        </div>

        <h3 className="fw-bold mb-1 text-dark" style={{ fontSize: "24px" }}>
          {searchTerm ? `No results for "${searchTerm}"` : "No products found"}
        </h3>
        <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
          We couldn't find exactly what you were looking for.
        </p>
      </div>

      <Row className="g-4 mb-5">
        <Col xs={12} md={7}>
          <Card
            className="p-4 border h-100 shadow-sm"
            style={{
              backgroundColor: "#f8fafc",
              borderColor: "#e2e8f0",
              borderRadius: "16px",
            }}
          >
            <Row className="align-items-center g-3">
              <Col xs={12} sm={7}>
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
              </Col>

              <Col xs={12} sm={5} className="text-center">
                <img
                  src={IMAGES.laptopDesk}
                  alt="Laptop Help"
                  className="rounded-3 shadow-sm w-100"
                  style={{ height: "110px", objectFit: "cover" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={12} md={5}>
          <Card
            className="p-4 border h-100 shadow-sm"
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
              Our shopping assistants are online and ready to help you find the
              right item.
            </p>
            <Button
              type="button"
              variant={null}
              className="text-white fw-bold d-inline-flex align-items-center justify-content-center gap-2 border-0 mt-auto py-2"
              style={{
                backgroundColor: "#065f46",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              <BsChatSquareText />
              <span>Start Live Chat</span>
            </Button>
          </Card>
        </Col>
      </Row>

      <div>
        <h6
          className="text-secondary fw-bold mb-3"
          style={{ fontSize: "12px", letterSpacing: "0.8px" }}
        >
          BROWSE POPULAR CATEGORIES
        </h6>
        <Row className="g-2">
          {categories.map((c) => (
            <Col key={c.name} xs={6} sm={4} md={2}>
              <Button
                to={c.path || "/products"} // to put 2 pathes home and products
                as={Link}
                variant={null}
                className="w-100 d-flex flex-column align-items-center justify-content-center py-3 border text-decoration-none"
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
              </Button>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default NoResults;
