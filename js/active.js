(function () {
    const links = Array.from(document.getElementsByClassName("header__navigation-link"));
    console.log(links);

    links.forEach(link => {
      if (link.href === window.location.href) {
        link.classList.add("header__navigation-link_is-active");
      }
    });
})();
