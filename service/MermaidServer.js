const { BlobServiceClient } = require("@azure/storage-blob");
const fetch = require("node-fetch");
const stream = require("stream");
const config = require('dotenv').config();

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerName = process.env.CONTAINER_NAME;
const mermaidServer = process.env.MERMAID_SERVER;
const mermaidServerUrl = "https://"+mermaidServer+"/generate";

module.exports = async function (context, req) {
    try {
        const mermaidDefinition = req.body; // Assuming the body is text/plain
        const containerClient = blobServiceClient.getContainerClient(containerName);

        // Send the Mermaid description to the Mermaid server
        const response = await fetch(mermaidServerUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: mermaidDefinition
        });

        if (!response.ok) throw new Error('Failed to generate diagram from Mermaid server');

        // Read the response stream
        const diagramStream = response.body;

        // Generate unique filename
        const fileName = `diagram-${Date.now()}.${response.headers.get('content-type').includes('png') ? 'png' : 'svg'}`;
        const blobClient = containerClient.getBlockBlobClient(fileName);

        // Stream the diagram to Azure Blob Storage
        await blobClient.uploadStream(diagramStream);

        // Create a URL to access the blob
        const url = blobClient.url;

        context.res = {
            body: { url }
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: "An error occurred processing your request."
        };
    }
};
