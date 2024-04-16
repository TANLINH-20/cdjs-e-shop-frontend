import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { toast } from "react-hot-toast";
import BannerService from "../../../services/BannerService";

const BannerEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id từ URL

  const [data, setData] = useState({
    name: "",
    link: "",
    image: "",
    sort_order: 0,
    position: "slideshow",
    status: "1",
  });

  useEffect(() => {
    (async () => {
      const result = await BannerService.show(id);
      if (result.status) {
        setData(result.banner);
      } else {
        toast.error("Không tìm thấy banner");
      }
    })();
  }, [id]);

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
    banner.append("image", image.files.length === 0 ? data.image : image.files[0]);

    (async () => {
      const result = await BannerService.update(id, banner);
      if (result.status === true) {
        toast.success("Cập nhật thành công");
        navigate("/admin/banner");
      } else {
        toast.error("Cập nhật thất bại");
      }
    })();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <strong className="fs-4">Sửa banner</strong>
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
                  name="link"
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
                  placeholder="Nhập vị trí (slideshow)"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="selectImg" className="form-label">
                  <strong>Hình ảnh (*)</strong>
                </label>
                <input
                  type="file"
                  name="img"
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

export default BannerEdit;