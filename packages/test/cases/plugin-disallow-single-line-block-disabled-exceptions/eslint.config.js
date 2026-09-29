module.exports = require('../../config-templates/plugin-rule')(
    '@litert/disallow-single-line-block',
    [{
        exception: {
            'if': false,
            'for': false,
            while: false,
            case: false,
            'do-while': false,
            catch: false,
            finally: false,
            'arrow-callback': false,
            'arrow-function': false,
            'function-callback': false,
            function: false,
            getter: false,
            setter: false,
            object: false,
        },
    }],
);