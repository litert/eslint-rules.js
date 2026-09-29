const config = require('../../config-templates/plugin-rule')(
    '@litert/disallow-single-line-block',
);

config.rules['@litert/disallow-single-line-block'] = 'error';

module.exports = config;