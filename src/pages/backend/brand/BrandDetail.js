import React, { useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import BrandService from '../../../services/BrandService'
import { urlImage } from '../../../config'

const BrandDetail = () => {
    const [brand, setBrand] = React.useState([])
    const {id} = useParams()
    useEffect(() => {
         (async ()=>{
            const result = await BrandService.show(id);
            setBrand(result.brand)
         })();
    },[id])
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="fs-4">Chi tiết thương hiệu</strong>
          </div>
          <div className="col-6 text-end">
            <Link
              to="/admin/brand"
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
              <input className="form-control" value={brand?.id}readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>Tên thương hiệu</strong>
                </label>
                <input className="form-control" value={brand?.name}readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>Slug</strong>
                </label>
                <input className="form-control" value={brand?.slug}readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>Mô tả</strong>
                </label>
                <textarea className="form-control" rows={3} value={brand?.description}readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>Thứ tự</strong>
                </label>
                <input className="form-control" value={brand?.sort_order}readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label me-3">
                    <strong>Ảnh:</strong>
                </label>
                <img src={`${urlImage}brand/${brand?.image}`} alt={brand.name} className="img-fluid w-100" />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>Trạng thái</strong>
                </label>
                <input className="form-control" value={brand?.status === 1 ? 'Xuất bản' : 'Chưa xuất bản'}readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>ID người tạo</strong>
                </label>
                <input className="form-control" value={brand?.created_by}readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>Ngày tạo</strong>
                </label>
                <input className="form-control" value={brand?.created_at}readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>ID người cập nhật</strong>
                </label>
                <input className="form-control" value={brand?.updated_by}readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>Ngày cập nhật</strong>
                </label>
                <input className="form-control" value={brand?.updated_at}readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandDetail