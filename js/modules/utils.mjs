export function createCustomEvent(name, detailObject) {
    return new CustomEvent(name, { detail: detailObject });
}

export function getUsersUrl() {
    const id = Math.floor(Math.random() * 10);
    return `https://jsonplaceholder.typicode.com/users?id_lte=${id}`;
}
