import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useLocation } from "react-router-dom"; // Used to prevent the mai footer from appearing in the home page

const CustomerLayout = ({ children }) => {
  const { pathname } = useLocation(); // Used to prevent the mai footer from appearing in the home page

  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
      <Navbar />

      <main className="flex-grow-1">{children}</main>

      {pathname !== "/" && pathname !== "/home" && <Footer />}
      {/* Used to prevent the mai footer from appearing in the home page */}
    </div>
  );
};

export default CustomerLayout;
