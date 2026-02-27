// tenantService.js
// Master Admin — Fetch Tenants (created via /add/ and signed up via /signup/)

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";
const TENANT_API = `${BASE_URL}/api/tenants`; // adjust prefix to match your root urls.py

// -------------------------------------------------------------------
// Auth Helper
// -------------------------------------------------------------------
const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token"); // JWT access token
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// -------------------------------------------------------------------
// Central Request Handler
// -------------------------------------------------------------------
const apiRequest = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: getAuthHeaders(),
    ...options,
  });

  if (response.status === 204) return null; // No content (e.g. DELETE)

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data?.detail || data?.message || JSON.stringify(data);
    throw new Error(errorMsg || "Something went wrong.");
  }

  return data;
};

// -------------------------------------------------------------------
// 1. Fetch All Tenants
//    GET /api/tenants/tenant/
//    Returns list of all tenants (both master-created and self-signed-up)
// -------------------------------------------------------------------
export const getAllTenants = async (params = {}) => {
  // Supported params: page, search, tenant_type, is_active
  const query = new URLSearchParams(params).toString();
  const url = `${TENANT_API}/tenant/${query ? `?${query}` : ""}`;
  return await apiRequest(url);
};

// -------------------------------------------------------------------
// 2. Fetch Tenants Created by Master Admin
//    GET /api/tenants/tenant/?created_by=master   (adjust filter key as per your backend)
//    OR use the /add/ logic to identify master-created tenants
// -------------------------------------------------------------------
export const getMasterCreatedTenants = async (params = {}) => {
  const query = new URLSearchParams({ ...params, created_by: "master" }).toString();
  const url = `${TENANT_API}/tenant/?${query}`;
  return await apiRequest(url);
};

// -------------------------------------------------------------------
// 3. Fetch Self-Signed-Up Tenants
//    GET /api/tenants/tenant/?created_by=signup
// -------------------------------------------------------------------
export const getSignedUpTenants = async (params = {}) => {
  const query = new URLSearchParams({ ...params, created_by: "signup" }).toString();
  const url = `${TENANT_API}/tenant/?${query}`;
  return await apiRequest(url);
};

// -------------------------------------------------------------------
// 4. Fetch Single Tenant by UUID
//    GET /api/tenants/{tenant_id}/   (via router)
// -------------------------------------------------------------------
export const getTenantById = async (tenantId) => {
  return await apiRequest(`${TENANT_API}/${tenantId}/`);
};

// -------------------------------------------------------------------
// 5. Create Tenant (Master Admin manually adds tenant)
//    POST /api/tenants/add/
// -------------------------------------------------------------------
export const createTenantByMaster = async (tenantData) => {
  /*
    tenantData shape (matches your Tenant model):
    {
      name: "Acme Bank",
      tenant_type: "BANK",           // BANK | NBFC | P2P | FINTECH
      email: "admin@acmebank.com",
      phone: "9876543210",
      address: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      country: "India",
      cin: "U65910MH2020PTC123456",
      pan: "AABCU9603R",
      gstin: "27AABCU9603R1ZX",
    }
  */
  return await apiRequest(`${TENANT_API}/add/`, {
    method: "POST",
    body: JSON.stringify(tenantData),
  });
};

// -------------------------------------------------------------------
// 6. Tenant Self-Signup
//    POST /api/tenants/signup/
// -------------------------------------------------------------------
export const tenantSelfSignup = async (signupData) => {
  return await apiRequest(`${TENANT_API}/signup/`, {
    method: "POST",
    body: JSON.stringify(signupData),
  });
};

// -------------------------------------------------------------------
// 7. Update Tenant (full update)
//    PUT /api/tenants/{tenant_id}/
// -------------------------------------------------------------------
export const updateTenant = async (tenantId, tenantData) => {
  return await apiRequest(`${TENANT_API}/${tenantId}/`, {
    method: "PUT",
    body: JSON.stringify(tenantData),
  });
};

// -------------------------------------------------------------------
// 8. Partial Update Tenant (e.g. toggle is_active, update phone etc.)
//    PATCH /api/tenants/{tenant_id}/
// -------------------------------------------------------------------
export const patchTenant = async (tenantId, partialData) => {
  return await apiRequest(`${TENANT_API}/${tenantId}/`, {
    method: "PATCH",
    body: JSON.stringify(partialData),
  });
};

// -------------------------------------------------------------------
// 9. Activate / Deactivate a Tenant
//    PATCH /api/tenants/{tenant_id}/  →  { is_active: true/false }
// -------------------------------------------------------------------
export const setTenantActiveStatus = async (tenantId, isActive) => {
  return await patchTenant(tenantId, { is_active: isActive });
};

// -------------------------------------------------------------------
// 10. Delete Tenant
//     DELETE /api/tenants/{tenant_id}/
// -------------------------------------------------------------------
export const deleteTenant = async (tenantId) => {
  return await apiRequest(`${TENANT_API}/${tenantId}/`, {
    method: "DELETE",
  });
};

// -------------------------------------------------------------------
// 11. Filter Tenants by Type
//     GET /api/tenants/tenant/?tenant_type=BANK
//     tenant_type: BANK | NBFC | P2P | FINTECH
// -------------------------------------------------------------------
export const getTenantsByType = async (tenantType, params = {}) => {
  return await getAllTenants({ ...params, tenant_type: tenantType });
};

// -------------------------------------------------------------------
// 12. Search Tenants by name / email / slug
//     GET /api/tenants/tenant/?search=acme
// -------------------------------------------------------------------
export const searchTenants = async (searchQuery, params = {}) => {
  return await getAllTenants({ ...params, search: searchQuery });
};

// -------------------------------------------------------------------
// 13. Filter Active / Inactive Tenants
//     GET /api/tenants/tenant/?is_active=true
// -------------------------------------------------------------------
export const getActiveTenants = async () => {
  return await getAllTenants({ is_active: true });
};

export const getInactiveTenants = async () => {
  return await getAllTenants({ is_active: false });
};

// -------------------------------------------------------------------
// 14. Master Admin Login (get JWT tokens)
//     POST /api/tenants/login/
// -------------------------------------------------------------------
export const masterAdminLogin = async (email, password) => {
  const data = await apiRequest(`${TENANT_API}/login/`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  // Store tokens for subsequent requests
  if (data?.access) localStorage.setItem("access_token", data.access);
  if (data?.refresh) localStorage.setItem("refresh_token", data.refresh);

  return data;
};

// -------------------------------------------------------------------
// 15. Refresh JWT Access Token
//     POST /api/token/refresh/   (simplejwt default endpoint)
// -------------------------------------------------------------------
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) throw new Error("No refresh token. Please login again.");

  const response = await fetch(`${BASE_URL}/api/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data?.detail || "Token refresh failed.");

  localStorage.setItem("access_token", data.access);
  return data.access;
};