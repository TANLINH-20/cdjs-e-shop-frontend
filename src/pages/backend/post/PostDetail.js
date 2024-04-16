import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import PostService from '../../../services/PostService';
import { urlImage } from '../../../config';

const PostDetail = () => {
    const { id } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    (async () => {
      const result = await PostService.show(id);
      setPost(result.post);
    })();
  }, [id]);
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="fs-4">Chi tiết bài viết</strong>
          </div>
          <div className="col-6 text-end">
            <Link
              to="/admin/post"
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
              <input className="form-control" value={post?.id} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Chủ đề</strong>
              </label>
              <input className="form-control" value={post?.topic_name} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Tiêu đề</strong>
              </label>
              <input className="form-control" value={post?.title} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Slug</strong>
              </label>
              <input className="form-control" value={post?.slug} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Chi tiết</strong>
              </label>
              <textarea className="form-control" rows={5} value={post?.detail}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Mô tả</strong>
              </label>
              <textarea className="form-control" rows={5} value={post?.description}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label me-3">
                <strong>Ảnh:</strong>
              </label>
              <img src={`${urlImage}/post/${post?.image}`} alt={post?.name} width={300} />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Trạng thái</strong>
              </label>
              <input className="form-control" value={post?.status === 1 ? 'Xuất bản' : 'Chưa xuất bản'}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>ID người tạo</strong>
              </label>
              <input className="form-control" value={post?.created_by}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Ngày tạo</strong>
              </label>
              <input className="form-control" value={post?.created_at}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>ID người cập nhật</strong>
              </label>
              <input className="form-control" value={post?.updated_by}readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Ngày cập nhật</strong>
              </label>
              <input className="form-control" value={post?.updated_at}readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail