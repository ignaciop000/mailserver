const logger = require('./logger');
const fs = require('fs');
const path = require('path');
const baseDir = process.cwd();
const propertiesPath = process.env.PROPERTIES_PATH || path.join(baseDir, 'config.json');
const properties = JSON.parse(fs.readFileSync(propertiesPath));
const mongo = require('mongodb');
const assert = require('assert');
const http = require('http');

logger.info('Initializing Mail Server');
logger.info('Properties', properties);

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/vongue.online/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/vongue.online/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/vongue.online/chain.pem', 'utf8');

logger.info('connecting to db', properties.mongoConnectUrl);
mongo.MongoClient.connect(properties.mongoConnectUrl, { useNewUrlParser: true }, function (err, client) {
  assert.equal(null, err);
  logger.info('Connected successfully to mongodb server');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  };

  // creating indexes
  const db = client.db(properties.dbName);
  db.collection('mailboxes').createIndex( {'name': 1}, { unique: true } );
  db.collection('tokens').createIndex( {'ip': 1}, { unique: true } );

  const serverApp = require('./httpServer')(properties, db);

  const server = http.createServer(serverApp);
  const serverSecure = https.createServer(credentials, app);
  const port = process.env.PORT || properties.appListenPort || '80';
  const portSecure = process.env.SECUREPORT || properties.appListenPortSecure || '443';
/*
  server.listen(port, function () {
    logger.info('API server listening');
  });
*/
  serverSecure.listen(portSecure, function () {
    logger.info('API server Secure listening');
  });

  const smtp = require('./smtp')(properties, db);
});