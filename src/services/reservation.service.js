import httpClient from "../http-common";


const create = data => {
    return httpClient.post("/reserve/", data);
}


export default { create };