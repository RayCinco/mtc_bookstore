import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";

function AppLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "black",
      }}
    >
      <TopNav />
      <main
        style={{
          paddingTop: "70px", // Account for fixed header height
          minHeight: "calc(100vh - 70px)",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
