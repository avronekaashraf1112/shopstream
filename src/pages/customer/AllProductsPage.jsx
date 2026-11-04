import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import ProductCard from "../../components/customer/ProductCard";
import NoResults from "../../components/customer/NoResults";
import { fetchProducts, fetchCategories } from "../../services/products";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const LIMIT = 9; // For Pagination limit

const SORT_OPTIONS = {
  default: { sortBy: "", order: "" },
  "price-asc": { sortBy: "price", order: "asc" },
  "price-desc": { sortBy: "price", order: "desc" },
  "rating-desc": { sortBy: "rating", order: "desc" },
  "title-asc": { sortBy: "title", order: "asc" },
};

const MAX_PRICE = 1000; // The right end of the slider = "any price" (no price filter)

// Turn a product from the API into the shape the ProductCard needs
const formatProduct = (item) => ({
  id: item.id,
  title: item.title,
  description: item.description,
  image: item.thumbnail,
  rating: item.rating,
  price: `$${item.price.toFixed(2)}`,
  numericPrice: item.price,
  stock: item.stock,
  category: item.category,
  oldPrice: item.discountPercentage
    ? `$${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}`
    : null,
  badge: item.discountPercentage
    ? `-${Math.round(item.discountPercentage)} %`
    : null,
  badgeColor: "#ef4444",
  badgePos: "right",
});

