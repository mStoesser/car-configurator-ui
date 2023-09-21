
const carConfiguratorUrl = 'http://localhost:8080/api/'

export function listCarConfigurations() {
    return fetch(`${carConfiguratorUrl}configuration/`).then(res => res.json())
}
export function loadCarConfiguration(id) {
    return fetch(`${carConfiguratorUrl}configuration/${id}`).then(res => res.json())
}

export function createCarConfiguration(configuration) {
    return fetch(`${carConfiguratorUrl}configuration/`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(configuration),
    }).then(res => res.json())
}
export function updateCarConfiguration(id, configuration) {
    return fetch(`${carConfiguratorUrl}configuration/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(configuration),
    }).then(res => res.json())
}
export function deleteCarConfiguration(id) {
    return fetch(`${carConfiguratorUrl}configuration/${id}`, { method: "DELETE" })
}

export function validateCarConfiguration(configuration) {
    return fetch(`${carConfiguratorUrl}configuration/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(configuration),
    }).then(res => res.json())
}


export function listProducts() {
    return fetch(`${carConfiguratorUrl}product/`).then(res => res.json())
}
export function loadProduct(id) {
    return fetch(`${carConfiguratorUrl}product/${id}`).then(res => res.json())
}
export function listProductAxis(id) {
    return fetch(`${carConfiguratorUrl}product/${id}/axis`).then(res => res.json())
}

