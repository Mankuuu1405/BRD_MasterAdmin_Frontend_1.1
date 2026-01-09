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
  // GET all product mixes
  async getProductMixes() {
    const response = await api.get("/adminpanel/product-mixes/");
    return response.data;
  },

  // GET single product mix
  async getProductMix(id) {
    const response = await api.get(`/adminpanel/product-mixes/${id}/`);
    return response.data;
  },

  // CREATE product mix
  async createProductMix(data) {
    const response = await api.post("/adminpanel/product-mixes/", data);
    return response.data;
  },

  // UPDATE product mix
  async updateProductMix(id, data) {
    const response = await api.put(`/adminpanel/product-mixes/${id}/`, data);
    return response.data;
  },

  // DELETE product mix
  async deleteProductMix(id) {
    const response = await api.delete(`/adminpanel/product-mixes/${id}/`);
    return response.data;
  },
};

// ===========================
// Additional Services
// ===========================
export const chargesService = {
  async getCharges() {
    const response = await api.get("/adminpanel/charges/");
    return response.data;
  },
  async getCharge(id) {
    const response = await api.get(`/adminpanel/charges/${id}/`);
    return response.data;
  },
  async createCharge(data) {
    const response = await api.post("/adminpanel/charges/", data);
    return response.data;
  },
  async updateCharge(id, data) {
    const response = await api.put(`/adminpanel/charges/${id}/`, data);
    return response.data;
  },
  async deleteCharge(id) {
    const response = await api.delete(`/adminpanel/charges/${id}/`);
    return response.data;
  },
};

export const feesService = {
  async getFees() {
    const response = await api.get("/adminpanel/fees/");
    return response.data;
  },
  async getFee(id) {
    const response = await api.get(`/adminpanel/fees/${id}/`);
    return response.data;
  },
  async createFee(data) {
    const response = await api.post("/adminpanel/fees/", data);
    return response.data;
  },
  async updateFee(id, data) {
    const response = await api.put(`/adminpanel/fees/${id}/`, data);
    return response.data;
  },
  async deleteFee(id) {
    const response = await api.delete(`/adminpanel/fees/${id}/`);
    return response.data;
  },
};

export const interestService = {
  async getInterests() {
    const response = await api.get("/adminpanel/interests/");
    return response.data;
  },
  async getInterest(id) {
    const response = await api.get(`/adminpanel/interests/${id}/`);
    return response.data;
  },
  async createInterest(data) {
    const response = await api.post("/adminpanel/interests/", data);
    return response.data;
  },
  async updateInterest(id, data) {
    const response = await api.put(`/adminpanel/interests/${id}/`, data);
    return response.data;
  },
  async deleteInterest(id) {
    const response = await api.delete(`/adminpanel/interests/${id}/`);
    return response.data;
  },
};

export const moratoriumService = {
  async getMoratoriums() {
    const response = await api.get("/adminpanel/moratoriums/");
    return response.data;
  },
  async getMoratorium(id) {
    const response = await api.get(`/adminpanel/moratoriums/${id}/`);
    return response.data;
  },
  async createMoratorium(data) {
    const response = await api.post("/adminpanel/moratoriums/", data);
    return response.data;
  },
  async updateMoratorium(id, data) {
    const response = await api.put(`/adminpanel/moratoriums/${id}/`, data);
    return response.data;
  },
  async deleteMoratorium(id) {
    const response = await api.delete(`/adminpanel/moratoriums/${id}/`);
    return response.data;
  },
};

export const penaltiesService = {
  async getPenalties() {
    const response = await api.get("/adminpanel/penalties/");
    return response.data;
  },
  async getPenalty(id) {
    const response = await api.get(`/adminpanel/penalties/${id}/`);
    return response.data;
  },
  async createPenalty(data) {
    const response = await api.post("/adminpanel/penalties/", data);
    return response.data;
  },
  async updatePenalty(id, data) {
    const response = await api.put(`/adminpanel/penalties/${id}/`, data);
    return response.data;
  },
  async deletePenalty(id) {
    const response = await api.delete(`/adminpanel/penalties/${id}/`);
    return response.data;
  },
};

export const repaymentsService = {
  async getRepayments() {
    const response = await api.get("/adminpanel/repayments/");
    return response.data;
  },
  async getRepayment(id) {
    const response = await api.get(`/adminpanel/repayments/${id}/`);
    return response.data;
  },
  async createRepayment(data) {
    const response = await api.post("/adminpanel/repayments/", data);
    return response.data;
  },
  async updateRepayment(id, data) {
    const response = await api.put(`/adminpanel/repayments/${id}/`, data);
    return response.data;
  },
  async deleteRepayment(id) {
    const response = await api.delete(`/adminpanel/repayments/${id}/`);
    return response.data;
  },
};
