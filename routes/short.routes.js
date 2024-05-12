const router = require('express').Router();
const mongoose = require('mongoose');
const Short = require('../models/Short.model');
const User = require ('../models/User.model')
const { paginate } = require('mongoose-paginate-v2');
const ApiService = require('../services/api.service')

router.get('/', (req, res, next) => {
    res.redirect('/shorts/1');
});

router.get('/:page', (req, res, next) => {
    const page = parseInt(req.params.page);
    const options = {
        page: page || 1,
        limit: 60
    };

    Short.paginate({}, options)
    .then(result => {
        const nextPage = result.page + 1;
        const previousPage = result.page - 1;
        const arrayPages = []
        for (let i = 1; i <= result.totalPages; i++) {
            if(i === page){
                arrayPages.push({
                    page:i,
                    isActive: true
                });
            } else {
                arrayPages.push({
                    page:i,
                    isActive: false
                });
            }
        }
        const totalPages = arrayPages
        const pageRange = Array.from({ length: totalPages }, (_, i) => i + 1);
        res.render('shorts/list', { 
            shorts: result.docs, 
            totalPages, 
            currentPage: result.page,
            pageRange: pageRange,
            nextPage: nextPage > result.totalPages ? null : nextPage,
            previousPage: previousPage < 1 ? null : previousPage,
            isActive: result.page===page
        });
    })
    .catch(error => {
        console.error(error);
        next(error);
    });
})

router.get('/details/:id', (req, res, next) => {
    const idNew = req.params.id

    Short
    .findOne({id:idNew})
    .then(details => {
        res.render('shorts/details', { details })
    })
    .catch(error => next(error))
})

router.post('/:id/add-favorite', (req, res, next) => {
    const { id } = req.params
    const { _id: userId } = req.session.currentUser
    User
    .findByIdAndUpdate(userId, { $addToSet: { 'favorites.shorts': id } })
    .then(() =>  Short.findById(id))
    .then((short)=>{
        res.redirect(`/shorts/details/${short.id}`)
    })
    .catch(err => next(err))
})

router.post('/:id/quit-favorite', (req, res, next) => {

    const { id } = req.params
    const { _id: userId } = req.session.currentUser

    User
        .findByIdAndUpdate(userId, { $pull: { 'favorites.shorts': id } })
        .then(() =>  Short.findById(id))
        .then((short)=>{
            res.redirect(`/shorts/details/${short.id}`)
        })        
        .catch(err => next(err))
})

module.exports = router;