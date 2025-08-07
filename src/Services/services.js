import axios from "axios";

const apiPorta = 5289

//apiLocal ela recebe o endereço da api
const apiLocal = `http://localhost:${apiPorta}/api/`;

const apiAzure = "https://apieventlucas-etc6fad7hpede9bt.brazilsouth-01.azurewebsites.net/api/";

const api = axios.create({
    baseURL: apiLocal
});

export default api;
