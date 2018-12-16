let express = require("express"),
    Web3 = require("web3"),
    fs = require('fs')

var bodyParser = require('body-parser');

let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var web3

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://35.187.157.218:8545"))
}

const routes = require('./routes')(web3)
const env = JSON.parse(fs.readFileSync('./config/env.json', 'utf8'))

const db = require('./config/db.config.js').db;

// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('`Database & tables created!`Drop and Resync with { force: true }');
});


app.use('/api', routes)
app.use(express.static('public'))


var server = app.listen(env.port, '0.0.0.0', function() {
    var host = server.address().address
    var port = server.address().port
    console.log('running at http://' + host + ':' + port)
})
