(function () {
    const startTimestamp = Date.now();
  
    function onContentLoaded() {
      const footer = document.querySelector("footer.footer .footer__load-time");
      footer.textContent = `Page loaded in ${(Date.now() - startTimestamp) / 1000}s`;
  
      Array.from(document.getElementsByClassName("header__navigation-link")).forEach(link => {
        console.log(link, link.href, location.href);
        if (link.href === window.location.href) {
          link.classList.add("header__navigation-link_is-active");
        }
      });
  
      window.removeEventListener("DOMContentLoaded", onContentLoaded);
    };
  
    window.addEventListener("DOMContentLoaded", onContentLoaded);
})();
