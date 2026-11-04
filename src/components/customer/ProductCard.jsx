import { Link } from "react-router-dom";
import { BsStarFill, BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        thumbnail: product.image,
        price: product.numericPrice,
        category: product.category,
        stock: product.stock,
      }),
    );
  };

  return (
    <div
      className="card h-100 border bg-white"
      style={{
        borderRadius: "16px",
        borderColor: "#e2e8f0",
        padding: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
      }}
    >
      {/* Image container */}
      <Link
        to={`/products/${product.id}`}
        className="position-relative overflow-hidden mb-3 d-block"
        style={{
          borderRadius: "12px",
          backgroundColor: "#f8fafc",
          paddingTop: "85%",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ objectFit: "cover" }}
        />

        {/* Badges */}
        {product.badge && (
          <span
            className="position-absolute px-2 py-1 text-white fw-bold"
            style={{
              top: "10px",
              left: product.badgePos === "right" ? "auto" : "10px",
              right: product.badgePos === "right" ? "10px" : "auto",
              backgroundColor: product.badgeColor || "#10b981",
              borderRadius: "6px",
              fontSize: "11px",
              letterSpacing: "0.3px",
            }}
          >
            {product.badge}
          </span>
        )}
      </Link>

      {/* Details */}
      <div className="d-flex flex-column flex-grow-1">
        {/* Title and Rating row */}
        <div className="d-flex align-items-center justify-content-between mb-1">
          <Link
            to="/product-details"
            className="mb-0 fw-bold text-truncate pe-2 text-decoration-none"
            style={{ fontSize: "15px", color: "#1e293b" }}
            title={product.title}
          >
            {product.title}
          </Link>
          <div className="d-flex align-items-center gap-1 flex-shrink-0">
            <BsStarFill style={{ color: "#10b981", fontSize: "12px" }} />
            <span
              className="fw-bold"
              style={{ fontSize: "13px", color: "#1e293b" }}
            >
              {product.rating}
            </span>
          </div>
        </div>

        {/* Description */}
        <p
          className="mb-3 text-muted"
          style={{
            fontSize: "12.5px",
            lineHeight: "1.4",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "35px",
          }}
        >
          {product.description}
        </p>

        {/* Bottom row: Price and Add button */}
        <div className="mt-auto d-flex align-items-center justify-content-between pt-1">
          <div>
            <div
              className="fw-bold"
              style={{ fontSize: "15px", color: "#047857" }}
            >
              {product.price}
            </div>
            {product.oldPrice && (
              <div
                className="text-decoration-line-through text-muted"
                style={{ fontSize: "12px", marginTop: "-2px" }}
              >
                {product.oldPrice}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="btn d-inline-flex align-items-center gap-1 px-3 py-1 text-white border-0"
            style={{
              backgroundColor: "#4338ca",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            <BsCartPlus style={{ fontSize: "15px" }} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