const AllProductsPage = () => {
  // Hook used to read the query parameter fom the URL
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get("search") || "").trim();

  // Pagination
  const [page, setPage] = useState(1); // To make the page remember to start from no. 1
  const [total, setTotal] = useState(0);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sort, setSort] = useState("default");

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  // Price filter: priceInput follows the slider, maxPrice is the applied value
  const [priceInput, setPriceInput] = useState(MAX_PRICE);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  // Keeps the full product lists so moving the slider or changing pages does not refetch them
  const allProductsCache = useRef({});

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        //Pagination and SortBy and Category
        const { sortBy, order } = SORT_OPTIONS[sort]; // Destructuring the object to variables
        const priceFilterOn = maxPrice < MAX_PRICE;

        if (priceFilterOn) {
          // DummyJSON has no price filter, so we load all the matching products once
          // (limit: 0 means "all"), then filter by price and split them into pages here
          const cacheKey = `${searchTerm}|${category}|${sort}`;
          let all = allProductsCache.current[cacheKey];

          if (!all) {
            const data = await fetchProducts({
              search: searchTerm,
              category,
              sortBy,
              order,
              limit: 0,
              skip: 0,
            });
            all = data.products;
            allProductsCache.current[cacheKey] = all;
          }

          const filtered = all.filter((item) => item.price <= maxPrice);
          const start = (page - 1) * LIMIT;

          if (!cancelled) {
            setProducts(
              filtered.slice(start, start + LIMIT).map(formatProduct),
            );
            setTotal(filtered.length);
          }
        } else {
          const data = await fetchProducts({
            search: searchTerm,
            category,
            sortBy,
            order,
            limit: LIMIT,
            skip: (page - 1) * LIMIT,
          });

          if (!cancelled) {
            setProducts(data.products.map(formatProduct));
            setTotal(data.total);
          }
        }
      } catch (error) {
        if (!cancelled) {
          setError("Failed to load products. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [searchTerm, page, sort, category, maxPrice]);

  // To search in all pages even if you are in any page
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  // To make smooth scrollup after we change the page no.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Fetch categories from API
  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    }
    loadCategories();
  }, []);

  // Wait a moment after the slider stops moving, then apply the price filter
  useEffect(() => {
    const timer = setTimeout(() => {
      setMaxPrice(priceInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [priceInput]);

  const totalPages = Math.ceil(total / LIMIT); // Get the nearest no. to the pagination pages

  // Pagination page numbers...
  const getPageNumbers = () => {
    let start = Math.max(1, page - 2); // To get the pervious page
    let end = Math.min(totalPages, start + 4);
    start = Math.max(1, end - 4);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Slug function => to get the category slug from the API and set it to the category state
  const handleCategoryChange = (slug) => {
    setCategory(slug);
    setPage(1);
    if (searchTerm) {
      setSearchParams({});
    }
  };

  const handleClearFilters = () => {
    setCategory("");
    setSort("default");
    setPriceInput(MAX_PRICE);
    setMaxPrice(MAX_PRICE);
    setPage(1);
    setSearchParams({});
  };

  return (
    <div className="container-fluid px-lg-5 px-3 py-4">
      <div className="row g-4">
        {/* Filter Sidebar */}
        <div className="col-12 col-md-4 col-lg-3 col-xl-2">
          <aside className="pe-lg-3">
            {/* Category Section */}
            <div className="mb-4">
              <h6
                className="text-secondary fw-bold mb-3"
                style={{ fontSize: "12px", letterSpacing: "0.8px" }}
              >
                CATEGORY
              </h6>
              <div
                className="d-flex flex-column gap-2"
                style={{ maxHeight: "240px", overflowY: "auto" }}
              >
                <div className="form-check d-flex align-items-center gap-2">
                  <input
                    className="form-check-input m-0"
                    type="radio"
                    name="category"
                    id="cat-all"
                    checked={category === ""}
                    onChange={() => handleCategoryChange("")}
                    style={{ cursor: "pointer", accentColor: "#4338ca" }}
                  />
                  <label
                    className="form-check-label user-select-none"
                    htmlFor="cat-all"
                    style={{
                      fontSize: "14px",
                      color: "#334155",
                      cursor: "pointer",
                    }}
                  >
                    All
                  </label>
                </div>

                {categories.map((cat) => (
                  <div
                    key={cat.slug}
                    className="form-check d-flex align-items-center gap-2"
                  >
                    <input
                      className="form-check-input m-0"
                      type="checkbox"
                      name="category"
                      id={`cat-${cat.slug}`}
                      checked={category === cat.slug}
                      onChange={() => handleCategoryChange(cat.slug)}
                      style={{ cursor: "pointer", accentColor: "#4338ca" }}
                    />
                    <label
                      className="form-check-label user-select-none"
                      htmlFor={`cat-${cat.slug}`}
                      style={{
                        fontSize: "14px",
                        color: "#334155",
                        cursor: "pointer",
                      }}
                    >
                      {cat.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <hr style={{ borderColor: "#e2e8f0", margin: "20px 0" }} />

            {/* Price Range Section */}
            <div className="mb-4">
              <h6
                className="text-secondary fw-bold mb-3"
                style={{ fontSize: "12px", letterSpacing: "0.8px" }}
              >
                PRICE RANGE
              </h6>
              <div
                className="fw-semibold mb-1"
                style={{ fontSize: "14px", color: "#334155" }}
              >
                {priceInput < MAX_PRICE ? `Up to $${priceInput}` : "Any price"}
              </div>
              <input
                type="range"
                className="form-range"
                min="0"
                max={MAX_PRICE}
                step="10"
                value={priceInput}
                onChange={(e) => setPriceInput(Number(e.target.value))}
                style={{ accentColor: "#4338ca" }}
              />
              <div
                className="d-flex justify-content-between text-muted"
                style={{ fontSize: "13px" }}
              >
                <span>$0</span>
                <span>$1,000+</span>
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              type="button"
              onClick={handleClearFilters}
              className="btn w-100 py-2 border-0 fw-semibold"
              style={{
                backgroundColor: "#e0e7ff",
                color: "#4338ca",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              Clear Filters
            </button>
          </aside>
        </div>

        {/* Main Content Area */}
        <div className="col-12 col-md-8 col-lg-9 col-xl-10">
          {/* Header Row */}
          <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between mb-4 gap-2">
            <div>
              <h4
                className="fw-bold mb-1"
                style={{ color: "#0f172a", fontSize: "20px" }}
              >
                {searchTerm
                  ? `Search results for "${searchTerm}"`
                  : "All Products"}
              </h4>

              <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                {loading
                  ? "Loading products ... "
                  : `Showing ${products.length} of ${total} products`}
              </p>
            </div>

            <div className="d-flex align-items-center gap-2">
              <span
                className="text-muted small"
                style={{ fontSize: "14px", whiteSpace: "nowrap" }}
              >
                Sort by:
              </span>
              <select
                className="form-select form-select-custom"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                style={{
                  fontSize: "14px",
                  borderRadius: "8px",
                  width: "auto",
                  borderColor: "#cbd5e1",
                }}
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="title-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="row g-4">
            {loading ? (
              <div className="col-12 text-center py-5">Loading products...</div>
            ) : error ? (
              <div className="col-12 text-center py-5 text-danger">{error}</div>
            ) : products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="col-12 col-md-6 col-lg-4">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="col-12">
                <NoResults searchTerm={searchTerm} />
              </div>
            )}
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="d-flex align-items-center justify-content-center gap-2 mt-5 mb-3">
              {/* Pagination prev */}
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="btn btn-outline-light border text-muted d-flex align-items-center justify-content-center"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  borderColor: "#e2e8f0",
                  backgroundColor: "#ffffff",
                }}
              >
                <BsChevronLeft style={{ fontSize: "12px" }} />
              </button>

              {getPageNumbers().map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`btn d-flex align-items-center justify-content-center ${
                    p === page
                      ? "text-white fw-bold"
                      : "border-0 text-muted fw-medium"
                  }`}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: p === page ? "#4338ca" : "transparent",
                  }}
                >
                  {p}
                </button>
              ))}

              {/* Pagination next */}
              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="btn btn-outline-light border text-muted d-flex align-items-center justify-content-center"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  borderColor: "#e2e8f0",
                  backgroundColor: "#ffffff",
                }}
              >
                <BsChevronRight style={{ fontSize: "12px" }} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
