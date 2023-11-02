(function () {
    const links = Array.from(document.getElementsByClassName("header__navigation-link"));
    const currentLocation = window.location.pathname === '/' ? `${window.location.href}index.html` : window.location.href;

    links.forEach(link => {
      if (link.href === currentLocation) {
        link.classList.add("header__navigation-link_active");
      }
    });
})();
