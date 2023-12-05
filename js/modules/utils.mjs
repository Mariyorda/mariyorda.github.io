export function createCustomEvent(name, detailObject) {
    return new CustomEvent(name, { detail: detailObject });
}

export function getUsersUrl() {
    const id = Math.floor(Math.random() * 20) + 1;
    return `https://jsonplaceholder.typicode.com/users?id_lte=${id}`;
}
