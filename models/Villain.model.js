const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2')


const villainSchema = new Schema(
    {
        id: {
            type: Number,
            unique: true
        },
        name: {
            type: String,
        },
        gender: {
            type: String,
        },
        status: {
            type: String,
        },
        types_id: {
            type: String,
        },
        notes: {
            type: [String],
        },
        created_at: {
            type: String,
        },
        books: [{
            title: {type: String},
            id: {type: Number}
        }],
        shorts: [{
            title: {type: String},
            id: {type: Number}
        }],
    })

    
villainSchema.plugin(mongoosePaginate);  
const Villain = model("Villain", villainSchema);

module.exports = Villain;