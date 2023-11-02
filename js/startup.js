(function () {
    const startTimestamp = Date.now();
  
    function onContentLoaded() {
      const footer = document.querySelector("footer.footer .footer__load-time");
      footer.textContent = `Page loaded in ${(Date.now() - startTimestamp) / 1000}s`;
      window.removeEventListener("DOMContentLoaded", onContentLoaded);
    };
  
    window.addEventListener("DOMContentLoaded", onContentLoaded);
})();
