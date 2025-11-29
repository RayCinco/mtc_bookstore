import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaUser, FaShoppingBag, FaEnvelope } from "react-icons/fa";
import Header from "../components/Header";

function Account() {
  const location = useLocation();
  const isOrdersRoute = location.pathname.includes("/account/orders");
  const isMessagesRoute = location.pathname.includes("/account/messages");

  return (
    <>
      <Header title="My Account" showBreadcrumb={true} />
      <div className="container-fluid pt-4 pb-5">
        <div className="container">
          {/* Top Navigation Tabs */}
          <div className="row mb-4">
            <div className="col-12">
              <ul
                className="nav nav-pills"
                style={{
                  backgroundColor: "transparent",
                  padding: "0",
                  gap: "20px",
                }}
              >
                <li className="nav-item">
                  <NavLink
                    to="/account"
                    end
                    className={({ isActive }) =>
                      `btn ${
                        isActive ? "btn-primary" : "btn-light"
                      } d-flex align-items-center justify-content-center`
                    }
                    style={{
                      fontWeight: "500",
                      padding: "14px 32px",
                      fontSize: "15px",
                    }}
                  >
                    <FaUser className="mr-2" size={14} />
                    Account Details
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/account/orders"
                    className={({ isActive }) =>
                      `btn ${
                        isActive || isOrdersRoute ? "btn-primary" : "btn-light"
                      } d-flex align-items-center justify-content-center`
                    }
                    style={{
                      fontWeight: "500",
                      padding: "14px 32px",
                      fontSize: "15px",
                    }}
                  >
                    <FaShoppingBag className="mr-2" size={14} />
                    My Orders
                  </NavLink>
                </li>

                {/* NEW MESSAGES TAB */}
                <li className="nav-item">
                  <NavLink
                    to="/account/messages"
                    className={({ isActive }) =>
                      `btn ${
                        isActive || isMessagesRoute
                          ? "btn-primary"
                          : "btn-light"
                      } d-flex align-items-center justify-content-center`
                    }
                    style={{
                      fontWeight: "500",
                      padding: "14px 32px",
                      fontSize: "15px",
                    }}
                  >
                    <FaEnvelope className="mr-2" size={14} />
                    Messages
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Content Area */}
          <div className="row">
            <div className="col-12">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
