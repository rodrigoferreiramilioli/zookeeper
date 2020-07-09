const roteBase = require('../src/routesget');
module.exports  = function(server){    
    server.get(
        '/',
        roteBase.routeData
    );
}