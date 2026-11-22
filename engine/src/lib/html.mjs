export function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

export function safeUrl(value = "") {
  const url = String(value);
  if (/^(https?:|mailto:|tel:|\/|#)/i.test(url) && !/^\/\//.test(url)) return url;
  throw new Error("Unsupported URL in page content: " + url);
}

export function attr(name, value) {
  return value == null ? "" : ` ${name}="${escapeHtml(value)}"`;
}
