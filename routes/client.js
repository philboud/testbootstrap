var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Client = require('../models/Client.js');


/* GET ALL clientS */
router.get('/', function(req, res, next) {
  Client.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE client BY ID */
router.get('/:id', function(req, res, next) {
  Client.findById(req.params.id, function (err, post) {
    if (err) return next(err);Client
    res.json(post);
  });
});

/* SAVE client */
router.post('/', function(req, res, next) {
  Client.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE client */
router.put('/:id', function(req, res, next) {
  Client.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE client */
router.delete('/:id', function(req, res, next) {
  Client.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
