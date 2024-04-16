import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import Pagination from "../../../utils/Pagination";
import PostService from "../../../services/PostService";
import { useLocation, useParams } from "react-router-dom";
import TopicService from "../../../services/TopicService";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { slug } = useParams();
  const location = useLocation();
  const [slugName, setSlugName] = useState([]);
  const itemPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [lengthPost, setLengthPost] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pathname = location.pathname;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1); // Reset current page to 1 when changing location
  }, [location]);

  useEffect(() => {
    (async () => {
      if (pathname === "/tat-ca-bai-viet") {
        const res = await PostService.list("post", currentPage, itemPage);
        setPosts(res.post);
        const temp = await PostService.get_list_by_type("post");
        setLengthPost(temp.post);
        setTotalPages(Math.ceil(lengthPost.length / itemPage));
      } else {
        const res = await TopicService.detail(slug);
        setSlugName(res.topic);
        const result = await PostService.list_post_page(
          slugName.id,
          currentPage,
          itemPage
        );
        setPosts(result.post);

        const temp = await PostService.get_by_topicid(slugName.id);
        setLengthPost(temp.post);
        setTotalPages(Math.ceil(lengthPost.length / itemPage));
      }
    })();
  }, [location, slugName.id, currentPage, pathname, lengthPost.length, slug]);
  console.log(totalPages);
  return (
    <div className="container-fluid">
      <h1 className="text-center text-secondary my-3">
        {location.pathname === "/tat-ca-bai-viet"
          ? "Tất cả các bài viết"
          : slugName.name}
      </h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mx-5">
        {posts &&
          posts.length > 0 &&
          posts.map((post) => (
            <div key={post.id} className="col">
              <PostItem post={post} />
            </div>
          ))}
      </div>
      <div className="text-center my-3">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PostList;
