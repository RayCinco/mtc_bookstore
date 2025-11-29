import { apiGet, apiPost } from "./laravelApis";
import { getCurrentUser } from "./apiAuth";
// Create a new order
export async function createOrder(orderData) {
  return await apiPost("/create_order", { order: orderData });
}

// Get order by ID
export async function getOrder(orderId) {
  return await apiGet(`/order/${orderId}`);
}

// Get orders by user ID (optional)
export async function getOrders() {
  const user = await getCurrentUser();
  const userId = user?.id; // Default to user ID 4 if not authenticated
  return await apiGet(`/orders/${userId}`);
}
