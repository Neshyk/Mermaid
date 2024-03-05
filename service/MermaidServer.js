class MermaidServer {
    constructor() {
        this.mermaidServer = process.env.MERMAID_SERVER;
        this.mermaidServerUrl = `http://${this.mermaidServer}/generate`;
    }

    async getDiagramBuffer(mermaidDefinition, type) {
        const mermaidServerUrlWithParams = `${this.mermaidServerUrl}?type=${encodeURIComponent(type)}`;

        console.log(mermaidServerUrlWithParams);
        const response = await fetch(mermaidServerUrlWithParams, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: mermaidDefinition
        });

        if (!response.ok) {
            throw new Error('Failed to generate diagram from Mermaid server');
        }

        const buffer = await response.arrayBuffer();
        return buffer;
    }
}

module.exports = MermaidServer;