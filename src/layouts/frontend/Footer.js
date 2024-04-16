import { Link } from "react-router-dom";
import Logo_ft from "../../assets/logo_tanlinh_clother-01.png";
import { FaLocationDot, FaPhoneVolume } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { useEffect, useState } from "react";
import MenuService from "../../services/MenuService";
const Footer = () => {
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await MenuService.mainmenu(0, "footermenu", 1);
      setMenus(result.menus);
    })();
  }, []);
  return (
    <>
      <div className="ntl-footer bg-black">
        <div className="text-center py-3">
            <img src={Logo_ft} alt="logo-footer" width={200} />
        </div>
        <div className="container-fluid d-md-flex justify-content-center align-items-center py-3">
          <div className="col-md-4 col-sm-6 me-5">
            <h5 className="text-white text-uppercase list-group">Thông tin</h5>
            <ul className="text-white-50 p-0">
              <li className="list-group-item py-2">
                <span>
                  Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến
                  đóng góp từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ
                  và sản phẩm tốt hơn nữa.
                </span>
              </li>
              <li className="list-group-item py-2">
                <span className="pe-2 fs-5">
                  <FaLocationDot />
                </span>
                <span>73H, Phường Hiệp Phú, Quận 9, TP. HCM</span>
              </li>
              <li className="list-group-item py-2">
                <span className="pe-2 fs-5">
                  <FaPhoneVolume />
                </span>
                <Link
                  className="text-decoration-none text-white-50"
                  title="0343970915"
                  to="tel:0343970915"
                >
                  0343970915
                </Link>
              </li>
              <li className="list-group-item py-2">
                <span className="pe-2 fs-5">
                  <FaPaperPlane />
                </span>
                <Link
                  className="text-decoration-none text-white-50"
                  title="linhnguyentan24@gmail.com"
                  to="mailto:linhnguyentan24@gmail.com"
                >
                  linhnguyentan24@gmail.com
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 className="text-white mb-2 text-uppercase list-group">Chính sách</h5>
            <ul className="text-white-50 p-0 text-decoration-none">
              {menus &&
                menus.length > 0 &&
                menus.map((menu) => {
                  return (
                    <li key={menu.id} className="list-group-item py-2">
                      <Link
                        to={menu.link}
                        className="pe-2 text-white-50 text-decoration-none"
                      >
                        {menu.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="col-md-4 col-sm-6 text-white">
            <h5 className="text-white text-uppercase list-group mb-2">
              Đăng kí nhận tin
            </h5>
            <div class="w-100">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control border-light-subtle shadow-none"
                  placeholder="Nhập địa chỉ Email"
                />
                <button
                  class="btn bg-white border-light-subtle btn-outline-secondary"
                  type="button"
                >
                  <GoMail />
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr className="text-white" />
        <div className="text-center text-white py-2">
          <p>Website by : Nguyễn Tấn Lĩnh</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
