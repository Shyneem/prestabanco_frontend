import httpClient from "../http-common";

const getAll = (rut) => {
    return httpClient.get('/api/v1/simulations/',(params(rut)));
}

const calculatePayment = (id,data) => {
    return httpClient.post(`/users/saveSimulation/${id}`, data);
}

const get = id => {
    return httpClient.get(`/users/simulation/${id}`);
}

const update = data => {
    return httpClient.put('/simulations/', data);
}

const remove = id => {
    return httpClient.delete(`/simulations/${id}`);
}
export default { getAll, calculatePayment, get, update, remove };