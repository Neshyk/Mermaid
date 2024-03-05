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
            const contentType = "image/png";
            const uploadOptions = {
                blobHTTPHeaders: {
                    blobContentType: contentType
                }
            };

            await blobClient.uploadData(diagramBuffer,uploadOptions);
            return blobClient.url;
        } catch (error) {
            console.error("Failed to upload stream to blob", error);
            throw error;
        }
    }
}

module.exports = AzureBlobService;