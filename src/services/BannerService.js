import router from "../router";

const BannerService = {
  get_list: () => {
    return router.httpAxios.get( "banner/index");
  },

  store: (formData) => {
    return router.httpAxios.post("banner/store", formData);
  },

  show: (id) => {
    return router.httpAxios.get(`banner/show/${id}`);
  },

  update: (id, formData) => {
    return router.httpAxios.put(`banner/update/${id}`, formData);
  },

  delete: (id) => {
    return router.httpAxios.delete(`banner/delete/${id}`);
  },

  slideshow: async (position) => {
    return await router.httpAxios.get( `banner/list/${position}`);
  },

};
export default BannerService;
