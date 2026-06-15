export function parseJwt(token) {
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getTokenRole() {
  const token = getToken();
  const payload = parseJwt(token);
  return payload?.role?.toUpperCase() || null;
}

export function isAdmin() {
  return getTokenRole() === "ADMIN";
}

export function isAuthenticated() {
  return !!getToken();
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
