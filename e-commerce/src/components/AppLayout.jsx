import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Topbar from "./Topbar";
import BackToTop from "./BackToTop";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <main>
        <Outlet />
      </main>             
      <BackToTop />
      <Footer />
    </div>
  );
}

export default AppLayout;
