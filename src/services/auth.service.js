import httpClient from "../http-common";


const auth = data => {
    return httpClient.post("api/v1/auth/", data);
}

export default auth;