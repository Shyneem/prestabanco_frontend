import axios from "axios";

const prestabancoGatewayServer = import.meta.env.VITE_PRESTABANCO_GATEWAY_IP;
const prestabancoGatewayPort = import.meta.env.VITE_PRESTABANCO_GATEWAY_PORT;

console.log("Ip backend: "+ prestabancoGatewayServer)
console.log("Puerto backend: "+prestabancoGatewayPort)

export default axios.create({
    baseURL: `http://${prestabancoGatewayServer}:${prestabancoGatewayPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});