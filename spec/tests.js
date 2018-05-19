// require all modules ending in "_spec" from the
// current directory and all subdirectories
const testsContext = require.context('.', true, /_spec$/);

testsContext.keys().forEach(testsContext);
