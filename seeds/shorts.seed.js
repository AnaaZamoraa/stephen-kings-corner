require('dotenv').config()
const mongoose = require('mongoose')
const Shorts = require('../models/Short.model')
const apiService = require('../services/api.service')



const MONGO_URI = process.env.MONGODB_URI

mongoose
    .set('strictQuery', false)
    .connect(MONGO_URI)
    .then(() => {
        return Shorts.collection.drop()
    })
    .then(()=>{
        return apiService.getAllShorts()
    })
    .then((allShorts) => {
        const treatedShorts = allShorts.data.data.map(short => {
            const treatedVillains = short.villains.map(villain => {
                const id = villain.url.match(/\/(\d+)$/)[1];
                return { name: villain.name, id: parseInt(id) };
            });
            return { ...short, villains: treatedVillains };
        });
        return Shorts.insertMany(treatedShorts);

    })
    .then( data => {
        console.log('Se han creado', data.length, 'shorts')
    })
    .finally(() => {
        mongoose.connection.close()
    })
    .catch(err => console.log(err))