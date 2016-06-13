var gadDrivers = {
    controller: null,
    read: function (permAddr, auxId, attr, callback) {
        // function(permAddr, auxId, attr, callback) {}
        // callback(err, result), result: value read (Type denpends, ex: 'hello', 12, false)
    },
    write: function (permAddr, auxId, attr, val, callback) {
        // function(permAddr, auxId, attr, val, callback) {}
        // callback(err, result), result: value written (optional, Type denpends, ex: 'hello', 12, false)
    },
    exec: function (permAddr, auxId, attr, args, callback) {
        // function(permAddr, auxId, attr, args, callback) {}
        // callback(err, result), result: can be anything, depends on firmware implementation
    },
    setReportCfg: function (permAddr, auxId, attrName, cfg, callback) {
        // function(permAddr, auxId, attrName, cfg, callback) {}
        // callback(err, result), result: set succeeds? (Boolean, true or false)
    },
    getReportCfg: function (permAddr, auxId, attrName, callback) {
        // function(permAddr, auxId, attrName, callback) {}
        // callback(err, result), result: config object (Object, ex: { pmin: 10, pmax: 60, gt: 200 })
    }
};

module.exports = function (controller) {
    netDrivers.controller = controller;
    netDrivers.read = read.bind(controller);
    netDrivers.write = write.bind(controller);
    netDrivers.exec = exec.bind(controller);
    netDrivers.setReportCfg = setReportCfg.bind(controller);
    netDrivers.getReportCfg = getReportCfg.bind(controller);

    return gadDrivers;
};
