require('../../case-validation')(
    __dirname,
    '@litert/disable-for-each-method',
    {
        diagnosticCount: 5,
        message: 'Use "for of" syntax instead.',
    },
);