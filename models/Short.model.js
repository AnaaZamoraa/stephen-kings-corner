const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2')

const shortSchema = new Schema(
    {
        id: {
            type: Number,
            unique: true
        },
        title: {
            type: String,
        },
        type: {
            type: String,
        },
        handle: {
            type: String,
        },
        originallyPublishedIn: {
            type: String
        },
        collectedIn: {
            type: String,
        },
        notes: {
            type: [String],
        },
        year: {
            type: Number
        },
        created_at: {
            type: String,
        },
        villains: [{
            name: {type: String},
            id: {type: Number}
        }]
    })

shortSchema.plugin(mongoosePaginate);      
const Short = model("Short", shortSchema);

module.exports = Short;