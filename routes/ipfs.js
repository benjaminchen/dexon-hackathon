let routes = require('express').Router()
const ipfsAPI = require('ipfs-http-client')
const fs = require('fs')
const DexonDecimal = 10e17
const ipfs = ipfsAPI('bookdemo.hopto.org', '5001', {protocol: 'http'})
const multer = require('multer');
const upload = multer({
  dest: 'uploads/'
})

module.exports = function(web3) {
    let crypto = require('crypto'),
        algorithm = 'aes-256-ctr',
        password = 'd6F3Efeq'

    routes.post('/book/file', upload.single('file-to-upload'), async (req, res) => {
        var contents = fs.readFileSync(req.file.path)
        var cipher = crypto.createCipher(algorithm, password)
        var crypted = Buffer.concat([cipher.update(contents),cipher.final()]);
        let results = await ipfs.add(crypted)
        console.log(results)
        res.json(results)
    })

    routes.get('/files/:hash', (req, res) => {
        let hash = req.params.hash
        var decipher = crypto.createDecipher(algorithm, password)
        ipfs.get(hash, function (err, files) {
            files.forEach((file) => {
                var dec = Buffer.concat([decipher.update(file.content) , decipher.final()])
                res.send(dec)
            })
        })
    })

    return routes
}