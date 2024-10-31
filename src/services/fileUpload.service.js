import httpClient from "../http-common";


const create = (formData) => {
    return httpClient.post("/api/v1/upload/", formData,{
            headers:{
                "Content-Type" : "multipart/form-data",
            },
        });
}



export default {create} ;