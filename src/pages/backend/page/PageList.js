import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TbPlus } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import PostService from "../../../services/PostService";
import { urlImage } from "../../../config";
import { toast } from "react-hot-toast";
import { IoEye } from "react-icons/io5";
const PageList = () => {
  const [page, setPage] = useState([]);
  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Bạn có chắc chắn muốn xóa?");
      if (confirmed === true) {
        await PostService.delete(id);
        setPage(page.filter((b) => b.id !== id));
        toast.success("Xóa thành công!"); // Hiển thị thông báo thành công
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi khi xóa."); // Hiển thị thông báo lỗi
    }
  };
  useEffect(() => {
    (async () => {
      const result = await PostService.get_list();
      setPage(result.post);
    })();
  }, []);
  const filteredPages = page.filter((post) => post.type === "page");
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-danger">Tất cả trang đơn</strong>
          </div>
          <div className="col-6 text-end">
            <Link className="btn btn-sm btn-success" to="/admin/page/create">
              <TbPlus className="me-1" />
              Thêm trang đơn
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
              <th scope="col">Tiêu đề</th>
              <th scope="col">Mô tả</th>
              <th scope="col">Chức năng</th>
              <th scope="col">ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredPages.length > 0 &&
              filteredPages.map((page, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">
                      <input type="checkbox" />
                    </th>
                    <td>
                      <img
                        className="img-fluid"
                        src={`${urlImage}post/${page.image}`}
                        alt={page.title}
                      />
                    </td>
                    <td>{page.title}</td>
                    <td>{page.metakey}</td>
                    <td>
                      <Link
                        className="btn btn-sm btn-success me-2 mb-1"
                        to={"/admin/page/show/" + page.id}
                      >
                        <IoEye className="m-1 fs-5" />
                        Show
                      </Link>
                      <Link
                        className="btn btn-sm btn-warning me-2 mb-1"
                        to={"/admin/page/edit/" + page.id}
                      >
                        <FaEdit className="m-1 fs-5" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(page.id)}
                        className="btn btn-sm btn-danger mb-1"
                      >
                        <MdDelete className="m-1 fs-5" />
                        Delete
                      </button>
                    </td>
                    <td>{page.id}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PageList;
