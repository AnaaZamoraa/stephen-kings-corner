const axios = require('axios')

class ApiService {
    constructor() {
    this.api = axios.create({
        baseURL: 'https://stephen-king-api.onrender.com'
    });
    }

    getAllBooks = () => {
    return this.api.get('/api/books');
    };

    getBookById = (id) => {
    return this.api.get(`/api/books/${id}`);
    }

    getAllVillains = () => {
        return this.api.get('api/villains');
    }

    getVillainById = (id) => {
        return this.api.get(`/api/villain/${id}`)
    }

    getAllShorts = () => {
        return this.api.get('api/shorts')
    }

    getShortById = (id) => {
        return this.api.get(`/api/short(${id})`)
    }
}

const myApiService = new ApiService()
module.exports = myApiService;
