const TextToSVG = require('text-to-svg');

const DEFAULTS = {

}

module.exports = function (args) {
  const opts = Object.assign({}, DEFAULTS, args)

  const attributes = {
    fill: opts.fontColor,
    stroke: opts.fontStroke
  };

  const options = {
    x: 0,
    y: 0,
    fontSize: opts.fontSize,
    anchor: 'top',
    attributes: attributes
  }

  return new Promise((resolve, reject) => {
    TextToSVG.load(`./fonts/${opts.fontFile}.otf`, (err, textToSVG) => {
      if (err) {
        return reject(err)
      }
      resolve(textToSVG.getSVG(opts.text, options))
    })
  })
}