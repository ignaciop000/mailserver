const SMTPServer = require('smtp-server').SMTPServer;

const server = new SMTPServer({
    logger: true
});
server.listen(25)