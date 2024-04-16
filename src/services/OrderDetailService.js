import router from "../router";

const OrderDetailService = {
  get_list: () => {
    return router.httpAxios.get( "orderdetail/index");
  },

  store: (formData) => {
    return router.httpAxios.post("orderdetail/store", formData);
  },

  show: (id) => {
    return router.httpAxios.get(`orderdetail/show/${id}`);
  },

  delete: (id) => {
    return router.httpAxios.delete(`orderdetail/delete/${id}`);
  },
};
export default OrderDetailService;
