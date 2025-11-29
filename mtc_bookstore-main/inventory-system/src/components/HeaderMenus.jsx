import {
  Collapse,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import { FaSearch, FaThLarge, FaBell, FaCog } from "react-icons/fa";
import { Link } from "react-router";
import { useUser } from "../features/auth/authHooks/useUser";
import { useImage } from "../hooks/useImage";

function HeaderMenus({ isOpen, dropdownOpen, toggleDropdown }) {
  const { isLoading, user, isAuthenticated } = useUser();

  const { avatar, fullname, role } = user || {};
  const { data: avatarUrl } = useImage(avatar);
  return (
    <Collapse isOpen={isOpen} navbar className="justify-content-end">
      <Nav navbar style={{ marginLeft: "auto" }}>
        <NavItem>
          <Link
            to="/profile"
            className="nav-link"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <img
              src={avatarUrl || avatar || "/assets/default-avatar.png"}
              alt="Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #376453",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#333",
                  lineHeight: "1.2",
                }}
              >
                {fullname}
              </span>
              <span
                style={{ fontSize: "12px", color: "#888", lineHeight: "1.2" }}
              >
                {role}
              </span>
            </div>
          </Link>
        </NavItem>
      </Nav>
    </Collapse>
  );
}

export default HeaderMenus;
