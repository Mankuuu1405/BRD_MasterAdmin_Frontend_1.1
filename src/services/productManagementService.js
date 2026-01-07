import api from "../utils/axiosInstance";

export const productManagementService = {
  
  // GET all loan products
  async getProducts() {
    const response = await api.get("/adminpanel/product-revenue/products/");
    return response.data;
  },

  // GET single product
  async getProduct(id) {
    const response = await api.get(`/adminpanel/product-revenue/products/${id}/`);
    return response.data;
  },

  // CREATE product
  async createProduct(data) {
    const response = await api.post("/adminpanel/product-revenue/products/", data);
    return response.data;
  },

  // UPDATE product
  async updateProduct(id, data) {
    const response = await api.put(`/adminpanel/product-revenue/products/${id}/`, data);
    return response.data;
  },

  // DELETE product
  async deleteProduct(id) {
    const response = await api.delete(`/adminpanel/product-revenue/products/${id}/`);
    return response.data;
  },

};

export const productMixService = {
  
  // GET all loan products
  async getProductMixes() {
    const response = await api.get("/adminpanel/product-mixes/");
    return response.data;
  },

  // GET single product
  async getProductMix(id) {
    const response = await api.get(`/adminpanel/product-mixes/${id}/`);
    return response.data;
  },

  // CREATE product
  async createProductMix(data) {
    const response = await api.post("/adminpanel/product-mixes/", data);
    return response.data;
  },

  // UPDATE product
  async updateProductMix(id, data) {
    const response = await api.put(`/adminpanel/product-mixes/${id}/`, data);
    return response.data;
  },

  // DELETE product
  async deleteProductMix(id) {
    const response = await api.delete(`/adminpanel/product-mixes/${id}/`);
    return response.data;
  },

}
