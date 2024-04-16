import router from "../router";

const PostService = {
  get_list: () => {
    return router.httpAxios.get("post/index");
  },

  list: async (type,page,limit) => {
    return await router.httpAxios.get(`post/list/${type}/${page}/${limit}`);
  },

  get_by_topicid: (topicid) => {
    return router.httpAxios.get(`post/listbytopicid/${topicid}`);
  },

  list_post_page: (topicid,page,limit) => {
    return router.httpAxios.get(`post/listpostpage/${topicid}/${page}/${limit}`);
  },

  get_list_by_type: (type) => {
    return router.httpAxios.get(`post/listbytype/${type}`);
  },

  list_new: async (post,limit) => {
    return await router.httpAxios.get(`post/listnew/${post}/${limit}`);
  },

  get_pagedetail: (slug)=>{
    return router.httpAxios.get(`post/pagedetail/${slug}`);
  },

  get_postdetail: (slug,limit)=>{
    return router.httpAxios.get(`post/postdetail/${slug}/${limit}`);
  },

  store: (formData) => {
    return router.httpAxios.post("post/store", formData);
  },

  show: (id) => {
    return router.httpAxios.get(`post/show/${id}`);
  },

  update: (id, formData) => {
    return router.httpAxios.put(`post/update/${id}`, formData);
  },

  delete: (id) => {
    return router.httpAxios.delete(`post/delete/${id}`);
  },
};
export default PostService;
