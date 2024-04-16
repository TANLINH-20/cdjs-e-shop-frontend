import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import PostService from "../../../services/PostService";
import { toast } from "react-hot-toast";
import TopicService from "../../../services/TopicService";
const PostEdit = () => {
  const [topic, setTopic] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id từ URL
  
  const [data, setData] = useState({
    topic_id: "",
    title: "",
    detail: "",
    type: "post",
    image: "",
    description: "",
    status: "1",
  });

  useEffect(() => {
    (async () => {
      const response = await TopicService.get_list();
      setTopic(response.topic);
      const result = await PostService.show(id);
      if (result.status) {
        setData(result.post);
      } else {
        toast.error("Không tìm thấy trang này");
      }
    })();
  }, [id]);
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
    post.append("image", image.files.length === 0 ? data.image : image.files[0]);
    //Service them
    (async () => {
      const result = await PostService.update(id,post);
      if (result.status === true) {
        toast.success("Cập nhật thành công");
        setData({
          topic_id: "",
          title: "",
          detail: "",
          image: "",
          type: "post",
          description: "",
          status: "1",
        });
        image.value = null;
        navigate("/admin/post"); //chuyen trang
      } else {
        toast.error("Cập nhật thất bại");
      }
    })();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <strong className="fs-4">Sửa bài viết</strong>
            </div>
            <div className="col-6 text-end">
              <Link
                to="/admin/post"
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
                  <option>Chọn chủ đề</option>
                  {topic &&
                    topic.length > 0 &&
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

export default PostEdit;
