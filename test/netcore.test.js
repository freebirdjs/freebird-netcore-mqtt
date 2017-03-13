var _ = require('busyman'),
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    expect = require('chai').expect;

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


describe('qnode ready', function() {
    it('should ready', function (done) {
        var xnode = new MqttNode('my_x_client_id', so);

        xnode.on('ready', function () {
            done();
        });
    });
});

/***********************************************************************/
/*** Create Netcore                                                  ***/
/***********************************************************************/
var qnode = new MqttNode('my_foo_client_id', so);

var mqttCore = require('../index')('netcore-test'),
    controller = mqttCore._controller,
    FBird = require('freebird'),
    FBase = require('freebird-base');

var freebird = new FBird([ mqttCore ]);

describe('start freebird and qnodes come in', function() {
    it('should start', function (done) {
        this.timeout(10000);
        freebird.start(function (err) {
            if (!err) {
                freebird.permitJoin(180);   // open for device joining
                done();
            }
        });
    });

    it('should connected', function (done) {
        this.timeout(3000);
        qnode.connect('mqtt://127.0.0.1');

        qnode.on('login', function () {
            setTimeout(function () {
                done();
            }, 600);   // leave a little time for gadget incoming
        });
    });

    it('should have the device', function () {
        var dev = freebird.findByNet('device', 'netcore-test', '00:11:22:aa:bb:cc/my_foo_client_id');

        expect(dev.isRegistered()).to.be.equal(true);
        expect(dev.isEnabled()).to.be.equal(true);
        expect(dev.get('permAddr')).to.be.equal('00:11:22:aa:bb:cc/my_foo_client_id');
    });

    it('should have the gadget temperature/1', function () {
        var gad = freebird.findByNet('gadget', 'netcore-test', '00:11:22:aa:bb:cc/my_foo_client_id', 'temperature/1');

        expect(gad.isRegistered()).to.be.equal(true);
        expect(gad.isEnabled()).to.be.equal(true);
        expect(gad.get('permAddr')).to.be.equal('00:11:22:aa:bb:cc/my_foo_client_id');
    });

    it('should have the gadget humidity/0', function () {
        var gad = freebird.findByNet('gadget', 'netcore-test', '00:11:22:aa:bb:cc/my_foo_client_id', 'humidity/0');

        expect(gad.isRegistered()).to.be.equal(true);
        expect(gad.isEnabled()).to.be.equal(true);
        expect(gad.get('permAddr')).to.be.equal('00:11:22:aa:bb:cc/my_foo_client_id');
    });

    it('should have the gadget humidity/1', function () {
        var gad = freebird.findByNet('gadget', 'netcore-test', '00:11:22:aa:bb:cc/my_foo_client_id', 'humidity/1');

        expect(gad.isRegistered()).to.be.equal(true);
        expect(gad.isEnabled()).to.be.equal(true);
        expect(gad.get('permAddr')).to.be.equal('00:11:22:aa:bb:cc/my_foo_client_id');
    });

    it('another qnode connected', function (done) {
        this.timeout(3000);
        var qnode2 = new MqttNode('foo_id', so);

        qnode2.connect('mqtt://127.0.0.1');

        qnode2.on('login', function () {
            setTimeout(function () {
                done();
            }, 600);   // leave a little time for gadget incoming
        });
    });
});
