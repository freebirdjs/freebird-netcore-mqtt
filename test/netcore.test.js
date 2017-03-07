var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    expect = require('chai').expect,
    _ = require('busyman');

chai.use(sinonChai);

/***********************************************************************/
/*** Create Machine Node                                             ***/
/***********************************************************************/
var MqttNode = require('mqtt-node'),
    SmartObject = require('smartobject');

var so = new SmartObject();

// Humidity sensor - the first instance
so.init('humidity', 0, {    // oid = 'humidity', iid = 0
    sensorValue: 20,
    units: 'percent'
});

// Humidity sensor - the second instance
so.init('humidity', 1, {    // oid = 'humidity', iid = 1
    sensorValue: 16,
    units: 'percent'
});

// Temperature sensor - the second instance
so.init('temperature', 1, {    // oid = 'humidity', iid = 1
    sensorValue: 25,
    units: 'cel'
});

var qnode = new MqttNode('my_foo_client_id', so);

describe('qnode ready', function() {
    it('should ready', function (done) {
        qnode.on('ready', function () {
            done();
        });
    });
});

/***********************************************************************/
/*** Create Netcore                                                  ***/
/***********************************************************************/

var mqttCore = require('../index')('netcore-test'),
    controller = mqttCore._controller,
    FBird = require('freebird'),
    FBase = require('freebird-base');

var freebird = new FBird([ mqttCore ]);

describe('start freebird', function() {
    it('should start', function (done) {
        this.timeout(10000);
        freebird.start(function (err) {
            if (!err) {
                freebird.permitJoin(180);
                qnode.connect('mqtt://0.0.0.0');
                setTimeout(function () {
                    done();
                }, 5000);
                //done();
            }
        });
    });

    // it('should connected', function (done) {
    //     qnode.on('login', function () {
    //         setTimeout(function () {
    //             done();
    //         }, 2000);
            
    //     });
    //     qnode.connect('mqtt://0.0.0.0');
    // });
});

// var controller = nc._controller,
//     dev = fbBase.createDevice(nc, rawDev),
//     gad = fbBase.createGadget(dev, '0xcc00.0xcc07.28', rawGad);

// var invokeCbNextTick = function (cb) {
//     setImmediate(cb, null);
// };

