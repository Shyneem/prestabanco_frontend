import httpClient from "../http-common";

const getAll = (rut) => {
    return httpClient.get('/api/v1/simulations/',(params(rut)));
}

const calculatePayment = data => {
    return httpClient.post("/api/v1/simulations/monthly-payment", data);
}

const get = id => {
    return httpClient.get(`/api/v1/simulations/${id}`);
}

const update = data => {
    return httpClient.put('/api/v1/simulations/', data);
}

const remove = id => {
    return httpClient.delete(`/api/v1/simulations/${id}`);
}
export default { getAll, calculatePayment, get, update, remove };