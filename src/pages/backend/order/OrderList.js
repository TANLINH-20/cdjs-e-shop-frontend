import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import OrderService from "../../../services/OrderService";
import { toast } from "react-hot-toast";
const OrderList = () => {
  const [order, setOrder] = useState([]);
  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?");
      if (confirmed === true) {
        await OrderService.delete(id);
        setOrder(order.filter((b) => b.id !== id));
        toast.success('Xóa thành công!'); // Hiển thị thông báo thành công
      }
    } catch (error) {
      console.log(error);
      toast.error('Đã xảy ra lỗi khi xóa.'); // Hiển thị thông báo lỗi
    }
  };
  useEffect(() => {
    (async () => {
      const result = await OrderService.get_list();
      setOrder(result.order);
    })();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-danger">Tất cả đơn hàng</strong>
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
              <th scope="col">Tên khách hàng</th>
              <th scope="col">Địa chỉ người nhận</th>
              <th scope="col">Tên người nhận</th>
              <th scope="col">Điện thoại người nhận</th>
              <th scope="col">Email người nhận</th>
              <th scope="col">Chức năng</th>
              <th scope="col">ID</th>
            </tr>
          </thead>
          <tbody>
            {order.length > 0 &&
              order.map((order, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">
                      <input type="checkbox" />
                    </th>
                    <td>{order.name}</td>
                    <td>{order.deliveryaddress}</td>
                    <td>{order.deliveryname}</td>
                    <td>{order.deliveryphone}</td>
                    <td>{order.deliveryemail}</td>
                    <td>
                      <Link
                        className="btn btn-sm btn-success me-2 mb-1"
                        to={"/admin/order/show/" + order.id}
                      >
                        <IoEye className="m-1 fs-5" />
                        Show
                      </Link>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="btn btn-sm btn-danger mb-1">
                        <MdDelete className="m-1 fs-5" />
                        Delete
                      </button>
                    </td>
                    <td>{order.id}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
