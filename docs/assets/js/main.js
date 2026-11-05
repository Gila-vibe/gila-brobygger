(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    });
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
