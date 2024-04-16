import router from "../router";

const CategoryService = {
  get_list: () => {
    return router.httpAxios.get( "category/index");
  },

  list_parent_id:(parentid) => {
    return router.httpAxios.get(`category/list/${parentid}`);
  },

  store: (formData) => {
    return router.httpAxios.post("category/store", formData);
  },

  show: (id) => {
    return router.httpAxios.get(`category/show/${id}`);
  },

  get_name: (slug) => {
    return router.httpAxios.get(`category/showname/${slug}`);
  },

  update: (id, formData) => {
    return router.httpAxios.put(`category/update/${id}`, formData);
  },

  delete: (id) => {
    return router.httpAxios.delete(`category/delete/${id}`);
  },
};
export default CategoryService;