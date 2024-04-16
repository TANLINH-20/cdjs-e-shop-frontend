import React, { useEffect, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import TopicService from "../../../services/TopicService";
import { toast } from "react-hot-toast";
import { IoEye } from "react-icons/io5";
const TopicList = () => {
  const [topic, setTopic] = useState([]);
  const [insertId, setInsertId] = useState();
  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Bạn có chắc chắn muốn xóa chủ đề này?");
      if (confirmed === true) {
        await TopicService.delete(id);
        setTopic(topic.filter((b) => b.id !== id));
        toast.success("Xóa thành công!"); // Hiển thị thông báo thành công
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi khi xóa."); // Hiển thị thông báo lỗi
    }
  };
  useEffect(() => {
    (async () => {
      const result = await TopicService.get_list();
      setTopic(result.topic);
    })();
  }, [insertId]);

  const [data, setData] = useState({
    name: "",
    parent_id: "0",
    sort_order: "",
    metakey: "",
    metadesc: "",
    status: "1",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const topic = new FormData();
    topic.append("name", data.name);
    topic.append("parent_id", data.parent_id);
    topic.append("sort_order", data.sort_order);
    topic.append("metakey", data.metakey);
    topic.append("metadesc", data.metadesc);
    topic.append("status", data.status);
    //Service them
    (async () => {
      const result = await TopicService.store(topic);
      if (result.status === true) {
        toast.success("Thêm thành công");
        setInsertId(result.topic.insertId);
        setData({
          name: "",
          parent_id: "0",
          sort_order: "",
          metakey: "",
          metadesc: "",
          status: "1",
        });
      } else {
        toast.error("Thêm thất bại");
      }
    })();
  };
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="fs-4">Chủ đề bài viết</strong>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="inputName" className="form-label">
                  <strong>Tên chủ đề (*)</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  name="name"
                  value={data.name || ""}
                  onChange={handleChange}
                  placeholder="Nhập tên danh mục"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <strong>Danh mục cha</strong>
                </label>
                <select
                  className="form-select"
                  name="parent_id"
                  value={data.parent_id}
                  onChange={handleChange}
                >
                  <option value="0">Cấp 0</option>
                  {topic.length > 0 &&
                    topic.map((topic) => {
                      return (
                        <option key={topic.id} value={topic.id}>
                          {topic.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="sort_order" className="form-label">
                  <strong>Thứ tự (*)</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sort_order"
                  name="sort_order"
                  value={data.sort_order || ""}
                  onChange={handleChange}
                  placeholder="Nhập thứ tự"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputKey" className="form-label">
                  <strong>Từ khóa (*)</strong>
                </label>
                <textarea
                  rows={4}
                  id="inputKey"
                  name="metakey"
                  value={data.metakey || ""}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Nhập từ khóa SEO"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="inputDesc" className="form-label">
                  <strong>Từ khóa (*)</strong>
                </label>
                <textarea
                  rows={4}
                  id="inputDesc"
                  name="metadesc"
                  value={data.metadesc || ""}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Nhập mô tả SEO"
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <strong>Trạng thái</strong>
                </label>
                <select
                  className="form-select"
                  name="status"
                  value={data.status}
                  onChange={handleChange}
                >
                  <option value="1">Xuất bản</option>
                  <option value="2">Chưa xuất bản</option>
                </select>
              </div>
              <div className="text-end">
                <button type="submit" className="btn btn-sm btn-success">
                  <FaSave className="me-1" />
                  Lưu[Thêm]
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-8 mt-2">
                <span className="px-1 " style={{ borderRight: "1px solid" }}>
                  Tất cả(123)
                </span>
                <span className="px-1 " style={{ borderRight: "1px solid" }}>
                  Xuất bản(12)
                </span>
                <span className="px-1 ">Rác(1)</span>
              </div>
              <div className="col-md-4 text-end pb-2">
                <form class="d-flex" role="search">
                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button class="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
            <table class="table mb-0 table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th scope="col">
                    <input type="checkbox" />
                  </th>
                  <th scope="col">Tên chủ đề</th>
                  <th scope="col">Tên slug</th>
                  <th scope="col">Chức năng</th>
                  <th scope="col">ID</th>
                </tr>
              </thead>
              <tbody>
                {topic.length > 0 &&
                  topic.map((topic, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">
                          <input type="checkbox" />
                        </th>
                        <td>{topic.name}</td>
                        <td>{topic.slug}</td>
                        <td>
                          <div className="mt-2">
                          <Link
                              className="btn btn-sm btn-success me-2 mb-1"
                              to={"/admin/topic/show/" + topic.id}
                            >
                              <IoEye className="m-1 fs-5" />
                              Show
                            </Link>
                          <Link
                              className="btn btn-sm btn-warning me-2 mb-1"
                              to={"/admin/topic/edit/" + topic.id}
                            >
                              <FaEdit className="m-1 fs-5" />
                              Edit
                            </Link>
                            <button 
                            onClick={() => handleDelete(topic.id)}
                            className="btn btn-sm btn-danger mb-1">
                              <MdDelete className="m-1 fs-5" />
                              Delete
                            </button>
                          </div>
                        </td>
                        <td>{topic.id}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicList;
