import router from "../router";

const UserService = {
  get_list: () => {
    return router.httpAxios.get( "user/index");
  },

  store: (formData) => {
    return router.httpAxios.post("user/store", formData);
  },

  show: (id) => {
    return router.httpAxios.get(`user/show/${id}`);
  },

  update: (id, formData) => {
    return router.httpAxios.put(`user/update/${id}`, formData);
  },

  delete: (id) => {
    return router.httpAxios.delete(`user/delete/${id}`);
  },
};
export default UserService;
