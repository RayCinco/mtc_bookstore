export const laravelApiUrl = `${import.meta.env.VITE_LARAVEL_API_URL}`;

export async function apiGet(endpoint) {
  const res = await fetch(`${laravelApiUrl}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export async function apiPost(endpoint, data) {
  const res = await fetch(`${laravelApiUrl}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function apiDelete(endpoint) {
  const res = await fetch(`${laravelApiUrl}${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export async function apiPatch(endpoint, data) {
  const res = await fetch(`${laravelApiUrl}${endpoint}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function signup({
  name,
  email,
  password,
  student_id,
  phone,
  role,
}) {
  const payload = { name, email, password, student_id, phone, role };
  try {
    const response = await fetch(`${laravelApiUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok)
      throw new Error(`Signup failed with status ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Laravel Signup Error:", error);
    throw error;
  }
}

export async function login({ email, password }) {
  const payload = { email, password };
  console.log(`${laravelApiUrl}/staff_login`, payload);
  try {
    const response = await fetch(`${laravelApiUrl}/staff_login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok)
      throw new Error(`Login failed with status ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Laravel Login Error:", error);
    throw error;
  }
}
