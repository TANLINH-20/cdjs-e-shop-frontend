import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import MenuService from "../../../services/MenuService";

const MenuDetail = () => {
  const { id } = useParams();
  const [menu_parentID, setmenu_parentID] = useState([]);
  const [menu, setMenu] = useState();

  useEffect(() => {
    (async () => {
      const result = await MenuService.show(id);
      setMenu(result.menu);
      const res_parentID = await MenuService.show(result.menu.parent_id);
      setmenu_parentID(res_parentID.menu);
    })();
  }, [id]);
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="fs-4">Chi tiết menu</strong>
          </div>
          <div className="col-6 text-end">
            <Link
              to="/admin/menu"
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
              <input className="form-control" value={menu?.id} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Tên menu</strong>
              </label>
              <input className="form-control" value={menu?.name} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Link</strong>
              </label>
              <input className="form-control" value={menu?.link} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Kiểu menu</strong>
              </label>
              <input className="form-control" value={menu?.type} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Thứ tự</strong>
              </label>
              <input
                className="form-control"
                value={menu?.sort_order}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Vị trí</strong>
              </label>
              <input className="form-control" value={menu?.position} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Level</strong>
              </label>
              <input className="form-control" value={menu?.level} readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>Danh mục cha</strong>
                </label>
                <input className="form-control" value={menu?.parent_id === 0?"Không có":menu_parentID.name}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Trạng thái</strong>
              </label>
              <input
                className="form-control"
                value={menu?.status === 1 ? "Xuất bản" : "Chưa xuất bản"}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>ID người tạo</strong>
              </label>
              <input
                className="form-control"
                value={menu?.created_by}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Ngày tạo</strong>
              </label>
              <input
                className="form-control"
                value={menu?.created_at}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>ID người cập nhật</strong>
              </label>
              <input
                className="form-control"
                value={menu?.updated_by}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Ngày cập nhật</strong>
              </label>
              <input
                className="form-control"
                value={menu?.updated_at}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;
