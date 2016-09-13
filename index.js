const express = require('express')
const BuildImage = require('./build-image')
const app = express()

app.get('/', (req, res) => {
  res.set('Content-Type', 'image/png')

  const image = new BuildImage({
    template: './templates/default.svg',
    text: 'example',
    fontColor: '#000',
    fontFamily: 'Ubuntu',
    fontSize: 20
  })

  image.convert()
    .then((output) => output.pipe(res))
})

app.listen(3030, () => {
  console.log('Example app listening on port 3030!')
})