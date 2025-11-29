import { apiDelete, apiGet, apiPatch } from "./laravelApis";

export async function getAllOrders() {
  return await apiGet("/all_orders");
}

export async function getOrder(id) {
  return await apiGet(`/order/${id}`);
}

export async function updateOrderDetails(id, data) {
  return await apiPatch(`/update_order_details/${id}`, data);
}

export async function deleteOrder(id) {
  return await apiDelete(`/delete_order/${id}`);
}
