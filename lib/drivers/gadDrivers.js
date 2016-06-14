var helper = require('../helper.js');

var gadDrivers = {
    read: function (permAddr, auxId, attr, callback) {
        // callback(err, result), result: value read (Type denpends, ex: 'hello', 12, false)
        var shepherd = this,
            reqPath = helper.reqPath(auxId, attr);

        helper.findQnode(shepherd, permAddr, function (err, qnode) {
            if (err) {
                callback(err);
            } else {
                qnode.readReq(reqPath, function (rspErr, rsp) {
                    if (rspErr)
                        callback(rspErr);
                    else if (!helper.isGoodResponse(rsp.status))
                        callback(new Error('Bad response: ' + rsp.status));
                    else
                        callback(null, rsp.data);
                });
            }
        });
    },
    write: function (permAddr, auxId, attr, val, callback) {
        // callback(err, result), result: value written (optional, Type denpends, ex: 'hello', 12, false)
        var shepherd = this,
            reqPath = helper.reqPath(auxId, attr);

        helper.findQnode(shepherd, permAddr, function (err, qnode) {
            if (err) {
                callback(err);
            } else {
                qnode.writeReq(reqPath, val, function (rspErr, rsp) {
                    if (rspErr)
                        callback(rspErr);
                    else if (!helper.isGoodResponse(rsp.status))
                        callback(new Error('Bad response: ' + rsp.status));
                    else
                        callback(null, rsp.data);
                });
            }
        });
    },
    exec: function (permAddr, auxId, attr, args, callback) {
        // callback(err, result), result: can be anything, depends on firmware implementation
        var shepherd = this,
            reqPath = helper.reqPath(auxId, attr);

        if (typeof args === 'function') {
            callback = args;
            args = undefined;
        }

        helper.findQnode(shepherd, permAddr, function (err, qnode) {
            if (err) {
                callback(err);
            } else {
                args = args || [];
                qnode.executeReq(reqPath, args, function (rspErr, rsp) {
                    if (rspErr)
                        callback(rspErr);
                    else if (!helper.isGoodResponse(rsp.status))
                        callback(new Error('Bad response: ' + rsp.status));
                    else
                        callback(null, rsp.data);
                });
            }
        });
    },
    getReportCfg: function (permAddr, auxId, attrName, callback) {
        // callback(err, result), result: config object (Object, ex: { pmin: 10, pmax: 60, gt: 200 })
        var shepherd = this,
            reqPath = helper.reqPath(auxId, attr);

        helper.findQnode(shepherd, permAddr, function (err, qnode) {
            if (err) {
                callback(err);
            } else {
                qnode.discoverReq(reqPath, function (rspErr, rsp) {
                    if (rspErr) {
                        callback(rspErr);
                    } else if (!helper.isGoodResponse(rsp.status)) {
                        callback(new Error('Bad response: ' + rsp.status));
                    } else {
                        if (rsp.data.resrcList)
                            delete rsp.data.resrcList;

                        callback(null, rsp.data);
                    }
                });
            }
        });
    },
    // [TODO] enable, cancel? cfg to set?
    setReportCfg: function (permAddr, auxId, attrName, cfg, callback) {
        // function(permAddr, auxId, attrName, cfg, callback) {}
        // callback(err, result), result: set succeeds? (Boolean, true or false)
        var shepherd = this,
            shouldEnable = false,
            cfgKeysLen = Object.keys(cfg).length,
            reqPath = helper.reqPath(auxId, attr);

        if (cfg.hasOwnProperty('enable')) {
            shouldEnable = !!cfg.enable;
            cfgKeysLen -= 1;
            delete cfg.enable;
        }

        helper.findQnode(shepherd, permAddr, function (err, qnode) {
            if (err) {
                callback(err);
            } else {

                if (cfgKeysLen) {   // there are other keys of cfg except 'enable' to set
                    if (!shouldEnable)
                        cfg.cancel = true;

                    qnode.writeAttrsReq(reqPath, cfg, function (rspErr, rsp) {
                        if (rspErr)
                            callback(rspErr);
                        else if (!helper.isGoodResponse(rsp.status))
                            callback(new Error('Bad response: ' + rsp.status));
                        else
                            callback(null, rsp.data);
                    });
                } else if (!shouldEnable) {

                }
            }
        });
    }
};

module.exports = gadDrivers;
