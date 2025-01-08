import httpClient from "../http-common";


const create = (id,data) => {
    return httpClient.post(`users/saveLoan/${id}`, data);
}
const get = id => {
    return httpClient.get(`/users/loanRequest/${id}`);
}
const remove = id=>{
    return  httpClient.delete(`/loanRequest/${id}`,id);
}
const update = (id, statusUpdate) => {
    return httpClient.put(`/loanRequest/${id}`, { state: statusUpdate });
  };



export default {create,get,remove,update} ;