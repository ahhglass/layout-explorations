/**
 * Подставляет полный URL для og:url и canonical после деплоя.
 * Картинки с путём /static/... краулеры и так резолвят от домена ссылки.
 */
(function () {
  const origin = window.location.origin;
  if (!origin || origin === "null" || origin.startsWith("file:")) return;

  const url = origin + window.location.pathname;

  const setMeta = (attr, key, content) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  setMeta("property", "og:url", url);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = url;

  const imagePath = "/static/image/blue-orange-001.jpg";
  const imageUrl = origin + imagePath;
  setMeta("property", "og:image", imageUrl);
  setMeta("name", "twitter:image", imageUrl);
})();
