const logger = require('./logger');
const fs = require('fs');
const path = require('path');
const baseDir = process.cwd();
const propertiesPath = process.env.PROPERTIES_PATH || path.join(baseDir, 'config.json');
const properties = JSON.parse(fs.readFileSync(propertiesPath));
const mongo = require('mongodb');
const assert = require('assert');

logger.info('Initializing Mail Server');
logger.info('Properties', properties);

logger.info('connecting to db', properties.mongoConnectUrl);
mongo.MongoClient.connect(properties.mongoConnectUrl, { useNewUrlParser: true }, function (err, client) {
  assert.equal(null, err);
  logger.info('Connected successfully to mongodb server');
  // creating indexes
  const db = client.db(properties.dbName);
  db.collection('mailboxes').createIndex( {'name': 1}, { unique: true } );
  db.collection('tokens').createIndex( {'ip': 1}, { unique: true } );

  const smtp = require('./server/app/smtp')(properties, db);
});