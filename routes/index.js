const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../app/models/config');


router.get('/', (req, res, next) => {
    return res.render('index');
});

router.get('/room', (req, res, next) => {
    return res.render('room');
});

module.exports = router;