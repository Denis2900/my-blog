const path = require('path')
const createPath = (page,dir) => {return path.resolve(`${dir}`,'client/public',`${page}.html`)}
module.exports = createPath