import httpClient from "../http-common";


const create = data => {
    return httpClient.post("/api/v1/loanRequest/", data);
}



export default {create} ;