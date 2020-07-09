const restify = require('restify');
const callRoutes = require('./routes/routesget');
global.exibir = "";
require("./config/zookeeper"); /* abre o "espião" do zookeeper, apartir de agora ele fica investigando tudo que ocorre de mudanças */
const server = restify.createServer();
server.pre(restify.plugins.bodyParser());
server.listen(3000);
callRoutes(server);
/* faça uma requisição simples localhost:3000 depois dê um set path do seu servidor zookeeper e veja a mudança*/
module.exports.server = global.server;