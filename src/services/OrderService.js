import router from "../router";

const OrderService = {
  get_list: () => {
    return router.httpAxios.get( "order/index");
  },

  getLatest:() => {
    return router.httpAxios.get( "order/showlatest");
  },

  store: (formData) => {
    return router.httpAxios.post("order/store", formData);
  },

  show: (id) => {
    return router.httpAxios.get(`order/show/${id}`);
  },

  update: (id, formData) => {
    return router.httpAxios.put(`order/update/${id}`, formData);
  },

  delete: (id) => {
    return router.httpAxios.delete(`order/delete/${id}`);
  },
};
export default OrderService;
