
const express = require('express');

var app = require('express-pouchdb')({
  mode: 'fullCouchDB'
});

app.setPouchDB(require('pouchdb'));
app.listen(3000);
