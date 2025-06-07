import axios from "axios";


const kartingGatewayServer = import.meta.env.VITE_KARTING_GATEWAY_IP;
const kartingGatewayPort = import.meta.env.VITE_KARTING_GATEWAY_PORT;

console.log("Ip backend: "+ kartingGatewayServer)
console.log("Puerto backend: "+ kartingGatewayPort)

export default axios.create({
    baseURL: `http://${kartingGatewayServer}:${kartingGatewayPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});