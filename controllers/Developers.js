'use strict';

var utils = require('../utils/writer.js');
var Developers = require('../service/DevelopersService');

module.exports.generate = function generate (req, res, next, diagram, type) {
  Developers.generate(diagram, type)
    .then(function (response) {
      // Set the Content-Type header to indicate a binary file
      res.setHeader('Content-Type', 'image/png');
      // Write the binary data to the response object
      res.end(Buffer.from(response), 'binary');
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.generateByPost = function generateByPost (req, res, next, body, type) {
  Developers.generateByPost(body, type)
    .then(function (response) {
      // Set the Content-Type header to indicate a binary file
      res.setHeader('Content-Type', 'image/png');
      // Write the binary data to the response object
      res.end(Buffer.from(response), 'binary');
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.generateByPostSrc = function generateByPostSrc (req, res, next, body, type) {
  Developers.generateByPostSrc(body, type)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.generateSrc = function generateSrc (req, res, next, diagram, type) {
  Developers.generateSrc(diagram, type)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
