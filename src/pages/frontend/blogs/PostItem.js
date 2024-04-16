import React from "react";
import { Link } from "react-router-dom";
import { urlImage } from "../../../config";
import { truncateText } from "../../../utils/truncateText";

const PostItem = (props) => {
    const post = props.post;
  return (
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
        <p>{truncateText(post.detail)}</p>
      </div>
    </Link>
  );
};

export default PostItem;
