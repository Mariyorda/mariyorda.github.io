(function () {
    Array.from(document.getElementsByClassName("header__navigation-link")).forEach(link => {
      if (link.href === window.location.href) {
        console.log(link.href, window.location.href);
        link.classList.add("header__navigation-link_is-active");
      }
    });
})();
