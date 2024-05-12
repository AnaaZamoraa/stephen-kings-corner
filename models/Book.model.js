const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2')

const bookSchema = new Schema(
    {
        id: {
            type: Number,
            unique: true
        },
        Year: {
            type: Number,
        },
        Title: {
            type: String,
        },
        handle: {
            type: String,
        },
        Publisher: {
            type: String,
        },
        ISBN: {
            type: String,
        },
        Pages: {
            type: Number,
        },
        Notes: {
            type: [String],
        },
        created_at: {
            type: String,
        },
        villains: [{
            name: {type: String},
            id: {type: Number}
        }]
    })

bookSchema.plugin(mongoosePaginate);  
const Book = model("Book", bookSchema);

module.exports = Book;