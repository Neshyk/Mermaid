const { BlobServiceClient } = require("@azure/storage-blob");
const config = require('dotenv').config(); // Assuming you're using dotenv to manage environment variables

class AzureBlobService {
    constructor() {
        this.blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
        this.containerName = process.env.CONTAINER_NAME;
    }

    async uploadBufferToBlob(diagramBuffer, fileName) {
        try {
            const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
            const blobClient = containerClient.getBlockBlobClient(fileName);
            await blobClient.uploadData(diagramBuffer);
            return blobClient.url;
        } catch (error) {
            console.error("Failed to upload stream to blob", error);
            throw error;
        }
    }
}

module.exports = AzureBlobService;