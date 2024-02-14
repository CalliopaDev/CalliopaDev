// require all modules on the path and with the pattern defined
const requireModule = require.context('./', true, /\.(js|ts)$/)

const modules = requireModule.keys().filter(fileName => fileName.indexOf("index") < 0).map(requireModule);

// export all modules
export default modules;