# ShopStream

A responsive e-commerce frontend built with React, consuming the [DummyJSON](https://dummyjson.com) API. It includes a customer storefront and an admin dashboard with full CRUD for products, users and carts.

**Live demo:** _add your Vercel link here_
**Repository:** _add your GitHub link here_

## Features

### Storefront

- Home page with featured products
- Product listing with search, category filter, sorting (price, rating, title) and pagination
- Product details page with quantity-aware "Add to cart"
- Cart (Redux) with totals, order summary, clear cart and empty-cart state
- Checkout and order confirmation pages

### Authentication

- Login with the DummyJSON `/auth/login` endpoint, with input validation
- Mock registration flow
- Token persisted in `localStorage`, so the user stays logged in after a page reload
- Authenticated user data loaded from `/auth/me`
- Protected routes with role-based access (admin / moderator)

### Admin dashboard

- Summary widgets (products, users, carts)
- **Products:** list, add, edit, delete
- **Users:** list, search, pagination, add, edit, delete
- **Carts:** list, filter by user ID, pagination, add, edit, delete

## Tech stack

- React 19 and Vite
- React Bootstrap and Bootstrap 5
- Redux Toolkit and React Redux
- React Router
- Axios
- react-hot-toast
- react-icons

## Installation

```bash
git clone <your-repo-url>
cd shopstream
npm install
npm run dev
```

Other scripts:

```bash
npm run build     # production build
npm run preview   # preview the production build
npm run lint      # run oxlint
```

## Demo account

DummyJSON provides test users. For example, this account has the admin role and can open the dashboard:

- Username: `emilys`
- Password: `emilyspass`

More users: https://dummyjson.com/users

## Deployment

The app is deployed on Vercel. The included `vercel.json` rewrites all routes to `index.html`, so client-side routes (for example `/products` or `/admin/dashboard`) keep working after a page refresh.

## Notes and known issues

- DummyJSON simulates write operations: adding, updating or deleting products, users and carts returns a success response but does not save anything on the server. The UI updates its local state to reflect these actions, and the changes are lost on reload.
- Registration is a mock flow for the same reason: the new user is not stored by the API, so you cannot log in with it.
