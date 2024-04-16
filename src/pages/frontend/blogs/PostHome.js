import { useEffect, useState } from "react";
import PostService from "../../../services/PostService";
import PostItem from "./PostItem";

const PostHome = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await PostService.list_new("post",8);
      setPost(res.post);
    })();
  }, [post]);
  return (
    <>
      {post &&
        post.map((post) => {
          return (
            <div className="col-md-3 col-sm-12 key={post.id}">
              <PostItem post={post} />
            </div>
          );
        })}
    </>
  );
};

export default PostHome;
