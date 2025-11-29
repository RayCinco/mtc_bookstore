import { apiGet, apiPost, apiDelete } from "./laravelApis";
import { getCurrentUser } from "./apiAuth";
/**
 * Contact API helper
 * Provides simple wrappers around the backend contact message endpoints.
 */

export async function createMessage({ subject, message }) {
  const user = await getCurrentUser();
  const user_id = user?.id || null;
  const name = user?.name || "Guest";
  const email = user?.email || "guest@example.com";
  const payload = { user_id, name, email, subject, message };
  return apiPost("/create_message", payload);
}

export async function deleteMessage(messageId) {
  return apiDelete(`/delete_message/${messageId}`);
}

export async function getMessages() {
  const user = await getCurrentUser();
  const userId = user?.id || null;
  return apiGet(`/messages/${userId}`);
}
