const server = require('express')();
var PouchDB = require('pouchdb');
var cors = require('cors');

var PouchDBInstance = PouchDB.defaults({
    mode: 'fullCouchDB',
    prefix: './data/'
});

var db = new PouchDBInstance('data');

var corsOptions = {
    origin: "http://localhost:3030",
    credentials: true
};

server.use(require('body-parser').json({limit: '1mb'}));

server.post('/admin', cors(corsOptions), function (req, res) {
    console.log(req.body);
    res.send(req.body);
});

server.use('/', cors(corsOptions), require('express-pouchdb')(PouchDBInstance));


server.listen(3000, function() {
    console.log('server running');
});
