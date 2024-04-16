import router from "../router";

const ProductService = {
  get_list: async () => {
    return await router.httpAxios.get("product/index");
  },

  get_list_brandAll: async (brandid) => {
    return await router.httpAxios.get(`product/list_brand/${brandid}`);
  },

  get_list_parentidAll: async (parentid) => {
    return await router.httpAxios.get(`product/list_parentid/${parentid}`);
  },

  get_list_categoryAll: async (categoryid) => {
    return await router.httpAxios.get(`product/list_category/${categoryid}`);
  },

  list_product_brand: async (brandid,page,limit) => {
    return await router.httpAxios.get(`product/list_product_brand/${brandid}/${page}/${limit}`);
  },

  list_product_category: async (categoryid,page,limit) => {
    return await router.httpAxios.get(`product/list_product_category/${categoryid}/${page}/${limit}`);
  },

  list_product_search: async (keyword) => {
    return await router.httpAxios.get(`product/list_product_search/${keyword}`);
  },

  list_product_search_by_page: async (keyword,page,limit) => {
    return await router.httpAxios.get(`product/list_product_search_by_page/${keyword}/${page}/${limit}`);
  },

  store: (formData) => {
    return router.httpAxios.post("product/store", formData);
  },

  show: (id) => {
    return router.httpAxios.get(`product/show/${id}`);
  },

  update: (id, formData) => {
    return router.httpAxios.put(`product/update/${id}`, formData);
  },

  delete: (id) => {
    return router.httpAxios.delete(`product/delete/${id}`);
  },

  list_new: async (limit) => {
    return await router.httpAxios.get(`product/listnew/${limit}`);
  },

  list_sale: async (limit) => {
    return await router.httpAxios.get(`product/listsale/${limit}`);
  },

  list: async (page,limit) => {
    return await router.httpAxios.get(`product/list/${page}/${limit}`);
  },
  detail: async (slug, limit) => {
    return await router.httpAxios.get(`product/productdetail/${slug}/${limit}`);
  },
};
export default ProductService;
