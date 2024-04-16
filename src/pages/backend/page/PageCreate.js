import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import PostService from "../../../services/PostService";
import { toast } from "react-hot-toast";
import TopicService from "../../../services/TopicService";
const PageCreate = () => {
  const [topic, setTopic] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const response = await TopicService.get_list();
      setTopic(response.topic);
    })();
  }, []);
  const [data, setData] = useState({
    topic_id: "",
    title: "",
    detail: "",
    type: "page",
    description: "",
    status: "1",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const image = document.querySelector("#image");
    const post = new FormData();
    post.append("topic_id", data.topic_id);
    post.append("title", data.title);
    post.append("detail", data.detail);
    post.append("description", data.description);
    post.append("type", data.type);
    post.append("status", data.status);
    post.append("image", image.files.length === 0 ? null : image.files[0]);
    //Service them
    (async () => {
      const result = await PostService.store(post);
      if (result.status === true) {
        toast.success("Thêm thành công");
        setData({
          topic_id: "",
          title: "",
          detail: "",
          type: "page",
          description: "",
          status: "1",
        });
        image.value = null;
        navigate("/admin/page"); //chuyen trang
      } else {
        toast.error("Thêm thất bại");
      }
    })();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <strong className="fs-4">Thêm trang đơn</strong>
            </div>
            <div className="col-6 text-end">
              <Link
                to="/admin/page"
                className="btn btn-sm btn-info text-white me-2"
              >
                <FaArrowLeft className="me-1" />
                Về danh sách
              </Link>

              <button type="submit" className="btn btn-sm btn-success">
                <FaSave className="me-1" />
                Lưu
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-9">
              <div className="mb-3">
                <label htmlFor="inputTitle" className="form-label">
                  <strong>Tiêu đề (*)</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputTitle"
                  name="title"
                  value={data.title || ""}
                  onChange={handleChange}
                  placeholder="Nhập tiêu đề"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputDetail" className="form-label">
                  <strong>Chi tiết (*)</strong>
                </label>
                <textarea
                  rows={6}
                  id="inputDetail"
                  className="form-control"
                  name="detail"
                  value={data.detail || ""}
                  onChange={handleChange}
                  placeholder="Nhập chi tiết"
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="inputDes" className="form-label">
                  <strong>Mô tả (*)</strong>
                </label>
                <textarea
                  rows={3}
                  id="inputDes"
                  name="description"
                  value={data.description || ""}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Nhập mô tả"
                  required
                ></textarea>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label">
                  <strong>Chủ đề</strong>
                </label>
                <select
                  className="form-select"
                  name="topic_id"
                  value={data.topic_id || "0"}
                  onChange={handleChange}
                >
                  <option >Chọn chủ đề</option>
                  {topic &&
                    topic.length > 0 &&
                    topic.map((topic) => {
                      return <option key={topic.id} value={topic.id}>{topic.name}</option>;
                    })}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <strong>Hình ảnh (*)</strong>
                </label>
                <input
                  type="file"
                  onChange={handleChange}
                  className="form-control"
                  id="image"
                />
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
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PageCreate;
