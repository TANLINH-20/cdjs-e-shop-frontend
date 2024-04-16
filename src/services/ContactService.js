import router from "../router";

const ContactService = {
  get_list: () => {
    return router.httpAxios.get( "contact/index");
  },

  store: (formData) => {
    return router.httpAxios.post("contact/store", formData);
  },

  show: (id) => {
    return router.httpAxios.get(`contact/show/${id}`);
  },

  delete: (id) => {
    return router.httpAxios.delete(`contact/delete/${id}`);
  },
};
export default ContactService;
