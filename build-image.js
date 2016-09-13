const gm = require('gm')
const Inkscape = require('inkscape')
const fs = require('fs')
const Handlebars = require('handlebars')
const str = require('string-to-stream')

const DEFAULTS = {

}

class BuildImage {
  constructor(args) {
    this.opts = Object.assign({}, DEFAULTS, args)
  }

  /**
   * @return {Promise}
   */
  getTemplate() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.opts.template, 'utf8', (err, data) => err ? reject(err) : resolve(data))
    })
  }

  /**
   * @return {Promise}
   */
  generateSvg() {
    const { fontFamily, fontColor, fontSize, text } = this.opts

    const width = 400
    const height = 400

    return this.getTemplate()
      .then((template) => {
        const hb = Handlebars.compile(template)
        return hb({ fontFamily, fontColor, fontSize, text, width, height })
      })
  }

  convertSvg(svg) {
    return str(svg).pipe(new Inkscape(['-e']))
  }

  /**
   * @return {Primise}
   */
  convert() {
    return this.generateSvg()
      .then(this.convertSvg)

  }
}

module.exports = BuildImage