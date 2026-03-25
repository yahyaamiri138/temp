import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import type { AppDispatch } from "../app/stores";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import "../CSS/Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header d-lg-none">
        <Button className="menu-btn" onClick={toggleSidebar}>
          <i className="mdi mdi-menu"></i>
        </Button>
        <h5 className="header-title">{t("sidebar.adminPanel")}</h5>
      </div>

      <div className="mobile-spacer d-lg-none" />

      {isOpen && (
        <div className="mobile-overlay d-lg-none" onClick={closeSidebar} />
      )}

      <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-container">
          <div className="sidebar-header sidebar-border">
            <h5>{t("sidebar.adminPanel")}</h5>
            <Button className="close-btn d-lg-none" onClick={closeSidebar}>
              <i className="mdi mdi-close"></i>
            </Button>
          </div>

          <div className="sidebar-menu">
            {/* <ul>
              <li>
                <Link
                  to="/dashboard"
                  className={location.pathname === "/dashboard" ? "active" : ""}
                  onClick={closeSidebar}
                >
                  <i className="mdi mdi-view-dashboard mr-2 ml-2" />
                  {t("sidebar.dashboard")}
                </Link>
              </li>

              <li>
                <Link
                  to="/users"
                  className={location.pathname === "/users" ? "active" : ""}
                  onClick={closeSidebar}
                >
                  <i className="mdi mdi-account mr-2 ml-2" />
                  {t("sidebar.users")}
                </Link>
              </li>

              <li>
                <Link
                  to="/reports"
                  className={location.pathname === "/reports" ? "active" : ""}
                  onClick={closeSidebar}
                >
                  <i className="mdi mdi-poll mr-2 ml-2" />
                  {t("sidebar.reports")}
                </Link>
              </li>
            </ul> */}
            <ul>
              <li>
                <Link
                  to="/dashboard"
                  className={location.pathname === "/dashboard" ? "active" : ""}
                  onClick={closeSidebar}
                >
                  <i className="mdi mdi-view-dashboard mr-2 ml-2" />
                  {t("sidebar.dashboard")}
                </Link>
              </li>

              <li>
                <Link
                  to="/users"
                  className={location.pathname === "/users" ? "active" : ""}
                  onClick={closeSidebar}
                >
                  <i className="mdi mdi-account mr-2 ml-2" />
                  {t("sidebar.users")}
                </Link>
              </li>

              {/* ✅ PRODUCTS */}
              <li>
                <Link
                  to="/products"
                  className={location.pathname === "/products" ? "active" : ""}
                  onClick={closeSidebar}
                >
                  <i className="mdi mdi-cube-outline mr-2 ml-2" />
                  {t("sidebar.products")}
                </Link>
              </li>

              {/* ✅ CATEGORIES */}
              <li>
                <Link
                  to="/categories"
                  className={
                    location.pathname === "/categories" ? "active" : ""
                  }
                  onClick={closeSidebar}
                >
                  <i className="mdi mdi-format-list-bulleted mr-2 ml-2" />
                  {t("sidebar.categories")}
                </Link>
              </li>

              <li>
                <Link
                  to="/reports"
                  className={location.pathname === "/reports" ? "active" : ""}
                  onClick={closeSidebar}
                >
                  <i className="mdi mdi-poll mr-2 ml-2" />
                  {t("sidebar.reports")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="sidebar-footer sidebar-border">
            <Button
              onClick={() => {
                handleLogout();
                closeSidebar();
              }}
              className="logout-btn"
            >
              <i className="mdi mdi-logout mr-2 ml-2" />
              {t("sidebar.logout")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
