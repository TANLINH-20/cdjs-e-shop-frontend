import router from "../router";

const BrandService = {
  get_list: () => {
    return router.httpAxios.get( "brand/index");
  },

  store: (formData) => {
    return router.httpAxios.post("brand/store", formData);
  },

  show: (id) => {
    return router.httpAxios.get(`brand/show/${id}`);
  },

  get_name: (slug) => {
    return router.httpAxios.get(`brand/showname/${slug}`);
  },

  update: (id, formData) => {
    return router.httpAxios.put(`brand/update/${id}`, formData);
  },

  delete: (id) => {
    return router.httpAxios.delete(`brand/delete/${id}`);
  },
};
export default BrandService;
