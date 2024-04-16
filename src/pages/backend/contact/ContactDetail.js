import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import ContactService from "../../../services/ContactService";

const ContactDetail = () => {
  const { id } = useParams();
  const [contact, setContact] = useState();

  useEffect(() => {
    (async () => {
      const result = await ContactService.show(id);
      setContact(result.contact);
    })();
  }, [id]);
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="fs-4">Chi tiết liên hệ</strong>
          </div>
          <div className="col-6 text-end">
            <Link
              to="/admin/contact"
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
              <input className="form-control" value={contact?.id} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Họ và tên</strong>
              </label>
              <input className="form-control" value={contact?.name} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Email</strong>
              </label>
              <input className="form-control" value={contact?.email} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Số điện thoại</strong>
              </label>
              <input className="form-control" value={contact?.phone} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Tiêu đề</strong>
              </label>
              <input className="form-control" value={contact?.title} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>chi tiết</strong>
              </label>
              <textarea
                className="form-control"
                value={contact?.content}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Nội dung liên hệ</strong>
              </label>
              <textarea
                className="form-control"
                value={contact?.description}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Trạng thái</strong>
              </label>
              <input
                className="form-control"
                value={contact?.status === 1 ? "Xuất bản" : "Chưa xuất bản"}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Ngày liên hệ</strong>
              </label>
              <input
                className="form-control"
                value={contact?.created_at}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>ID người trả lời</strong>
              </label>
              <input
                className="form-control"
                value={contact?.updated_by}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Ngày trả lời</strong>
              </label>
              <input
                className="form-control"
                value={contact?.updated_at}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
