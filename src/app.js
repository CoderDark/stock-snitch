const path = require('path');
const fs = require('fs');
const Toolbox = require('./toolbox');
const axios = require('axios');
const Datastore = require('nedb');
const token = require('../token.txt');

let db = null;
const dbPath = path.join(process.cwd(), 'stock-snitch.db');

const results = new Toolbox.TextBox('results');

const getSymbolData = (symbol, callback) => {
  axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`)
    .then((response) => {
      callback(null, response);
    }).catch((err) => {
    callback(err, null);
  });
};

const init = () => {
  try {
    fs.accessSync(dbPath, fs.constants.F_OK);

    db = new Datastore({
      filename: dbPath,
      autoload: true
    });
  } catch (err) {
    db = new Datastore({
      filename: dbPath,
      autoload: true
    });

    let recs = [
      {symbol: 'AAPL', watch: false, rules: ''},
      {symbol: 'WMT', watch: false, rules: ''},
      {symbol: 'AMD', watch: false, rules: ''},
      {symbol: 'MSFT', watch: false, rules: ''}
    ];

    db.insert(recs, function (err, records) {
      window.alert(err || JSON.stringify(records));
    });
  }

  db.find({}, (err, records) => {
    records.forEach((record) => {
      //getSymbolData(record.symbol, (err, response) => {
      results.text = `${results.text}\n${record.symbol}: symbol data`;
      ///});
    });
  });
};

init();


