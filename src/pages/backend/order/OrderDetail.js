import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import OrderDetailService from "../../../services/OrderDetailService";
import { FaArrowLeft } from "react-icons/fa";
const OrderDetail = () => {
  const { id } = useParams();
  const [orderdetail, setOrderDetail] = useState();

  useEffect(() => {
    (async () => {
      const result = await OrderDetailService.show(id);
      setOrderDetail(result.orderdetail);
      console.log(result)
    })();
  }, [id]);

  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="fs-4">Chi tiết đơn hàng</strong>
          </div>
          <div className="col-6 text-end">
            <Link
              to="/admin/order"
              className="btn btn-sm btn-info text-white me-2"
            >
              <FaArrowLeft className="me-1" />
              Về danh sách
            </Link>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md">
            <div className="mb-3">
              <label className="form-label">
                <strong>ID</strong>
              </label>
              <input className="form-control" value={orderdetail?.id}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Mã đơn hàng</strong>
              </label>
              <input className="form-control" value={orderdetail?.order_id}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Tên sản phẩm</strong>
              </label>
              <input className="form-control" value={orderdetail?.product_name}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Giá</strong>
              </label>
              <input className="form-control" value={orderdetail?.price}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Số lượng</strong>
              </label>
              <input className="form-control" value={orderdetail?.qty}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Thành tiền</strong>
              </label>
              <input className="form-control" value={orderdetail?.amount}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Ngày tạo</strong>
              </label>
              <input className="form-control" value={orderdetail?.created_at}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Ngày cập nhật</strong>
              </label>
              <input className="form-control" value={orderdetail?.updated_at}readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
