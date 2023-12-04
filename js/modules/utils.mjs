export function createCustomEvent(name, detailObject) {
    return new CustomEvent(name, { detail: detailObject });
}
