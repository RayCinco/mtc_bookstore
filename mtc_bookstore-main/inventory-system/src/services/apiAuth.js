import { login as loginApi, laravelApiUrl } from "./laravelApis";

export async function login({ email, password }) {
  const data = await loginApi({ email, password });

  if (data.error) {
    throw new Error(data.error);
  }

  // Store user data in localStorage
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
}

export async function getCurrentUser() {
  // Get user from localStorage
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
}

export async function logout() {
  localStorage.removeItem("user");
}

export async function updateUserAvatar(avatarFile) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const formData = new FormData();
  formData.append("avatar", avatarFile);
  formData.append("user_id", user.id);

  try {
    const response = await fetch(`${laravelApiUrl}/update-avatar`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
      // Don't set Content-Type header - browser will set it with boundary
    });

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      // non-json response
      console.error("Non-JSON response from avatar upload:", text);
      throw new Error(`Avatar upload failed: non-JSON response`);
    }

    if (!response.ok) {
      const message =
        data?.error || data?.message || `Status ${response.status}`;
      console.error("Avatar upload error response:", data);
      throw new Error(message);
    }

    if (data?.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error("Avatar Upload Error:", error);
    throw error;
  }
}
