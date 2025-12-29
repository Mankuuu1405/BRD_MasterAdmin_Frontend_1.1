import axiosInstance from "../utils/axiosInstance";

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const base_url = `${BASE_URL}/api/v1/adminpanel/approval-master`

export const approvalMasterService = {
  getApprovalList: () =>
    axiosInstance.get(`${base_url}/approval-list/`).then(res => res.data),

  getApprovalById: (id) =>
    axiosInstance.get(`${base_url}/approval-list/${id}/`).then(res => res.data),

  createApproval: (payload) =>
    axiosInstance.post(`${base_url}/approval-list/`, payload).then(res => res.data),

  updateApproval: (id, payload) =>
    axiosInstance.put(`${base_url}/approval-list/${id}/`, payload).then(res => res.data),

  deleteApproval: (id) =>
    axiosInstance.delete(`${base_url}/approval-list/${id}/`),

  toggleStatus: (id) =>
    axiosInstance.patch(`${base_url}/approval-list/${id}/toggle_status/`)
};
