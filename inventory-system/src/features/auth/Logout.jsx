import React from "react";
import { useLogout } from "./authHooks/useLogout";
import { FaSignOutAlt } from "react-icons/fa";

export default function Logout({ children, className = "", size = "sm" }) {
  const { logout, isLoading } = useLogout();

  const handleLogout = (e) => {
    e.preventDefault();
    if (!isLoading) logout();
  };

  // Render as an anchor so it matches navbar link styling
  return (
    <a
      href="#"
      role="button"
      onClick={handleLogout}
      className={className}
      aria-disabled={isLoading}
    >
      {isLoading ? "Signing out..." : children || <FaSignOutAlt />}
    </a>
  );
}
