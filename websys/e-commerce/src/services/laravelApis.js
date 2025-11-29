export const laravelApiUrl = `${import.meta.env.VITE_LARAVEL_API_URL}`;

export async function apiGet(endpoint) {
  const res = await fetch(`${laravelApiUrl}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const contentType = res.headers.get("content-type") || "";

  // If response is JSON, parse and return (or throw with server-provided error)
  if (contentType.includes("application/json")) {
    const data = await res.json();
    if (!res.ok) {
      const message = data?.error || data?.message || JSON.stringify(data);
      throw new Error(message);
    }
    return data;
  }

  // Non-JSON response (likely HTML) — return the body text in the error to help diagnose
  const text = await res.text();
  throw new Error(
    `Expected JSON but received '${
      contentType || "text/html"
    }'. Response body:\n${text.slice(0, 2000)}`
  );
}

export async function apiPost(endpoint, data) {
  const res = await fetch(`${laravelApiUrl}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const json = await res.json();
    if (!res.ok)
      throw new Error(json?.error || json?.message || JSON.stringify(json));
    return json;
  }
  const text = await res.text();
  throw new Error(
    `Expected JSON but received '${contentType || "text/html"}':\n${text.slice(
      0,
      2000
    )}`
  );
}

export async function apiDelete(endpoint) {
  const res = await fetch(`${laravelApiUrl}${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const json = await res.json();
    if (!res.ok)
      throw new Error(json?.error || json?.message || JSON.stringify(json));
    return json;
  }
  const text = await res.text();
  throw new Error(
    `Expected JSON but received '${contentType || "text/html"}':\n${text.slice(
      0,
      2000
    )}`
  );
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
  console.log(`${laravelApiUrl}/login`, payload);
  try {
    const response = await fetch(`${laravelApiUrl}/login`, {
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
