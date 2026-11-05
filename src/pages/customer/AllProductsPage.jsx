import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Pagination,
  Spinner,
  Alert,
} from "react-bootstrap";
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
    <Container fluid className="px-lg-5 px-3 py-4">
      <Row className="g-4">
        {/* Filter Sidebar */}
        <Col xs={12} md={4} lg={3} xl={2}>
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
                <Form.Check
                  id="cat-all"
                  className="d-flex align-items-center gap-2"
                >
                  <Form.Check.Input
                    type="radio"
                    name="category"
                    className="m-0"
                    checked={category === ""}
                    onChange={() => handleCategoryChange("")}
                    style={{ cursor: "pointer", accentColor: "#4338ca" }}
                  />
                  <Form.Check.Label
                    className="user-select-none"
                    style={{
                      fontSize: "14px",
                      color: "#334155",
                      cursor: "pointer",
                    }}
                  >
                    All
                  </Form.Check.Label>
                </Form.Check>

                {categories.map((cat) => (
                  <Form.Check
                    key={cat.slug}
                    id={`cat-${cat.slug}`}
                    className="d-flex align-items-center gap-2"
                  >
                    <Form.Check.Input
                      type="radio"
                      name="category"
                      className="m-0"
                      checked={category === cat.slug}
                      onChange={() => handleCategoryChange(cat.slug)}
                      style={{ cursor: "pointer", accentColor: "#4338ca" }}
                    />
                    <Form.Check.Label
                      className="user-select-none"
                      style={{
                        fontSize: "14px",
                        color: "#334155",
                        cursor: "pointer",
                      }}
                    >
                      {cat.name}
                    </Form.Check.Label>
                  </Form.Check>
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
              <Form.Range
                min={0}
                max={MAX_PRICE}
                step={10}
                value={priceInput}
                onChange={(e) => setPriceInput(Number(e.target.value))}
                aria-label="Maximum price"
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
            <Button
              type="button"
              onClick={handleClearFilters}
              className="w-100 py-2 border-0 fw-semibold"
              style={{
                "--bs-btn-bg": "#e0e7ff",
                "--bs-btn-color": "#4338ca",
                "--bs-btn-hover-bg": "#c7d2fe",
                "--bs-btn-hover-color": "#4338ca",
                "--bs-btn-active-bg": "#c7d2fe",
                "--bs-btn-active-color": "#4338ca",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              Clear Filters
            </Button>
          </aside>
        </Col>

        {/* Main Content Area */}
        <Col xs={12} md={8} lg={9} xl={10}>
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
              <Form.Select
                className="form-select-custom"
                aria-label="Sort products"
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
              </Form.Select>
            </div>
          </div>

          {/* Product Grid */}
          <Row className="g-4">
            {loading ? (
              <Col xs={12} className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <div className="text-muted mt-2">Loading products...</div>
              </Col>
            ) : error ? (
              <Col xs={12}>
                <Alert variant="danger" className="text-center">
                  {error}
                </Alert>
              </Col>
            ) : products.length > 0 ? (
              products.map((product) => (
                <Col key={product.id} xs={12} md={6} lg={4}>
                  <ProductCard product={product} />
                </Col>
              ))
            ) : (
              <Col xs={12}>
                <NoResults searchTerm={searchTerm} />
              </Col>
            )}
          </Row>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <Pagination
              className="justify-content-center gap-1 mt-5 mb-3"
              style={{
                "--bs-pagination-active-bg": "#4338ca",
                "--bs-pagination-active-border-color": "#4338ca",
              }}
            >
              <Pagination.Prev
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <BsChevronLeft style={{ fontSize: "12px" }} />
              </Pagination.Prev>

              {getPageNumbers().map((p) => (
                <Pagination.Item
                  key={p}
                  active={p === page}
                  onClick={() => setPage(p)}
                >
                  {p}
                </Pagination.Item>
              ))}

              <Pagination.Next
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                <BsChevronRight style={{ fontSize: "12px" }} />
              </Pagination.Next>
            </Pagination>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AllProductsPage;
