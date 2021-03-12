const webpack = require('webpack');
const path = require('path');
const colors = require('colors');

const isDevBuild = process.argv[1].indexOf('webpack-dev-server') !== -1;
const dhisConfigPath = process.env.DHIS2_HOME && `${process.env.DHIS2_HOME}/config`;
let dhisConfig;

try {
    dhisConfig = require(dhisConfigPath);
    console.log('\nLoaded DHIS config:');
} catch (e) {
    // Failed to load config file - use default config
    console.warn('\nWARNING! Failed to load DHIS config:', e.message);
    console.info('Using default config');
    dhisConfig = {
        baseUrl: process.env.DHIS2_BASE_URL || 'http://localhost:8080',
        authorization: 'Basic YWRtaW46ZGlzdHJpY3Q=', // admin:district
    };
}
console.log(JSON.stringify(dhisConfig, null, 2), '\n');

function log(req, res, opt) {
    console.log('[PROXY]'.cyan.bold, req.method.green.bold, req.url.magenta, '=>'.dim, opt.target.dim);
}

const webpackConfig = {
    context: __dirname,
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
        path: `${__dirname}/build`,
        filename: 'app.js',
        publicPath: 'http://localhost:8081/',
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
        ],
    },
    devServer: {
        port: 8081,
        inline: true,
        // compress: true,
        historyApiFallback: true,
        proxy: [
            { path: ['/api', '/dhis-web-commons'], target: dhisConfig.baseUrl, bypass: log },
            { path: '/polyfill.min.js', target: 'http://localhost:8081/node_modules/babel-polyfill/dist', bypass: log },
        ],
    },
};

if (!isDevBuild) {
    webpackConfig.plugins = [
        // Replace any occurance of process.env.NODE_ENV with the string 'production'
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
            DHIS_CONFIG: JSON.stringify({}),
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
    ];
} else {
    webpackConfig.plugins = [
        new webpack.DefinePlugin({
            DHIS_CONFIG: JSON.stringify(dhisConfig),
        }),
    ];
}

module.exports = webpackConfig;
