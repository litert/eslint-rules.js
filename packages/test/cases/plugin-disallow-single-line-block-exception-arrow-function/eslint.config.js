module.exports = require('../../config-templates/plugin-rule')(
    '@litert/disallow-single-line-block',
    [{ exception: { 'arrow-function': true } }],
);