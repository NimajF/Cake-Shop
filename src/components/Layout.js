import Navbar from "./Navbar";
const Layout = ({ children }) => (
  <>
    <Navbar />
    <main className="mainContainer" style={{ overflowX: "hidden" }}>
      <div className="container">{children}</div>
    </main>
  </>
);

export default Layout;
