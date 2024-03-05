"use strict";

const { v4: uuidv4 } = require("uuid");
const AzureBlobService = require("./AzureBlobService");
const MermaidServer = require("./MermaidServer");

const mermaidServerInstance = new MermaidServer();
const azureBlobServiceInstance = new AzureBlobService();

/**
 * generate diagram or chart image by Mermaid
 * By passing in the appropriate options, you can generate diagram or chart in png format
 *
 * diagram String Text definition of the diagram
 * type String The type of result (png or svg)
 * returns byte[]
 **/
exports.generate = function (diagram, type) {
  return new Promise(async (resolve, reject) => {
    try {
      const mermaidDefinition = diagram; // Assuming the request param URI encoded
      const imageType = type; // Assuming type is passed as a query parameter

      // Get the diagram stream from Mermaid server
      const diagramBuffer = await mermaidServerInstance.getDiagramBuffer(
        mermaidDefinition,
        imageType
      );
      resolve(diagramBuffer);
    } catch (error) {
      console.log(error);
      // Handle any errors that occur during the call to MermaidServer
      reject(error);
    }
  });
};

/**
 * generate diagram or chart image by Mermaid
 * By passing in the appropriate options, you can generate diagram or chart in png format
 *
 * body String Markdown-inspired text definitions to create and modify diagrams (optional)
 * type String The type of result (png or svg)
 * returns byte[]
 **/
exports.generateByPost = function (body, type) {
  return new Promise(async (resolve, reject) => {
    try {
      const mermaidDefinition = body; // Assuming the body is text/plain
      const imageType = type; // Assuming type is passed as a query parameter

      // Get the diagram stream from Mermaid server
      const diagramBuffer = await mermaidServerInstance.getDiagramBuffer(
        mermaidDefinition,
        imageType
      );
      resolve(diagramBuffer);
    } catch (error) {
      console.log(error);
      // Handle any errors that occur during the call to MermaidServer
      reject(error);
    }
  });
};

/**
 * generate diagram or chart image by Mermaid and host it with public URL
 * By passing in the appropriate options, you can generate diagram or chart in png format
 *
 * body String Markdown-inspired text definitions to create and modify diagrams (optional)
 * type String The type of result (png or svg)
 * returns String
 **/
exports.generateByPostSrc = function (body, type) {
  return new Promise(async (resolve, reject) => {
    try {
      const mermaidDefinition = body; // Assuming the body is text/plain
      const imageType = type; // Assuming type is passed as a query parameter

      // Get the diagram stream from Mermaid server
      const diagramBuffer = await mermaidServerInstance.getDiagramBuffer(
        mermaidDefinition,
        imageType
      );

      // Generate unique filename
      const fileName = `diagram-${uuidv4()}.${Date.now()}.${encodeURIComponent(
        imageType
      )}`;

      // Upload the diagram stream to Azure Blob Storage
      const url = await azureBlobServiceInstance.uploadBufferToBlob(
        diagramBuffer,
        fileName
      );
      resolve({
        url: url,
      });
    } catch (error) {
      console.log(error);
      // Handle any errors that occur during the call to MermaidServer
      reject(error);
    }
  });
};

/**
 * generate diagram or chart image by Mermaid and host it with public URL
 * By passing in the appropriate options, you can generate diagram or chart in png or svg format
 *
 * diagram String Text definition of the diagram
 * type String The type of result (png or svg)
 * returns String
 **/
exports.generateSrc = function (diagram, type) {
  return new Promise(async (resolve, reject) => {
    try {
      const mermaidDefinition = diagram; // Assuming the body is text/plain
      const imageType = type; // Assuming type is passed as a query parameter

      // Get the diagram stream from Mermaid server
      const diagramBuffer = await mermaidServerInstance.getDiagramBuffer(
        mermaidDefinition,
        imageType
      );

      // Generate unique filename
      const fileName = `diagram-${uuidv4()}.${Date.now()}.${encodeURIComponent(
        imageType
      )}`;

      // Upload the diagram stream to Azure Blob Storage
      const url = await azureBlobServiceInstance.uploadBufferToBlob(
        diagramBuffer,
        fileName
      );
      resolve({
        url: url,
      });
    } catch (error) {
      console.log(error);
      // Handle any errors that occur during the call to MermaidServer
      reject(error);
    }
  });
};
