import httpClient from "../http-common";


const create = (formData) => {
    return httpClient.post("/fileUpload/", formData,{
            headers:{
                "Content-Type" : "multipart/form-data",
            },
        });
}
const getFiles = loanRequestId =>{
    return httpClient.get(`/fileUpload/${loanRequestId}`);
}



export default {create,getFiles};