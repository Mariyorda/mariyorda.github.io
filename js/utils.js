const __UTILS__ = (function() {
    function createCustomEvent(name, detailObject) {
        return new CustomEvent(name, {
            bubbles: false,
            detail: detailObject,
        });
    }

    return { createCustomEvent }
})();
