# freebird-netcore-mqtt
A freebird netcore on top of mqtt-shepherd

## Table of Contents

1. [Overiew](#Overiew)  
2. [Installation](#Installation)  
3. [Basic Usage](#Basic)  
4. [APIs](#APIs)  
5. [Appendix: Netcore Standalone](#Standalone)  

<a name="Overiew"></a>
## 1. Overview

**freebird-netcore-mqtt** is the ...


<a name="Installation"></a>
## 2. Installation

> $ npm install freebird-netcore-mqtt --save
  
<a name="Basic"></a>
## 3. Basic Usage

* To use this netcore with freebird, register it in your app:  

```js
var Freebird = require('freebird'),
    mqttCore = require('freeebird-netcore-mqtt'),
    http = require('http');

var httpServer = http.createServer();
httpServer.listen(3000);

var freebird = new Freebird(httpServer);

freebird.registerNetcore(mqttCore, function (err) {
    if (err)
        console.log('err');
});

// after registered this netcore, start the freebird server
freebird.start(function (err) {
    var mqttCoreName = mqttCore.getName();      // 'freeebird-netcore-mqtt'
    freebird.net.permitJoin(mqttCoreName, 180); // Let your mqtt peripheral machines join the network
});

// That's all!
```

<a name="APIs"></a>
## 4. APIs

    * [enable()](#API_enable)
    * [disable()](#API_disable)
    * [isEnabled()](#API_isEnabled)
    * [isRegistered()](#API_isRegistered)
    * [isJoinable()](#API_isJoinable)
    * [getName()](#API_getName)
    * [getTraffic()](#API_getTraffic)
    * [resetTxTraffic()](#API_resetTxTraffic)
    * [resetRxTraffic()](#API_resetRxTraffic)
    * [getBlacklist()](#API_getBlacklist)
    * [clearBlacklist()](#API_clearBlacklist)
    * [isBlacklisted()](#API_isBlacklisted)
    * [dump()](#API_dump)

    * [start()](#API_start)
    * [stop()](#API_stop)
    * [reset()](#API_reset)
    * [permitJoin()](#API_permitJoin)
    * [remove()](#API_remove)
    * [ban()](#API_ban)
    * [unban()](#API_unban)
    * [ping()](#API_ping)

    * [devRead()](#API_devRead)
    * [devWrite()](#API_devWrite)
    * [identify()](#API_identify)
    * [gadRead()](#API_gadRead)

    * [gadWrite()](#API_gadWrite)
    * [gadExec()](#API_gadExec)
    * [getReportCfg()](#API_getReportCfg)
    * [setReportCfg()](#API_setReportCfg)

<a name="Standalone"></a>
## 5. Appendix: Netcore Standalone

By default, **freebird-netcore-mqtt** is designed for freebird framework, but you can use it as a standalone network manager.
If you decide to do this, you have to deal with the instances of Device and Gadget on your own. For example, use an array to manage all these instance. It is suggested to use this module with freebird, since it has prepared devices and gadgets management and persistance for you. If you just don't want to use freebird, then there is another oppertunity for you to use **LWMQN** solution.

Anyway, if you do really use this module as a standalone one, you have to implements the following message handlers on your own.

```js

mqttCore.onError = function (err) {
    // your implementation
};

mqttCore.onReady = function () {
    // your implementation
};

mqttCore.onEnabled = function () {
    // your implementation
};

mqttCore.onPermitJoin = function () {
    // your implementation
};

mqttCore.onDevIncoming = function () {
    // your implementation
};

mqttCore.onDevLeaving = function () {
    // your implementation
};

mqttCore.onDevReporting = function () {
    // your implementation
};

mqttCore.onDevNetChanging = function () {
    // your implementation
};

mqttCore.onGadIncoming = function () {
    // your implementation
};

mqttCore.onGadReporting = function () {
    // your implementation
};

mqttCore.onBannedDevIncoming = function () {
    // your implementation
};

mqttCore.onBannedDevReporting = function () {
    // your implementation
};

mqttCore.onBannedGadIncoming = function () {
    // your implementation
};

mqttCore.onBannedGadReporting = function () {
    // your implementation
};

mqttCore.onDevError = function () {
    // your implementation
};

mqttCore.onDevNetChanged = function () {
    // your implementation
};

mqttCore.onDevPropsChanged = function () {
    // your implementation
};

mqttCore.onDevAttrsChanged = function () {
    // your implementation
};

mqttCore.onGadError = function () {
    // your implementation
};

mqttCore.onGadPanelChanged = function () {
    // your implementation
};

mqttCore.onGadPropsChanged = function () {
    // your implementation
};

mqttCore.onGadAttrsChanged = function () {
    // your implementation
};

```
