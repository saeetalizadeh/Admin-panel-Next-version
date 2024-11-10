"use client";
function setCookie(name, value) {
  if (typeof document === "undefined") return;
  const maxAge = 30 * 24 * 60 * 60;
  document.cookie = `${name}=${value}; max-age=${maxAge}; path=/`;
}

function getCookie(name) {
  if (typeof document === "undefined") return;

  const value = `; ${document?.cookie}`;
  const parts = value?.split(`; ${name}=`);
  if (parts?.length === 2) return parts?.pop()?.split(";")?.shift();
}

export { setCookie, getCookie };
