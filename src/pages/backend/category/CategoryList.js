import React, { useEffect, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import CategoryService from "../../../services/CategoryService";
import { urlImage } from "../../../config";
import { IoEye } from "react-icons/io5";
const CategoryList = () => {
  const [category, setCategory] = useState([]);
  const [insertId, setInsertId] = useState();
  const [data, setData] = useState({
    name: "",
    parent_id: 0,
    sort_order: "",
    description: "",
    status: 1,
  });

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Bạn có chắc chắn muốn xóa danh mục này?"
      );
      if (confirmed === true) {
        await CategoryService.delete(id);
        setCategory(category.filter((b) => b.id !== id));
        toast.success("Xóa thành công!"); // Hiển thị thông báo thành công
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi khi xóa."); // Hiển thị thông báo lỗi
    }
  };

  useEffect(() => {
    (async () => {
      const result = await CategoryService.get_list();
      setCategory(result.category);
    })();
  }, [insertId]);

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
    category.append("image", image.files.length === 0 ? null : image.files[0]);
    //Service them
    (async () => {
      const result = await CategoryService.store(category);
      if (result.status === true) {
        toast.success("Thêm thành công");
        setInsertId(result.category.insertId);
        setData({
          name: "",
          parent_id: 0,
          sort_order: 0,
          description: "",
          status: 1,
        });
        image.value = null;
      } else {
        toast.error("Thêm thất bại");
      }
    })();
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="fs-4">Danh mục</strong>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={handleSubmit}>
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
              <div className="text-end">
                <button type="submit" className="btn btn-sm btn-success">
                  <FaSave className="me-1" />
                  Lưu[Thêm]
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-8 mt-2">
                <span className="px-1 " style={{ borderRight: "1px solid" }}>
                  Tất cả(123)
                </span>
                <span className="px-1 " style={{ borderRight: "1px solid" }}>
                  Xuất bản(12)
                </span>
                <span className="px-1 ">Rác(1)</span>
              </div>
              <div className="col-md-4 text-end pb-2">
                <form class="d-flex" role="search">
                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button class="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
            <table class="table mb-0 table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    <input type="checkbox" />
                  </th>
                  <th scope="col" style={{ width: "100px" }}>
                    Hình ảnh
                  </th>
                  <th scope="col">Tên thương hiệu</th>
                  <th scope="col">Tên slug</th>
                  <th scope="col">Chức năng</th>
                  <th scope="col">ID</th>
                </tr>
              </thead>
              <tbody>
                {category.length > 0 &&
                  category.map((category, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row" className="text-center">
                          <input type="checkbox" />
                        </th>
                        <td>
                          <img
                            className="img-fluid"
                            src={`${urlImage}categories/${category.image}`}
                            alt={category.name}
                          />
                        </td>
                        <td>{category.name}</td>
                        <td>{category.slug}</td>
                        <td>
                          <div className="mt-2">
                          <Link
                              className="btn btn-sm btn-success me-2 mb-1"
                              to={"/admin/category/show/" + category.id}
                            >
                              <IoEye className="m-1 fs-5" />
                              Show
                            </Link>
                            <Link
                              className="btn btn-sm btn-warning me-2 mb-1"
                              to={"/admin/category/edit/" + category.id}
                            >
                              <FaEdit className="m-1 fs-5" />
                              Edit
                            </Link>
                            <button
                              onClick={() => {
                                handleDelete(category.id);
                              }}
                              className="btn btn-sm btn-danger mb-1"
                            >
                              <MdDelete className="m-1 fs-5" />
                              Delete
                            </button>
                          </div>
                        </td>
                        <td>{category.id}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
