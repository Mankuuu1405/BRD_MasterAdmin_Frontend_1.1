import api from "../utils/axiosInstance";

export const productManagementService = {
  
  // GET all loan products
  async getProducts() {
    const response = await api.get("/adminpanel/product-management/loan-products/");
    return response.data;
  },

  // GET single product
  async getProduct(id) {
    const response = await api.get(`/adminpanel/product-management/loan-products/${id}/`);
    return response.data;
  },

  // CREATE product
  async createProduct(data) {
    const response = await api.post("/adminpanel/product-management/loan-products/", data);
    return response.data;
  },

  // UPDATE product
  async updateProduct(id, data) {
    const response = await api.put(`/adminpanel/product-management/loan-products/${id}/`, data);
    return response.data;
  },

  // DELETE product
  async deleteProduct(id) {
    const response = await api.delete(`/adminpanel/product-management/loan-products/${id}/`);
    return response.data;
  },

};

export const productMixService = {
  
  // GET all loan products
  async getProducts() {
    const response = await api.get("/adminpanel/product-management/loan-products/");
    return response.data;
  },

  // GET single product
  async getProduct(id) {
    const response = await api.get(`/adminpanel/product-management/loan-products/${id}/`);
    return response.data;
  },

  // CREATE product
  async createProduct(data) {
    const response = await api.post("/adminpanel/product-management/loan-products/", data);
    return response.data;
  },

  // UPDATE product
  async updateProduct(id, data) {
    const response = await api.put(`/adminpanel/product-management/loan-products/${id}/`, data);
    return response.data;
  },

  // DELETE product
  async deleteProduct(id) {
    const response = await api.delete(`/adminpanel/product-management/loan-products/${id}/`);
    return response.data;
  },

}
