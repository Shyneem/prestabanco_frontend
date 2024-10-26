import axios from "axios";

const prestabancoBackendServer = import.meta.env.VITE_PRESTABANCO_BACKEND_SERVER;
const prestabancoBackendPort = import.meta.env.VITE_PRESTABANCO_BACKEND_PORT;

console.log("Ip backend: "+ prestabancoBackendServer)
console.log("Puerto backend: "+prestabancoBackendPort)

export default axios.create({
    baseURL: `http://${prestabancoBackendServer}:${prestabancoBackendPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});