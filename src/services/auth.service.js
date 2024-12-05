import httpClient from "../http-common";


const auth = (data) => {
    return httpClient.post("auth/", data);
}

export default auth;