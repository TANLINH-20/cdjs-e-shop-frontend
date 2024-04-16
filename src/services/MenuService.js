import router from "../router";

const MenuService = {
  get_list: () => {
    return router.httpAxios.get("menu/index");
  },

  store: (formData) => {
    return router.httpAxios.post("menu/store", formData);
  },

  show: (id) => {
    return router.httpAxios.get(`menu/show/${id}`);
  },

  update: (id, formData) => {
    return router.httpAxios.put(`menu/update/${id}`, formData);
  },

  delete: (id) => {
    return router.httpAxios.delete(`menu/delete/${id}`);
  },

  mainmenu: async (parentid, position, level) => {
    return await router.httpAxios.get(`/menu/list/${parentid}/${position}/${level}`);
  },
};
export default MenuService;