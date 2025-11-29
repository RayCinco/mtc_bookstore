import { apiDelete, apiGet, apiPatch } from "./laravelApis";

export async function getUsers() {
  return await apiGet("/users");
}

export async function getStaffUsers() {
  return await apiGet("/user_staffs");
}

export async function updateUserRole(userId, role) {
  return await apiPatch(`/update_user_role/${userId}`, { role });
}

export async function getCustomers() {
  return apiGet("/customers");
}

export async function deleteUser(userId) {
  return apiDelete(`/delete_user/${userId}`);
}
