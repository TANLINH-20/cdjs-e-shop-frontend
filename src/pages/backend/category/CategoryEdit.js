import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { toast } from "react-hot-toast";
import CategoryService from "../../../services/CategoryService";

const CategoryEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id từ URL

  const [category, setCategory] = useState([]);
  
  const [data, setData] = useState({
    name: "",
    parent_id: 0,
    sort_order: "",
    description: "",
    status: 1,
    image: "",
  });

  useEffect(() => {
    (async () => {
      const listCate = await CategoryService.get_list();
      setCategory(listCate.category);
      const result = await CategoryService.show(id);
      if (result.status) {
        setData(result.category);
      } else {
        toast.error("Không tìm thấy thương hiệu");
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
    const category = new FormData();
    category.append("name", data.name);
    category.append("parent_id", data.parent_id);
    category.append("sort_order", data.sort_order);
    category.append("description", data.description);
    category.append("status", data.status);
    category.append(
      "image",
      image.files.length === 0 ? data.image : image.files[0]
    );

    (async () => {
      const result = await CategoryService.update(id, category);
      if (result.status === true) {
        toast.success("Cập nhật thành công");
        navigate("/admin/category");
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
              <strong className="fs-4">Sửa danh mục</strong>
            </div>
            <div className="col-6 text-end">
              <Link
                to="/admin/category"
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
            <div className="col-md">
              <div className="mb-3">
                <label htmlFor="inputName" className="form-label">
                  <strong>Tên danh mục (*)</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  name="name"
                  value={data.name || ""}
                  onChange={handleChange}
                  placeholder="Nhập tên danh mục"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputDes" className="form-label">
                  <strong>Mô tả (*)</strong>
                </label>
                <textarea
                  rows={4}
                  id="inputDes"
                  name="description"
                  value={data.description || ""}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Nhập mô tả"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="sort_order" className="form-label">
                  <strong>Thứ tự</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sort_order"
                  name="sort_order"
                  value={data.sort_order}
                  onChange={handleChange}
                  placeholder="Nhập thứ tự"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <strong>Danh mục cha</strong>
                </label>
                <select
                  className="form-select"
                  name="parent_id"
                  value={data.parent_id}
                  onChange={handleChange}
                >
                  <option value="0">Cấp 0</option>
                  {category.length > 0 &&
                    category.map((category) => {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <strong>Hình ảnh đại diện (*)</strong>
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

export default CategoryEdit;
