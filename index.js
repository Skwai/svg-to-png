const express = require('express')
const create = require('./create')
const convert = require('./convert')

const app = express()

app.get('/', (req, res) => {
  res.set('Content-Type', 'image/png')

  create({
    text: 'example',
    fontColor: '#000',
    fontSize: 20,
    fontFile: 'Museo900-Regular'
  })
    .then(convert)
    .then((stdout) => stdout.pipe(res))
})

app.listen(3030, () => {
  console.log('Example app listening on port 3030!')
})