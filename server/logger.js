const winston =  require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console({
        colorize: true,
        prettyPrint: true,
        timestamp: true,
        label: 'mailServer'
      }),
    ]
  });
  
  module.exports = logger;
  module.exports.stream =  {
    write: function (message, encoding) {
      logger.info(message);
    }
  };
  