import { useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { Link, useParams } from "react-router-dom"
import CategoryService from "../../../services/CategoryService";
import { urlImage } from "../../../config";


const CategoryDetail = () => {
    const [category, setCategory] = useState([]);
    const [category_parentID, setCategory_parentID] = useState([]);
    const {id} = useParams();
    useEffect(() =>{
        (async()=>{
            const res = await CategoryService.show(id);
            setCategory(res.category);
            const res_parentID = await CategoryService.show(res.category.parent_id);
            setCategory_parentID(res_parentID.category);
        })();
    },[id])
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="fs-4">Chi tiết danh mục</strong>
          </div>
          <div className="col-6 text-end">
            <Link
              to="/admin/category"
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
              <input className="form-control" value={category?.id}readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>Tên thương hiệu</strong>
                </label>
                <input className="form-control" value={category?.name}readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>Slug</strong>
                </label>
                <input className="form-control" value={category?.slug}readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>Danh mục cha</strong>
                </label>
                <input className="form-control" value={category?.parent_id === 0?"Không có":category_parentID.name}readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>Mô tả</strong>
                </label>
                <textarea className="form-control" rows={3} value={category?.description}readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label me-3">
                    <strong>Hình ảnh:</strong>
                </label>
                <img src={`${urlImage}categories/${category?.image}`} alt={category?.name} width="150" />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>Thứ tự</strong>
                </label>
                <input className="form-control" value={category?.sort_order}readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>Trạng thái</strong>
                </label>
                <input className="form-control" value={category?.status===1?"Xuất bản":"Chưa xuất bản"}readOnly />
            </div>
            
            <div className="mb-3">
                <label className="form-label">
                    <strong>ID người tạo</strong>
                </label>
                <input className="form-control" value={category?.created_by}readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>Ngày tạo</strong>
                </label>
                <input className="form-control" value={category?.created_at}readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>ID người cập nhật</strong>
                </label>
                <input className="form-control" value={category?.updated_by}readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>Ngày cập nhật</strong>
                </label>
                <input className="form-control" value={category?.updated_at}readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryDetail