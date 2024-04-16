import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostService from "../../../services/PostService";
import { urlImage } from "../../../config";
const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await PostService.get_postdetail(slug, 4);
      setPost(res.post);
      setPosts(res.posts);
    })();
  }, [slug]);
  return (
    <div className="mt-4 container">
      <h1 className="text-center mb-4">{post.title}</h1>
      <div className="row mb-5">
        <div className="col-md-6 border p-0">
          <img
            src={`${urlImage}post/${post.image}`}
            alt={post.title}
            className="img-fluid"
          />
        </div>
        <div className="col-md">
          <p className="fs-5">{post.detail}</p>
        </div>
      </div>
      <h1 className="my-3">Bài viết liên quan</h1>
      <div className="row mb-3">
        {posts.map((post) => (
          <div className="col-md-3 col-sm-12 key={post.id}">
          <Link
            className="text-decoration-none text-dark "
            to={`/bai-viet/${post.slug}`}
          >
            <img
              className="rounded-3 img-fluid "
              src={`${urlImage}post/${post.image}`}
              alt={post.title}
            />
            <div className="pt-4">
              <h5 className="text-uppercase">{post.title}</h5>
              <p>{post.detail}</p>
            </div>
          </Link>
        </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
