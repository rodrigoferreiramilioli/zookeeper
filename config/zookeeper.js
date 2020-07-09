const zookeeper = require("node-zookeeper-client");
const zooConfig = require("./configZookeeper");
const PORT  = process.env.ZK_PORT || 2181; // porta do zookeeper
const HOST = process.env.ZK_HOST || "localhost"; //Ip do servidor zookeeper
const client = zookeeper.createClient(`${HOST}:${PORT}`, { sessionTimeout: 100000 });
const environment = (process.env.NODE_ENV || "development").trim(); // qual ambiente vai usar
const path = zooConfig[environment].path;	
var versionbuffer;
client.once('connected', function () {	
	watchNode(path);
});
/* Aqui o zookeeper fica lendo em todo momento o nó, quando há uma mudança na conexão ele seta na variável global.
 mas poderia ser uma conexão com sequelize, algum redirecionamento de ip e etc.. */
function watchNode(node) {
	client.getData(node, function(err, response, versioncode){		
		if((response != undefined)&&(versioncode.version !== versionbuffer)){						
			global.exibir = JSON.parse(response.toString("utf8"));
			versionbuffer = versioncode.version;		
		}			
		watchNode(node);		
	});
}
client.connect();