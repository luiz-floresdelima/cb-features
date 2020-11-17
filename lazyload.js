let observer_img = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        observer.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "0px 0px 200px 0px" }
);

document.querySelectorAll("[data-src]").forEach((img) => {
  observer_img.observe(img);
});
document.querySelectorAll("iframe[data-src]").forEach((iframe) => {
  iframe.dataset.src === undefined ? observer_img.observe(iframe) : "";
});
