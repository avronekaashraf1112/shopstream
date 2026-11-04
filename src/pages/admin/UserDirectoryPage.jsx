import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Table,
  Pagination,
  Badge,
} from "react-bootstrap";
import toast from "react-hot-toast";
import AddUserModal from "../../modals/AddUserModal";
import DeleteUserModal from "../../modals/DeleteUserModal";
import EditUserModal from "../../modals/EditUserModal";
import { fetchUsers } from "../../services/users";
import { fetchUserRoleCounts } from "../../services/dashboard";

import {
  BsSearch,
  BsPersonPlus,
  BsPeople,
  BsShieldCheck,
  BsPersonBadge,
  BsPerson,
  BsPencil,
  BsTrash,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

const LIMIT = 10;

const getRoleInfo = (role) => {
  if (role === "admin") {
    return { label: "Admin", bg: "#e0e7ff", color: "#4338ca" };
  }
  if (role === "moderator") {
    return { label: "Moderator", bg: "#fef3c7", color: "#b45309" };
  }
  return { label: "Customer", bg: "#e2e8f0", color: "#475569" };
};

const UserDirectoryPage = ({ defaultModal = null }) => {
  const [activeModal, setActiveModal] = useState(defaultModal);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0); // Total users in API => Needed to know how many pages for pagination
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const [roleCounts, setRoleCounts] = useState({
    admins: 0,
    moderators: 0,
    customers: 0,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      try {
        const data = await fetchUsers({
          search,
          limit: LIMIT,
          skip: (page - 1) * LIMIT,
        });
        if (!cancelled) {
          setUsers(data.users);
          setTotal(data.total);
        }
      } catch {
        if (!cancelled) {
          toast.error("Failed to load users");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    loadUsers();

    //  FOR CLEANUP:  This will prevent state updates if the component unmounts before the fetch completes.
    return () => {
      cancelled = true;
    };
  }, [search, page]);

  useEffect(() => {
    fetchUserRoleCounts()
      .then(setRoleCounts)
      .catch(() => toast.error("Failed to load user stats"));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
    setPage(1);
  };

  const totalPages = Math.ceil(total / LIMIT); // Calculate the no. of pagination pages

  const getPageNumbers = () => {
    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, start + 2);
    start = Math.max(1, end - 2);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleDeleted = (id) => {
    const remaining = users.filter((u) => u.id !== id);
    setUsers(remaining);
    setTotal((prev) => prev - 1);

    if (remaining.length === 0 && page > 1) {
      setPage(page - 1);
    }
  };

  const handleAdded = (user) => {
    setUsers((prev) => [user, ...prev].slice(0, LIMIT));
    setTotal((prev) => prev + 1);
  };

  const handleUpdated = (updated) => {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  const statCards = [
    {
      label: "Total Users",
      value: total.toLocaleString(),
      icon: <BsPeople />,
      bg: "#e0e7ff",
      color: "#4338ca",
    },
    {
      label: "Admins",
      value: roleCounts.admins,
      icon: <BsShieldCheck />,
      bg: "#d1fae5",
      color: "#059669",
    },
    {
      label: "Moderators",
      value: roleCounts.moderators,
      icon: <BsPersonBadge />,
      bg: "#fef3c7",
      color: "#b45309",
    },
    {
      label: "Customers",
      value: roleCounts.customers,
      icon: <BsPerson />,
      bg: "#e0e7ff",
      color: "#4338ca",
    },
  ];

  return (
    <div>
      {/* Header Row */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-3">
        <div>
          <h2 className="fw-bold mb-1 text-dark" style={{ fontSize: "26px" }}>
            User Directory
          </h2>
          <div className="small text-muted" style={{ fontSize: "13px" }}>
            Home &gt; Products &gt;{" "}
            <span className="fw-bold text-dark">Categories</span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <Form
            onSubmit={handleSearch}
            className="d-flex align-items-center px-3 py-1 bg-white rounded-3 border"
            style={{ borderColor: "#cbd5e1", width: "260px" }}
          >
            <BsSearch
              className="text-muted me-2"
              style={{ fontSize: "14px" }}
            />
            <Form.Control
              type="text"
              aria-label="Search users"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border-0 bg-transparent p-0 shadow-none"
              placeholder="Search users..."
              style={{ fontSize: "14px" }}
            />
          </Form>

          <Button
            type="button"
            className="text-white d-flex align-items-center gap-2 px-3 py-2 border-0 shadow-sm"
            style={{
              backgroundColor: "#3730a3",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
            }}
            onClick={() => setActiveModal("add")}
          >
            <BsPersonPlus style={{ fontSize: "16px" }} />
            <span>Add New User</span>
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <Row className="g-3 mb-4">
        {statCards.map((stat) => (
          <Col key={stat.label} xs={12} sm={6} xl={3}>
            <Card
              className="p-3 border bg-white h-100 shadow-sm"
              style={{ borderRadius: "16px", borderColor: "#e2e8f0" }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "46px",
                    height: "46px",
                    backgroundColor: stat.bg,
                    color: stat.color,
                    fontSize: "20px",
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <div
                    className="text-muted small"
                    style={{ fontSize: "13px" }}
                  >
                    {stat.label}
                  </div>
                  <div
                    className="fw-bold text-dark"
                    style={{ fontSize: "24px" }}
                  >
                    {stat.value}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Users Table Card */}
      <Card
        className="mb-4 border bg-white shadow-sm"
        style={{ borderRadius: "16px", borderColor: "#e2e8f0" }}
      >
        <Table responsive className="align-middle mb-0">
          <thead>
            <tr
              style={{
                backgroundColor: "#f8fafc",
                color: "#64748b",
                fontSize: "12px",
                letterSpacing: "0.5px",
              }}
            >
              <th className="ps-4 py-3 fw-bold border-0">USER</th>
              <th className="py-3 fw-bold border-0">EMAIL ADDRESS</th>
              <th className="py-3 fw-bold border-0">ROLE</th>
              <th className="py-3 fw-bold border-0">PHONE</th>
              <th className="pe-4 py-3 fw-bold border-0 text-end">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="text-center text-muted py-5">
                  Loading users...
                </td>
              </tr>
            )}

            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-muted py-5">
                  No users found
                </td>
              </tr>
            )}

            {!loading &&
              users.map((user) => {
                const roleInfo = getRoleInfo(user.role);

                return (
                  <tr key={user.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                    <td className="ps-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.firstName}
                            className="rounded-circle"
                            style={{
                              width: "42px",
                              height: "42px",
                              objectFit: "cover",
                              backgroundColor: "#e2e8f0",
                            }}
                          />
                        ) : (
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                            style={{
                              width: "42px",
                              height: "42px",
                              backgroundColor: "#e0e7ff",
                              color: "#4338ca",
                            }}
                          >
                            {user.firstName?.[0]}
                          </div>
                        )}
                        <div>
                          <div
                            className="fw-bold text-dark"
                            style={{ fontSize: "14px" }}
                          >
                            {user.firstName} {user.lastName}
                          </div>
                          <div
                            className="text-muted small"
                            style={{ fontSize: "12px" }}
                          >
                            @{user.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      className="py-3 text-secondary"
                      style={{ fontSize: "14px" }}
                    >
                      {user.email}
                    </td>
                    <td className="py-3">
                      <Badge
                        pill
                        bg=""
                        className="px-3 py-1 fw-semibold"
                        style={{
                          backgroundColor: roleInfo.bg,
                          color: roleInfo.color,
                          borderRadius: "20px",
                          fontSize: "11px",
                          letterSpacing: "0.3px",
                        }}
                      >
                        {roleInfo.label}
                      </Badge>
                    </td>
                    <td
                      className="py-3 text-secondary"
                      style={{ fontSize: "13.5px" }}
                    >
                      {user.phone || "—"}
                    </td>
                    <td className="pe-4 py-3 text-end">
                      <div className="d-flex align-items-center justify-content-end gap-3 text-secondary">
                        <span
                          role="button"
                          title="Edit User"
                          onClick={() => {
                            setSelectedUser(user);
                            setActiveModal("edit");
                          }}
                          style={{
                            color: "#475569",
                            cursor: "pointer",
                            fontSize: "16px",
                          }}
                        >
                          <BsPencil />
                        </span>
                        <span
                          role="button"
                          title="Delete User"
                          style={{
                            color: "#dc2626",
                            cursor: "pointer",
                            fontSize: "16px",
                          }}
                          onClick={() => {
                            setSelectedUser(user);
                            setActiveModal("delete");
                          }}
                        >
                          <BsTrash />
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        {/* Table Pagination Footer */}
        <div
          className="d-flex flex-column flex-sm-row align-items-center justify-content-between p-3 px-4 border-top"
          style={{ borderColor: "#f1f5f9" }}
        >
          <div
            className="text-muted small mb-2 mb-sm-0"
            style={{ fontSize: "13px" }}
          >
            {total === 0
              ? "No users"
              : `Showing ${(page - 1) * LIMIT + 1} to ${Math.min(page * LIMIT, total)} of ${total} users`}
          </div>

          {totalPages > 1 && (
            <Pagination
              className="mb-0 gap-1"
              style={{
                "--bs-pagination-active-bg": "#4338ca",
                "--bs-pagination-active-border-color": "#4338ca",
              }}
            >
              <Pagination.Prev
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <BsChevronLeft style={{ fontSize: "11px" }} />
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
                <BsChevronRight style={{ fontSize: "11px" }} />
              </Pagination.Next>
            </Pagination>
          )}
        </div>
      </Card>

      {/* Modals */}
      <AddUserModal
        isOpen={activeModal === "add"}
        onClose={() => setActiveModal(null)}
        onAdded={handleAdded}
      />
      <DeleteUserModal
        isOpen={activeModal === "delete"}
        user={selectedUser}
        onClose={() => setActiveModal(null)}
        onDeleted={handleDeleted}
      />
      <EditUserModal
        isOpen={activeModal === "edit"}
        user={selectedUser}
        onClose={() => setActiveModal(null)}
        onUpdated={handleUpdated}
      />
    </div>
  );
};

export default UserDirectoryPage;
