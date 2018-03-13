const unirest = require('unirest');

function initUser(username, password, cb) {
    var couch = require('nano')(
      { url : "http://localhost:3000",
        parseUrl : false
      });

    couch.auth('admin', 'admin', function (err, body, headers) {
        var couch2 = require('nano')(
          { url : "http://localhost:3000",
           cookie: headers['set-cookie']
          });
        couch2.db.create('data_'+username, function(err, body) {
            const newUser = {
                type: 'user',
                name: username,
                password: password,
                roles: []
            };

            couch2.use('_users').insert(newUser, 'org.couchdb.user:' + newUser.name, function(err, body) {
                unirest.put('http://localhost:3000/data_'+username+'/_security')
                .auth({
                      user: 'admin',
                      pass: 'admin'
                })
                .headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
                .send({ members: { names: [username] } })
                .end(function (response) {
                    cb();
                });
            });
        });
    });
}

initUser('harry', 'dirty', function(err) {
    console.log('done');
});
