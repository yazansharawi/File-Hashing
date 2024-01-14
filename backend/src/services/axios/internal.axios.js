const axios = require('axios');
const API_LINK = "http://127.0.0.1:3000/api/"

const internalAxios = axios.create({
    baseURL: API_LINK,
});

module.exports = internalAxios;