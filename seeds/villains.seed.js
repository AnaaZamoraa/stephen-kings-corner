require('dotenv').config()
const mongoose = require('mongoose')
const Villain = require('../models/Villain.model')
const apiService = require('../services/api.service')



const MONGO_URI = process.env.MONGODB_URI

mongoose
    .set('strictQuery', false)
    .connect(MONGO_URI)
    .then(() => {
        return Villain.collection.drop()
    })
    .then(()=>{
        return apiService.getAllVillains()
    })
    .then((allVillains) => {
        const treatedVillains = allVillains.data.data.map(villain => {
            const treatedBooks = villain.books.map(book => {
                const id = book.url.match(/\/(\d+)$/)[1];
                return { title: book.title, id: parseInt(id) };
            });
            return { ...villain, books: treatedBooks };
        });
        return Villain.insertMany(treatedVillains);

    })
    .then( data => {
        console.log('Se han creado', data.length, 'villains')
    })
    .finally(() => {
        mongoose.connection.close()
    })
    .catch(err => console.log(err))