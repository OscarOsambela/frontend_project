const fs = require('fs')

const texto = fs.readFileSync('texto.txt', 'utf8')

fs.writeFileSync('texto.txt', texto)
