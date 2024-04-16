import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TbPlus } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import UserService from "../../../services/UserService";
import { toast } from "react-hot-toast";
import { urlImage } from "../../../config";
import { IoEye } from "react-icons/io5";
const CustomerList = () => {
  const [user, setUser] = useState([]);
  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?");
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

  const filteredCustomers = user.filter(u => u.roles === 0)

  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-danger">Tất cả khách hàng</strong>
          </div>
          <div className="col-6 text-end">
            <Link className="btn btn-sm btn-success" to="/admin/customer/create">
              <TbPlus className="me-1" />
              Thêm khách hàng
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
              <th scope="col">Tên khách hàng</th>
              <th scope="col">Email</th>
              <th scope="col">Giới tính</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Chức năng</th>
              <th scope="col">ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 &&
              filteredCustomers.map((customer, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">
                      <input type="checkbox" />
                    </th>
                    <td>
                      <img
                        className="img-fluid"
                        src={`${urlImage}user/${customer.image}`}
                        alt={customer.name}
                      />
                    </td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.gender?"Nam":"Nữ"}</td>
                    <td>{customer.address}</td>
                    <td>
                    <Link
                        className="btn btn-sm btn-success me-2 mb-1"
                        to={"/admin/customer/show/" + customer.id}
                      >
                        <IoEye className="m-1 fs-5" />
                        Show
                      </Link>
                      <Link
                        className="btn btn-sm btn-warning me-2 mb-1"
                        to={"/admin/customer/edit/" + customer.id}
                      >
                        <FaEdit className="m-1 fs-5" />
                        Edit
                      </Link>
                      <button 
                      onClick={() => handleDelete(customer.id)}
                      className="btn btn-sm btn-danger mb-1">
                        <MdDelete className="m-1 fs-5" />
                        Delete
                      </button>
                    </td>
                    <td>{customer.id}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
