const __UTILS__ = (function() {
    function createCustomEvent(name, detailObject) {
        return new CustomEvent(name, {detail: detailObject});
    }

    return { createCustomEvent }
})();
