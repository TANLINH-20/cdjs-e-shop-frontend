import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import UserService from "../../../services/UserService";
import { toast } from "react-hot-toast";

const UserEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id từ URL
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    name: "",
    gender: "1",
    roles: "1",
    address: "",
    status: "1",
    image: "",
  });

  useEffect(() => {
    (async () => {
      const result = await UserService.show(id);
      if (result.status) {
        setData(result.user);
      } else {
        toast.error("Không tìm thấy thành viên");
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
    const user = new FormData();
    user.append("username", data.username);
    user.append("password", data.password);
    user.append("email", data.email);
    user.append("phone", data.phone);
    user.append("name", data.name);
    user.append("gender", data.gender);
    user.append("roles", data.roles);
    user.append("address", data.address);
    user.append("status", data.status);
    user.append("image", image.files.length === 0 ? data.image : image.files[0]);
    //Service them
    (async () => {
      const result = await UserService.update(id,user);
      if (result.status === true) {
        toast.success("Cập nhật thành công");
        setData({
          username: "",
          password: "",
          email: "",
          phone: "",
          name: "",
          gender: "1",
          roles: "1",
          address: "",
          status: "1",
        });
        image.value = null;
        navigate("/admin/user"); //chuyen trang
      } else {
        console.log(result);
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
              <strong className="fs-4">Sửa thành viên</strong>
            </div>
            <div className="col-6 text-end">
              <Link
                to="/admin/user"
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
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="inputUserName" className="form-label">
                  <strong>Tên đăng nhập (*)</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputUserName"
                  name="username"
                  value={data.username || ""}
                  onChange={handleChange}
                  placeholder="Tên đăng nhập"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">
                  <strong>Mật khẩu (*)</strong>
                </label>
                <input
                  type="text"
                  id="inputPassword"
                  className="form-control"
                  name="password"
                  value={data.password || ""}
                  onChange={handleChange}
                  placeholder="Mật khẩu"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">
                  <strong>Email (*)</strong>
                </label>
                <input
                  type="email"
                  id="inputEmail"
                  className="form-control"
                  name="email"
                  value={data.email || ""}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputPhone" className="form-label">
                  <strong>Điện thoại (*)</strong>
                </label>
                <input
                  type="text"
                  id="inputPhone"
                  className="form-control"
                  name="phone"
                  value={data.phone || ""}
                  onChange={handleChange}
                  placeholder="Điện thoại"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="inputName" className="form-label">
                  <strong>Họ tên (*)</strong>
                </label>
                <input
                  type="text"
                  id="inputName"
                  className="form-control"
                  name="name"
                  value={data.name || ""}
                  onChange={handleChange}
                  placeholder="Họ tên"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <strong>Giới tính</strong>
                </label>
                <select
                  className="form-select"
                  name="gender"
                  value={data.gender}
                  onChange={handleChange}
                >
                  <option value="1">Nam</option>
                  <option value="0">Nữ</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="inputAddress" className="form-label">
                  <strong>Địa chỉ (*)</strong>
                </label>
                <input
                  type="text"
                  name="address"
                  value={data.address || ""}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Địa chỉ"
                  id="inputAddress"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <strong>Hình ảnh đại diện (*)</strong>
                </label>
                <input
                  type="file"
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

export default UserEdit;
