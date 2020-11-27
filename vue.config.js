process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
    devServer: {
        host: 'appetiser.test',
        port: 8080,
        https: true
    },
    /* eslint-disable  */
    pwa: {
        name: 'Appetiser',
        themeColor: '#043B59',
        msTileColor: '#043B59',
        manifestOptions: {
            background_color: '#043B59'
        }
    }
};