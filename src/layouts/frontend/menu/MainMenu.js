import React, { useEffect, useState } from "react";
import MenuService from "../../../services/MenuService";
import MainMenuItem from "./MainMenuItem";
import Logo from "../../../assets/logo_tanlinh_clother-01.png";
import { Link, useNavigate } from "react-router-dom";
import SearchProduct from "../search/SearchProduct";
import { useCart } from "../../../utils/Cart";
import { FaShoppingBag } from "react-icons/fa";

const MainMenu = () => {
  const [menus, setMenus] = useState([]);
  const { cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const result = await MenuService.mainmenu(0, "mainmenu", 1);
      setMenus(result.menus);
    })();
  }, []);
  return (
    <nav className="navbar navbar-expand-lg bg-white">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={Logo} className="" width={130} alt="logo" />
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            {menus &&
              menus.length > 0 &&
              menus.map((menu, index) => {
                return <MainMenuItem key={index} menu={menu} />;
              })}
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0 me-auto">
            <li className="nav-item">
              <SearchProduct />
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0 me-5">
            <li className="nav-item">
              <li className="nav-item">
                <div
                  onClick={() => {
                    navigate("/gio-hang");
                  }}
                  className="btn btn-outline-dark position-relative fs-4"
                >
                  <FaShoppingBag className="fs-1"/>
                  <div className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.length}
                  </div>
                </div>
              </li>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainMenu;
