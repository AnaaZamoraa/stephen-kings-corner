const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    favoriteBook: {
      type: String,
    },
    description: {
      type: String,
    },
    profileImg: { 
      type: String, 
      default: 'https://i.pinimg.com/564x/52/47/8f/52478f6acc768c215a302af9b27caf4d.jpg' 
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER', 'DEV'],
      default: 'USER'
    },
    favorites: {
      books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
      }],
      villains: [{
        type: Schema.Types.ObjectId,
        ref: 'Villain'
      }],
      shorts: [{
        type: Schema.Types.ObjectId,
        ref: 'Short'
      }]
    },
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
