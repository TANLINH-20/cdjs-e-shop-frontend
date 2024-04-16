import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import MenuService from "../../../services/MenuService";
import { toast } from "react-hot-toast";
const MenuCreate = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [data, setData] = useState({
    name: "",
    link: "",
    type: "",
    position: "",
    level: "",
    parent_id: "",
    sort_order: "",
    status: "1",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const menu = new FormData();
    menu.append("name", data.name);
    menu.append("link", data.link);
    menu.append("type", data.type);
    menu.append("position", data.position);
    menu.append("level", data.level);
    menu.append("parent_id", data.parent_id);
    menu.append("sort_order", data.sort_order);
    menu.append("status", data.status);
    //Service them
    (async () => {
      const result = await MenuService.store(menu);
      if (result.status === true) {
        toast.success("Thêm thành công");
        setData({
          name: "",
          link: "",
          type: "",
          position: "",
          level: "",
          parent_id: "",
          sort_order: "",
          status: "1",
        });
        navigate("/admin/menu"); //chuyen trang
      } else {
        toast.error("Thêm thất bại");
      }
    })();
  };

  useEffect(() => {
    (async () => {
      const listMenu = await MenuService.get_list();
      setMenu(listMenu.menu);
    })();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <strong className="fs-4">Thêm menu</strong>
            </div>
            <div className="col-6 text-end">
              <Link
                to="/admin/menu"
                className="btn btn-sm btn-info text-white me-2"
              >
                <FaArrowLeft className="me-1" />
                Về danh sách
              </Link>

              <button type="submit" className="btn btn-sm btn-success">
                <FaSave className="me-1" />
                Lưu
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-9">
              <div className="mb-3">
                <label htmlFor="inputName" className="form-label">
                  <strong>Tên menu (*)</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  name="name"
                  value={data.name || ""}
                  onChange={handleChange}
                  placeholder="Nhập tên menu"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputLink" className="form-label">
                  <strong>Link (*)</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputLink"
                  name="link"
                  value={data.link || ""}
                  onChange={handleChange}
                  placeholder="Nhập link"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputType" className="form-label">
                  <strong>Loại menu (*)</strong>
                </label>
                <select className="form-select" name="type" value={data.type} onChange={handleChange}>
                  <option >chọn menu</option>
                  <option value="custom">custom</option>
                  <option value="page">page</option>
                  <option value="category">category</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="inputPosition" className="form-label">
                  <strong>Vị trí (*)</strong>
                </label>
                <select className="form-select" name="position" value={data.position} onChange={handleChange}>
                  <option >chọn vị trí</option>
                  <option value="mainmenu">mainmenu</option>
                  <option value="footermenu">footermenu</option>
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="inputSortOrder" className="form-label">
                  <strong>Thứ tự (*)</strong>
                </label>
                <input className="form-control" type="number" name="sort_order" value={data.sort_order} onChange={handleChange} placeholder="Nhập thứ tự" required />
              </div>
              <div className="mb-3">
                <label htmlFor="inputLevel" className="form-label">
                  <strong>Cấp menu (*)</strong>
                </label>
                <select className="form-select" name="level" value={data.level} onChange={handleChange}>
                  <option>chọn cấp menu</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="inputParentId" className="form-label">
                  <strong>Chọn menu cha (*)</strong>
                </label>
                <select className="form-select" name="parent_id" value={data.parent_id} onChange={handleChange}>
                  {menu && menu.length > 0 && menu.map((menu) => (
                    <option key={menu.id} value={menu.id}>
                      {menu.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <strong>Trạng thái</strong>
                </label>
                <select
                  className="form-select"
                  name="status"
                  value={data.status}
                  onChange={handleChange}
                >
                  <option value="1">Xuất bản</option>
                  <option value="2">Chưa xuất bản</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MenuCreate;
