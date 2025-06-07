import httpClient from "../http-common";

const create = (data) =>{
  return httpClient.post("/evaluations/",data)
}
const get = () => {
    return httpClient.get("/evaluations/");
}

const remove = id=>{
    return  httpClient.delete(`/evaluations/${id}`,id);
}



export default {create,get,remove} ;