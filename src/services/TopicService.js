import router from "../router";

const TopicService = {
  get_list: () => {
    return router.httpAxios.get( "topic/index");
  },

  detail: (slug) => {
    return router.httpAxios.get(`topic/topicdetail/${slug}`);
  },

  store: (formData) => {
    return router.httpAxios.post("topic/store", formData);
  },

  show: (id) => {
    return router.httpAxios.get(`topic/show/${id}`);
  },

  update: (id, formData) => {
    return router.httpAxios.put(`topic/update/${id}`, formData);
  },

  delete: (id) => {
    return router.httpAxios.delete(`topic/delete/${id}`);
  },
};
export default TopicService;
