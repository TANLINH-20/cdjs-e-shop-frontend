import React from "react";
import { Link } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";
const Header = () => {
  return (
    <section className="header bg-dark position-sticky top-0 w-100 z-1">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/admin">
              Dashboard
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/admin"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sản phẩm
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/admin/product">
                        Tất cả sản phẩm
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/admin/category">
                        Danh mục
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/admin/brand">
                        Thương hiệu
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/admin"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Bài viết
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/admin/post">
                        Tất cả bài viết
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/admin/topic">
                        Chủ đề bài viết
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/admin/page">
                        Trang đơn
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/order">
                    Đơn hàng
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/customer">
                    Khách hàng
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/contact">
                    Liên hệ
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/admin"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Giao diện
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/admin/menu">
                        Menu
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/admin/banner">
                        Banner
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/user">
                    Thành viên
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/logout">
                    Logout
                    <FaPowerOff className="ms-1 mb-1"/>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Header;
