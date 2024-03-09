"use strict";

const { v4: uuidv4 } = require("uuid");
const AzureBlobService = require("./AzureBlobService");
const MermaidServer = require("./MermaidServer");

const mermaidServerInstance = new MermaidServer();
const azureBlobServiceInstance = new AzureBlobService();

/**
 * Generates diagram or chart image by Mermaid and optionally hosts it with a public URL.
 *
 * @param {string} definition - Markdown-inspired text definitions to create and modify diagrams.
 * @param {string} type - The type of result (png or svg).
 * @param {boolean} [upload=false] - Whether to upload the image to Azure Blob Storage.
 * @returns {Promise<Buffer|string>} The diagram buffer or the URL of the uploaded image.
 */
async function generateDiagram(definition, type, upload = false) {
  try {
    // Get the diagram stream from Mermaid server
    const diagramBuffer = await mermaidServerInstance.getDiagramBuffer(
      definition,
      type
    );

    if (!upload) {
      return diagramBuffer;
    }

    // Generate unique filename
    const fileName = `diagram-${uuidv4()}.${Date.now()}.${encodeURIComponent(
      type
    )}`;

    // Upload the diagram stream to Azure Blob Storage and return the URL
    const url = await azureBlobServiceInstance.uploadBufferToBlob(
      diagramBuffer,
      fileName
    );
    return { url: url };
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

// Expose simplified API functions
exports.generate = (diagram, type) => generateDiagram(diagram, type);
exports.generateByPost = (body, type) => generateDiagram(body, type);
exports.generateSrc = (diagram, type) => generateDiagram(diagram, type, true);
exports.generateByPostSrc = (body, type) => generateDiagram(body, type, true);
