import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import UserService from '../../../services/UserService';
import { urlImage } from '../../../config';

const CustomerDetail = () => {
    const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      const result = await UserService.show(id);
      setUser(result.user);
    })();
  }, [id]);
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="fs-4">Chi tiết khách hàng</strong>
          </div>
          <div className="col-6 text-end">
            <Link
              to="/admin/customer"
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
              <input className="form-control" value={user?.id} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Họ và tên</strong>
              </label>
              <input className="form-control" value={user?.name} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Tên đăng nhập</strong>
              </label>
              <input className="form-control" value={user?.username} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Mật khẩu</strong>
              </label>
              <input className="form-control" value={user?.password} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Email</strong>
              </label>
              <input className="form-control" value={user?.email} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Số điện thoại</strong>
              </label>
              <input className="form-control" value={user?.phone} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Giới tính</strong>
              </label>
              <input
                className="form-control"
                value={user?.gender === 1 ? "Nam" : "Nữ"}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label me-3">
                <strong>Ảnh:</strong>
              </label>
              <img src={`${urlImage}/user/${user?.image}`} alt={user?.name} width={300} />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Địa chỉ</strong>
              </label>
              <input className="form-control" value={user?.address}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Trạng thái</strong>
              </label>
              <input className="form-control" value={user?.status === 1 ? 'Xuất bản' : 'Chưa xuất bản'}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>ID người tạo</strong>
              </label>
              <input className="form-control" value={user?.created_by}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Ngày tạo</strong>
              </label>
              <input className="form-control" value={user?.created_at}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>ID người cập nhật</strong>
              </label>
              <input className="form-control" value={user?.updated_by}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Ngày cập nhật</strong>
              </label>
              <input className="form-control" value={user?.updated_at}readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDetail