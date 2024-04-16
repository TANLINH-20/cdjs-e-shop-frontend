import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TbPlus } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import BannerService from "../../../services/BannerService";
import { toast } from "react-hot-toast";
import { urlImage } from "../../../config";
import { IoEye } from "react-icons/io5";
const BannerList = () => {
  const [banner, setBanner] = useState([]);
  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Bạn có chắc chắn muốn xóa banner này?");
      if (confirmed === true) {
        await BannerService.delete(id);
        setBanner(banner.filter((b) => b.id !== id));
        toast.success('Xóa thành công!'); // Hiển thị thông báo thành công
      }
    } catch (error) {
      console.log(error);
      toast.error('Đã xảy ra lỗi khi xóa.'); // Hiển thị thông báo lỗi
    }
  };
  useEffect(() => {
    (async () => {
      const result = await BannerService.get_list();
      setBanner(result.banner);
    })();
  }, []);
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-danger">Tất cả banner</strong>
          </div>
          <div className="col-6 text-end">
            <Link className="btn btn-sm btn-success" to="/admin/banner/create">
              <TbPlus className="me-1" />
              Thêm banner
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
              <th scope="col">Tên banner</th>
              <th scope="col">Link</th>
              <th scope="col">Chức năng</th>
              <th scope="col">ID</th>
            </tr>
          </thead>
          <tbody>
            {banner.length > 0 &&
              banner.map((banner, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">
                      <input type="checkbox" />
                    </th>
                    <td>
                      <img
                        className="img-fluid"
                        src={`${urlImage}banners/${banner.image}`}
                        alt={banner.name}
                      />
                    </td>
                    <td>{banner.name}</td>
                    <td>{banner.link}</td>
                    <td>
                    <Link
                        className="btn btn-sm btn-success me-2 mb-1"
                        to={"/admin/banner/show/" + banner.id}
                      >
                        <IoEye className="m-1 fs-5" />
                        Show
                      </Link>
                      <Link
                        className="btn btn-sm btn-warning me-2 mb-1"
                        to={"/admin/banner/edit/" + banner.id}
                      >
                        <FaEdit className="m-1 fs-5" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(banner.id)}
                        className="btn btn-sm btn-danger mb-1">
                        <MdDelete className="m-1 fs-5" />
                        Delete
                      </button>
                    </td>
                    <td>{banner.id}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BannerList;
