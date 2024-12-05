import httpClient from "../http-common";


const create = data => {
    return httpClient.post("users/saveLoan/1", data);
}
const get = id => {
    return httpClient.get(`/users/loanRequest/${id}`);
}



export default {create,get} ;