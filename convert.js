const Inkscape = require('inkscape')
const str = require('string-to-stream')

const DEFAULTS = {

}

module.exports = function (svg) {
  return Promise.resolve(str(svg).pipe(new Inkscape(['-e'])))
}