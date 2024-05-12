require('dotenv').config()
const mongoose = require('mongoose')
const Books = require('../models/Book.model')
const apiService = require('../services/api.service')



const MONGO_URI = process.env.MONGODB_URI

mongoose
    .set('strictQuery', false)
    .connect(MONGO_URI)
    .then(() => {
        return Books.collection.drop()
    })
    .then(()=>{
        return apiService.getAllBooks()
    })
    .then((allBooks) => {
        const treatedBooks = allBooks.data.data.map(book => {
            const treatedVillains = book.villains.map(villain => {
                const id = villain.url.match(/\/(\d+)$/)[1];
                return { name: villain.name, id: parseInt(id) };
            });
            return { ...book, villains: treatedVillains };
        });
        return Books.insertMany(treatedBooks);
    })
    .then( data => {
        console.log('Se han creado', data.length, 'books')
    })
    .finally(() => {
        mongoose.connection.close()
    })
    .catch(err => console.log(err))