import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuService from "../../../services/MenuService";

const MainMenuItem = (props) => {
  const menu = props.menu;
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await MenuService.mainmenu(menu.id,"mainmenu",2);
      setMenus(result.menus);
    })();
  }, [menu.id]);
  if(menus && menus.length > 0){
    return(
        <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle text-dark "
          to="/"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {menu.name}
        </Link>
        <ul className="dropdown-menu">
            {menus.map((menusub, index) => {
                return (
                    <li key={index}>
                        <Link className="dropdown-item" to={`/${menusub.link}`}>
                          {menusub.name}
                        </Link>
                    </li>
                );
            })}
          
        </ul>
      </li>
    );
  }else{
    return (
        <>
          <li className="nav-item">
            <Link
              className="nav-link active text-dark"
              aria-current="page"
              to={menu.link}
            >
              {menu.name}
            </Link>
          </li>
        </>
      );
  }
  
};

export default MainMenuItem;
