import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { toast } from "react-hot-toast";
import BannerService from "../../../services/BannerService";
const BannerCreate = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    link: "",
    sort_order: "",
    position: "slideshow",
    status: "1",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const image = document.querySelector("#image");
    const banner = new FormData();
    banner.append("name", data.name);
    banner.append("link", data.link);
    banner.append("sort_order", data.sort_order);
    banner.append("position", data.position);
    banner.append("status", data.status);
    banner.append("image",image.files.length === 0 ? null : image.files[0]);
    //Service them
    (async () => {
      const result = await BannerService.store(banner);
      if (result.status === true) {
        toast.success("Thêm thành công");
        setData({
          name: "",
          link: "",
          sort_order: "",
          position: "slideshow",
          status: "1",
        });
        image.value = null;
        navigate("/admin/banner"); // Chuyển hướng về trang "/admin/banner"
      } else {
        toast.error("Thêm thất bại");
      }
    })();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <strong className="fs-4">Thêm banner</strong>
            </div>
            <div className="col-6 text-end">
              <Link
                to="/admin/banner"
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
                  <strong>Tên banner (*)</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  name="name"
                  value={data.name || ""}
                  onChange={handleChange}
                  placeholder="Nhập tên banner"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputLink" className="form-label">
                  <strong>Liên kết</strong>
                </label>
                <input
                  type="text"
                  id="inputLink"
                  className="form-control"
                  name="inputLink"
                  value={data.link || ""}
                  placeholder="Nhập liên kết"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="sort_order" className="form-label">
                  <strong>Thứ tự (*)</strong>
                </label>
                <input
                  type="text"
                  id="sort_order"
                  className="form-control"
                  name="sort_order"
                  value={data.sort_order || ""}
                  placeholder="Nhập thứ tự"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="position" className="form-label">
                  <strong>Vị trí (*)</strong>
                </label>
                <input
                  type="text"
                  id="position"
                  className="form-control"
                  name="position"
                  value={data.position || ""}
                  placeholder="Nhập vị trí(slideshow)"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <strong>Hình ảnh (*)</strong>
                </label>
                <input
                  type="file"
                  onChange={handleChange}
                  className="form-control"
                  id="image"
                />
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

export default BannerCreate;
