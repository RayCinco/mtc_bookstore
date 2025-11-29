import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Nav } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";
import { useEffect } from "react";
import { useUser } from "../features/auth/authHooks/useUser";
import Logout from "../features/auth/Logout";
var ps;

function Sidebar(props) {
  const { isLoading, user } = useUser();
  const { role } = user || {};
  const location = useLocation();
  const sidebar = React.useRef();

  // Direct routes definition for inventory system
  const routes = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: "fas fa-tachometer-alt",
    },
    {
      path: "/products",
      name: "Products",
      icon: "fas fa-boxes",
    },
    {
      path: "/orders",
      name: "Orders",
      icon: "fas fa-shopping-cart",
    },
    {
      path: "/customers",
      name: "Customers",
      icon: "fas fa-user-friends",
    },
    {
      path: "/users",
      name: "Users",
      icon: "fas fa-users",
    },
    {
      path: "/profile",
      name: "Profile",
      icon: "fas fa-user-cog",
    },
  ];

  const filteredRoutes = routes.filter((route) => {
    if (route.name === "Users" && role !== "admin") {
      return false;
    }
    return true;
  });

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  return (
    <div
      className="greensidebar"
      data-color="green"
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <a href="/" className="simple-text logo-mini">
          <div className="logo-img">
            <i
              className="fas fa-store"
              style={{ fontSize: "30px", color: "#fff" }}
            />
          </div>
        </a>
        <a href="/" className="simple-text logo-normal">
          TYBOOK INVENTORY
        </a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {filteredRoutes.map((route, key) => {
            return (
              <li className={activeRoute(route.path)} key={key}>
                <NavLink to={route.path} className="nav-link">
                  <i className={route.icon} />
                  <p>{route.name}</p>
                </NavLink>
              </li>
            );
          })}
          <li>
            <Logout className="nav-link">
              <i className="fas fa-sign-out-alt" />
              <p>Logout</p>
            </Logout>
          </li>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
