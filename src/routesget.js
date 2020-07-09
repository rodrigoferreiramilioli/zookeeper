module.exports.routeData = function(req, res, next){
    res.send(200, global.exibir);
    return next();
};