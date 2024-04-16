import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../../../services/PostService";

const PageDetail = () => {
    const { slug } = useParams();
    const [post, setPost] = useState([]);
    useEffect(() => {
       (async () => {
           const res = await PostService.get_pagedetail(slug);
           setPost(res.post);
       })() 
    },[slug])
  return (
    <div className="container mt-5">
        <h1 className="text-center mb-4">{post.title}</h1>
        <div className="mb-5" 
            dangerouslySetInnerHTML={{ __html: post.detail }}
        ></div>
    </div>
  )
}

export default PageDetail