import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TbPlus } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import UserService from "../../../services/UserService";
import { toast } from "react-hot-toast";
import { urlImage } from "../../../config";
import { IoEye } from "react-icons/io5";
const UserList = () => {
  const [user, setUser] = useState([]);
  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Bạn có chắc chắn muốn xóa thành viên này?");
      if (confirmed === true) {
        await UserService.delete(id);
        setUser(user.filter((b) => b.id !== id));
        toast.success('Xóa thành công!'); // Hiển thị thông báo thành công
      }
    } catch (error) {
      console.log(error);
      toast.error('Đã xảy ra lỗi khi xóa.'); // Hiển thị thông báo lỗi
    }
  };
  useEffect(() => {
    (async () => {
      const result = await UserService.get_list();
      setUser(result.user);
    })();
  }, []);
  const filteredUsers = user.filter(user => user.roles === 1)
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-danger">Tất cả thành viên</strong>
          </div>
          <div className="col-6 text-end">
            <Link className="btn btn-sm btn-success" to="/admin/user/create">
              <TbPlus className="me-1" />
              Thêm thành viên
            </Link>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        <table class="table mb-0 table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">
                <input type="checkbox" />
              </th>
              <th scope="col" style={{ width: "100px" }}>
                Hình ảnh
              </th>
              <th scope="col">Tên thành viên</th>
              <th scope="col">Email</th>
              <th scope="col">Giới tính</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Chức năng</th>
              <th scope="col">ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 &&
              filteredUsers.map((user, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">
                      <input type="checkbox" />
                    </th>
                    <td>
                      <img
                        className="img-fluid"
                        src={`${urlImage}user/${user.image}`}
                        alt={user.name}
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.gender?"Nam":"Nữ"}</td>
                    <td>{user.address}</td>
                    <td>
                    <Link
                        className="btn btn-sm btn-success me-2 mb-1"
                        to={"/admin/user/show/" + user.id}
                      >
                        <IoEye className="m-1 fs-5" />
                        Show
                      </Link>
                      <Link
                        className="btn btn-sm btn-warning me-2 mb-1"
                        to={"/admin/user/edit/" + user.id}
                      >
                        <FaEdit className="m-1 fs-5" />
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(user.id)}
                      className="btn btn-sm btn-danger mb-1">
                        <MdDelete className="m-1 fs-5" />
                        Delete
                      </button>
                    </td>
                    <td>{user.id}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
