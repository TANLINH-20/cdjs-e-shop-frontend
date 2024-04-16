import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { toast } from "react-hot-toast";
import TopicService from "../../../services/TopicService";

const TopicEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id từ URL

  const [topic, setTopic] = useState([]);
  
  const [data, setData] = useState({
    name: "",
    parent_id: "0",
    sort_order: "",
    metakey: "",
    metadesc: "",
    status: "1",
  });

  useEffect(() => {
    (async () => {
      const listTopic = await TopicService.get_list();
      setTopic(listTopic.topic);
      const result = await TopicService.show(id);
      if (result.status) {
        setData(result.topic);
      } else {
        toast.error("Không tìm thấy thương hiệu");
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
    const topic = new FormData();
    topic.append("name", data.name);
    topic.append("parent_id", data.parent_id);
    topic.append("sort_order", data.sort_order);
    topic.append("metakey", data.metakey);
    topic.append("metadesc", data.metadesc);
    topic.append("status", data.status);
    (async () => {
      const result = await TopicService.update(id, topic);
      if (result.status === true) {
        toast.success("Cập nhật thành công");
        navigate("/admin/topic");
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
              <strong className="fs-4">Sửa chủ đề</strong>
            </div>
            <div className="col-6 text-end">
              <Link
                to="/admin/topic"
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
          <div className="col-md">
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
              
            </form>
          </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TopicEdit;
