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

      <div className="row g-4 mb-5">
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
              Our shopping assistants are online and ready to help you find the
              right item.
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

      <div>
        <h6
          className="text-secondary fw-bold mb-3"
          style={{ fontSize: "12px", letterSpacing: "0.8px" }}
        >
          BROWSE POPULAR CATEGORIES
        </h6>
        <div className="row g-2">
          {categories.map((c) => (
            <div key={c.name} className="col-6 col-sm-4 col-md-2">
              <Link
                to={c.path || "/products"} // to put 2 pathes home and products
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
  );
};

export default NoResults;
