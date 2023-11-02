(function () {
    const startTimestamp = Date.now();
  
    function onContentLoaded() {
      const footerLoadTime = document.querySelector("footer.footer .footer__load-time");
      footerLoadTime.textContent = `Page loaded in ${(Date.now() - startTimestamp) / 1000}s`;
      window.removeEventListener("DOMContentLoaded", onContentLoaded);
    };
  
    window.addEventListener("DOMContentLoaded", onContentLoaded);
})();
