export const SERVER_SETTINGS = {
    protocol: 'http',
    host: 'localhost',
    port: '8000',
    getUrl: () => `${SERVER_SETTINGS.protocol}://${SERVER_SETTINGS.host}:${SERVER_SETTINGS.port}`,
}