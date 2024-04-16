import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import ProductService from '../../../services/ProductService';
import { urlImage } from '../../../config';

const ProductDetail = () => {
    const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    (async () => {
      const result = await ProductService.show(id);
      setProduct(result.product);
    })();
  }, [id]);
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="fs-4">Chi tiết sản phẩm</strong>
          </div>
          <div className="col-6 text-end">
            <Link
              to="/admin/product"
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
              <input className="form-control" value={product?.id} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Danh mục</strong>
              </label>
              <input className="form-control" value={product?.category_name} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Thương hiệu</strong>
              </label>
              <input className="form-control" value={product?.brand_name} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Tên sản phẩm</strong>
              </label>
              <input className="form-control" value={product?.name} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Slug</strong>
              </label>
              <input className="form-control" value={product?.slug} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Chi tiết</strong>
              </label>
              <textarea className="form-control" rows={5} value={product?.detail}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Mô tả</strong>
              </label>
              <textarea className="form-control" rows={5} value={product?.description}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label me-3">
                <strong>Ảnh:</strong>
              </label>
              <img src={`${urlImage}/products/${product?.image}`} alt={product?.name} width={300} />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Giá</strong>
              </label>
              <input className="form-control" value={product?.price}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Giá khuyến mãi</strong>
              </label>
              <input className="form-control" value={product?.pricesale}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Số lượng</strong>
              </label>
              <input className="form-control" value={product?.qty}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Trạng thái</strong>
              </label>
              <input className="form-control" value={product?.status === 1 ? 'Xuất bản' : 'Chưa xuất bản'}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>ID người tạo</strong>
              </label>
              <input className="form-control" value={product?.created_by}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Ngày tạo</strong>
              </label>
              <input className="form-control" value={product?.created_at}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>ID người cập nhật</strong>
              </label>
              <input className="form-control" value={product?.updated_by}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Ngày cập nhật</strong>
              </label>
              <input className="form-control" value={product?.updated_at}readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail