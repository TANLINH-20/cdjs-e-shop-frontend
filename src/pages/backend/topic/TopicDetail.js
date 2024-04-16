import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import TopicService from "../../../services/TopicService";

const TopicDetail = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState();
  const [topic_parentID, setTopic_parentID] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await TopicService.show(id);
      setTopic(result.topic);
      const res_parentID = await TopicService.show(result.topic.parent_id);
      setTopic_parentID(res_parentID.topic);
    })();
  }, [id]);
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="fs-4">Chi tiết chủ đề</strong>
          </div>
          <div className="col-6 text-end">
            <Link
              to="/admin/topic"
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
              <input className="form-control" value={topic?.id} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Tên chủ đề</strong>
              </label>
              <input className="form-control" value={topic?.name} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Slug</strong>
              </label>
              <input className="form-control" value={topic?.slug} readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>Danh mục cha</strong>
                </label>
                <input className="form-control" value={topic?.parent_id === 0?"Không có":topic_parentID.name}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Thứ tự</strong>
              </label>
              <input className="form-control" value={topic?.sort_order} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Từ khóa SEO</strong>
              </label>
              <textarea
                className="form-control"
                value={topic?.metakey}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Mô tả SEO</strong>
              </label>
              <textarea
                className="form-control"
                value={topic?.metadesc}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Trạng thái</strong>
              </label>
              <input
                className="form-control"
                value={topic?.status === 1 ? "Xuất bản" : "Chưa xuất bản"}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Ngày liên hệ</strong>
              </label>
              <input
                className="form-control"
                value={topic?.created_at}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>ID người trả lời</strong>
              </label>
              <input
                className="form-control"
                value={topic?.updated_by}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Ngày trả lời</strong>
              </label>
              <input
                className="form-control"
                value={topic?.updated_at}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;
