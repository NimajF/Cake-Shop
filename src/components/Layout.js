import Navbar from "./Navbar";
import Footer from "./Footer";
const Layout = ({ children }) => (
  <>
    <div className="container">
      <Navbar />
      {children}
      <Footer />
    </div>
  </>
);

export default Layout;
