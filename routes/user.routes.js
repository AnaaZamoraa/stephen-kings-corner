const router = require('express').Router()
const { isLogged, checkRoles, checkOwnAccountOrRoles } = require('../middlewares/auth.middleware');
const { isThisRole, isProfileOwner } = require('../utils/index.js')
const User = require('../models/User.model');
const multer = require('multer');
const fileUploader = require('../config/cloudinary.config.js');
const myApiService = require('../services/api.service.js')

// List of users
router.get('/users', (req, res, next) => {
    User
    .find()
    .then(users => {
        res.render('users/users-list', {users})
    })
    .catch(error => next(error))
})

// User details
router.get('/users/:id', (req, res, next) => {
    const { id } = req.params
    let canEditOrDelete = false
    let isOwner = false
    if (req.session.currentUser){
      canEditOrDelete = isThisRole(req.session.currentUser, ['ADMIN', 'DEV'])
      isOwner = isProfileOwner(req.session.currentUser, id)
    }
    User
      .findById(id)
      .populate('favorites.books favorites.villains favorites.shorts')
      .then(user => {
        // res.json(user)
        res.render('users/user-profile', { 
          user, 
          favBooks: user.favorites.books, 
          favVillains: user.favorites.villains, 
          favShorts: user.favorites.shorts, 
          canEditOrDelete,
          isOwner })
      })
      .catch(error => next(error))
})

// Delete user

router.post('/users/:id/delete', isLogged, checkRoles("DEV", "ADMIN"), (req, res, next) => {
    const { id } = req.params
    User
    .findByIdAndDelete(id)
    .then(()=>{
        res.redirect('/users')
    })
    .catch(error => next(error))
})

// Edit user
router.get('/users/:id/edit', isLogged, checkOwnAccountOrRoles, (req, res, next) => {
    const { id } = req.params

    User
    .findById(id)
    .then(details=>{
      res.render('users/user-update', {details})
    })
    .catch(error => next(error))
  });
  
  router.post('/users/:id/edit', isLogged, checkOwnAccountOrRoles, fileUploader.single('profileImg'), (req, res, next) => {
    const { id } = req.params
    const { username, email, favoriteBook, description } = req.body
    let profileImg = req.file?.path;
    
    console.log(profileImg)
    User
    .findByIdAndUpdate(id, { username, email, favoriteBook, description, profileImg })
    .then(user =>{
      req.session.currentUser = user;
      res.redirect(`/users/${id}`)
    })
    .catch(error => next(error))
  });
  
  module.exports = router