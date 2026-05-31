export const getTheme = () => {
  return localStorage.getItem("theme") || "dark";
};

export const toggleTheme = () => {
  const current = getTheme();
  const next = current === "dark" ? "light" : "dark";

  localStorage.setItem("theme", next);

  return next;
};