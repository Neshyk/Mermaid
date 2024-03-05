'use strict';


/**
 * generate diagram or chart image by Mermaid
 * By passing in the appropriate options, you can generate diagram or chart in png format 
 *
 * diagram String Text definition of the diagram
 * type String The type of result (png or svg)
 * returns byte[]
 **/
exports.generate = function(diagram,type) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * generate diagram or chart image by Mermaid
 * By passing in the appropriate options, you can generate diagram or chart in png format 
 *
 * body String Markdown-inspired text definitions to create and modify diagrams (optional)
 * type String The type of result (png or svg)
 * returns byte[]
 **/
exports.generateByPost = function(body,type) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * generate diagram or chart image by Mermaid and host it with public URL
 * By passing in the appropriate options, you can generate diagram or chart in png format 
 *
 * body String Markdown-inspired text definitions to create and modify diagrams (optional)
 * type String The type of result (png or svg)
 * returns String
 **/
exports.generateByPostSrc = function(body,type) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * generate diagram or chart image by Mermaid and host it with public URL
 * By passing in the appropriate options, you can generate diagram or chart in png or svg format 
 *
 * diagram String Text definition of the diagram
 * type String The type of result (png or svg)
 * returns String
 **/
exports.
generateSrc = function(diagram,type) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

