const router = require('express').Router()
const bcryptjs = require('bcryptjs');
const saltRounds = 10
const User = require('../models/User.model');
const multer = require('multer');
const fileUploader = require('../config/cloudinary.config.js');
const { isThisRole, isProfileOwner } = require('../utils/index.js')


// Sign Up

router.get("/signup", (req, res, next) => {
    res.render("auth/sign-up");
});

router.post('/signup', fileUploader.single('profileImg'), (req, res, next) => {
    const { username, email, favoriteBook, description, password } = req.body;
    let profileImg = req.file?.path;

    User.findOne({ username })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).render("auth/sign-up", {
                    errorMessage: "Username already exists. Please choose another one."
                });
            }

            return User.findOne({ email });
        })
        .then(existingEmail => {
            if (existingEmail) {
                return res.status(400).render("auth/sign-up", {
                    errorMessage: "Email already exists. Please use another email."
                });
            }

            return bcryptjs.genSalt(saltRounds);
        })
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
            return User.create({
                username,
                email,
                favoriteBook,
                description,
                profileImg,
                password: hashedPassword
            });
        })
        .then(userFromDB => {
            res.redirect('/login');
        })
        .catch(error => {
            if (error.code === 11000) {
                let errorMessage = "Something went wrong. Please try again.";
                if (error.keyPattern.username) {
                    errorMessage = "Username already exists. Please choose another one.";
                } else if (error.keyPattern.email) {
                    errorMessage = "Email already exists. Please use another email.";
                }
                return res.status(400).render("auth/sign-up", {
                    errorMessage
                });
            } else {
                console.error("Error during sign up:", error);
                return res.status(500).render("auth/sign-up", {
                    errorMessage: "Something went wrong. Please try again later."
                });
            }
        });
});

// Login

router.get('/login', (req, res)=>{
    res.render("auth/login");
})

router.post('/login', (req, res, next)=>{
    const { username, password } = req.body;
    if (username === '' || password === '') {
        res.render('auth/login', {
            errorMessage: 'Please enter both, username and password to login.'
        });
        return;
    }
    
    User
    .findOne({ username })
    .then(user => {
        if (!user) {
            res.render('auth/login', { errorMessage: 'Incorrect credentials' });
            return;
        } else if (bcryptjs.compareSync(password, user.password)) {
            req.session.currentUser = user;
            res.redirect('/userProfile');
        } else {
            res.render('auth/login', { errorMessage: 'Incorrect credentials' });
        }
    })
    .catch(error => next(error));
})

// Log out

router.post('/logout', (req, res, next) => {
    req.session.destroy(() => res.redirect('/login'))
})


router.get('/userProfile', (req, res) => {
    const id = req.session.currentUser._id;
    const canEditOrDelete = isThisRole(req.session.currentUser, ['ADMIN', 'DEV']);
    const isOwner = isProfileOwner(req.session.currentUser, id);
    User
        .findById(id)
        .populate('favorites.books favorites.villains favorites.shorts')
        .then(user => {
            res.render('users/user-profile', { 
                user: req.session.currentUser, 
                favBooks: user.favorites.books, 
                favVillains: user.favorites.villains, 
                favShorts: user.favorites.shorts, 
                canEditOrDelete,
                isOwner })
        })
});


module.exports = router;
