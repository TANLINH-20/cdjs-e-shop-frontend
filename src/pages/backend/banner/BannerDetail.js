import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import BannerService from '../../../services/BannerService';
import { urlImage } from '../../../config';

const BannerDetail = () => {
  const { id } = useParams();
  const [banner, setBanner] = useState();

  useEffect(() => {
    (async () => {
      const result = await BannerService.show(id);
      setBanner(result.banner);
    })();
  }, [id]);
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="fs-4">Chi tiết banner</strong>
          </div>
          <div className="col-6 text-end">
            <Link
              to="/admin/banner"
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
              <input className="form-control" value={banner?.id}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Tên Banner</strong>
              </label>
              <input className="form-control" value={banner?.name}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Link</strong>
              </label>
              <input className="form-control" value={banner?.link}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Vị trí</strong>
              </label>
              <input className="form-control" value={banner?.position}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label me-3">
                <strong>Ảnh:</strong>
              </label>
              <img src={`${urlImage}/banners/${banner?.image}`} alt={banner?.name} width={300} />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Thứ tự</strong>
              </label>
              <input className="form-control" value={banner?.sort_order}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Trạng thái</strong>
              </label>
              <input className="form-control" value={banner?.status === 1 ? 'Xuất bản' : 'Chưa xuất bản'}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>ID người tạo</strong>
              </label>
              <input className="form-control" value={banner?.created_by}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Ngày tạo</strong>
              </label>
              <input className="form-control" value={banner?.created_at}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>ID người cập nhật</strong>
              </label>
              <input className="form-control" value={banner?.updated_by}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Ngày cập nhật</strong>
              </label>
              <input className="form-control" value={banner?.updated_at}readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerDetail