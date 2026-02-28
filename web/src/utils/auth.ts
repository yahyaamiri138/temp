export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role; // ROLE_ADMIN یا ROLE_USER
  } catch {
    return null;
  }
};
