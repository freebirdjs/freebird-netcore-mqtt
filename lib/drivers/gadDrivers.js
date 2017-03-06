'use strict';

var _ = require('busyman'),
    helper = require('../helper.js');

var gadDrivers = {
    read: function (permAddr, auxId, attrName, callback) {
        // callback(err, result), result: value read (Type denpends, ex: 'hello', 12, false)
        var shepherd = this,
            realAddr = helper.parsePermAddr(permAddr),
            reqPath = helper.reqPath(auxId, attrName),
            qnode = shepherd.find(realAddr.clientId);

        if (qnode) {
            qnode.readReq(reqPath, function (rspErr, rsp) {
                if (rspErr)
                    callback(rspErr);
                else if (!helper.isGoodResponse(rsp.status))
                    callback(new Error('Bad response: ' + rsp.status));
                else
                    callback(null, rsp.data);
            });
        } else {
            callback(new Error('Device not found.'));
        }
    },
    write: function (permAddr, auxId, attrName, val, callback) {
        // callback(err, result), result: value written (optional, Type denpends, ex: 'hello', 12, false)
        var shepherd = this,
            realAddr = helper.parsePermAddr(permAddr),
            reqPath = helper.reqPath(auxId, attrName),
            qnode = shepherd.find(realAddr.clientId);

        if (qnode) {
            qnode.writeReq(reqPath, val, function (rspErr, rsp) {
                if (rspErr)
                    callback(rspErr);
                else if (!helper.isGoodResponse(rsp.status))
                    callback(new Error('Bad response: ' + rsp.status));
                else
                    callback(null, rsp.data);
            });
        } else {
            callback(new Error('Device not found.'));
        }
    },
    exec: function (permAddr, auxId, attrName, args, callback) {
        // callback(err, result), result: can be anything, depends on firmware implementation
        var shepherd = this,
            realAddr = helper.parsePermAddr(permAddr),
            reqPath = helper.reqPath(auxId, attrName),
            qnode = shepherd.find(realAddr.clientId);

        if (typeof args === 'function') {
            callback = args;
            args = undefined;
        }

        if (qnode) {
            args = args || [];
            qnode.executeReq(reqPath, args, function (rspErr, rsp) {
                if (rspErr)
                    callback(rspErr);
                else if (!helper.isGoodResponse(rsp.status))
                    callback(new Error('Bad response: ' + rsp.status));
                else
                    callback(null, rsp.data);
            });
        } else {
            callback(new Error('Device not found.'));
        }
    },
    readReportCfg: function (permAddr, auxId, attrName, callback) {
        // callback(err, result), result: config object (Object, ex: { pmin: 10, pmax: 60, gt: 200 })
        var shepherd = this,
            realAddr = helper.parsePermAddr(permAddr),
            reqPath = helper.reqPath(auxId, attrName),
            qnode = shepherd.find(realAddr.clientId);

        if (qnode) {
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
        } else {
            callback(new Error('Device not found.'));
        }
    },
    writeReportCfg: function (permAddr, auxId, attrName, cfg, callback) {
        // function(permAddr, auxId, attrName, cfg, callback) {}
        // callback(err, result), result: set succeeds (Boolean, true or false)
        var shepherd = this,
            realAddr = helper.parsePermAddr(permAddr),
            qnode = shepherd.find(realAddr.clientId),
            shouldEnable = true,    // default is enabled when set successfully
            reqPath = helper.reqPath(auxId, attrName);

        cfg = cfg || {};

        if (cfg.hasOwnProperty('enable')) {
            shouldEnable = !!cfg.enable;
            delete cfg.enable;
        }

        if (qnode) {
            cfg.cancel = !shouldEnable;
            qnode.writeAttrsReq(reqPath, cfg, function (rspErr, rsp) {
                if (rspErr)
                    callback(rspErr);
                else if (!helper.isGoodResponse(rsp.status))
                    callback(new Error('Bad response: ' + rsp.status));
                else
                    callback(null, rsp.status);
            });
        } else {
            callback(new Error('Device not found.'));
        }
    }
};

module.exports = gadDrivers;
