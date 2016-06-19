# freebird-netcore-mqtt
A mqtt machine network core for freebird framework.  

## Table of Contents

1. [Overiew](#Overiew)  
2. [Installation](#Installation)  
3. [Basic Usage](#Basic)  
4. [APIs](#APIs)  
5. [Appendix: Netcore Standalone](#Standalone)  

<a name="Overiew"></a>
## 1. Overview

**freebird-netcore-mqtt** is the network controller (netcore) with managment facilities ready for freebird.  

<a name="Installation"></a>
## 2. Installation

> $ npm install freebird-netcore-mqtt --save
  
<a name="Basic"></a>
## 3. Basic Usage

* To use this netcore with freebird, register it to freebird in your app:  

```js
var http = require('http'),
    Freebird = require('freebird'),
    mqttCore = require('freeebird-netcore-mqtt');

var httpServer,
    freebird;

httpServer = http.createServer();
httpServer.listen(3000);
freebird = new Freebird(httpServer);

// register freeebird-netcore-mqtt to freebird
freebird.registerNetcore(mqttCore, function (err) {
    if (err) {
        console.log('err');
    } else {
        // after registered this netcore, simply start the freebird server
        freebird.start(function (err) {
            var mqttCoreName = mqttCore.getName();      // 'freeebird-netcore-mqtt'
            freebird.net.permitJoin(mqttCoreName, 180); // Let your mqtt peripheral machines join the network
        });

        // That's it!
    }
});
```

<a name="APIs"></a>
## 4. APIs

Netcore provides you with the following APIs, please go to [Netcore APIs](#) for their usage.  
  
* Netcore  

| Medthod      | Description                                                                            |  
|--------------|----------------------------------------------------------------------------------------|  
| getName      | Get name of this netcore.                                                              |  
| enable       | Enable this netcore.                                                                   |  
| disable      | Disable this netcore.                                                                  |  
| isEnabled    | To see if this netcore is enabled.                                                     |  
| isRegistered | To see if this netcore is registered to freebird framework.                            |  
| dump         | Dump information about the netcore.                                                    |  

* Network Management  

| Medthod        | Description                                                                                      |  
|----------------|--------------------------------------------------------------------------------------------------|  
| start          | Start the network. To allow devices to join the network, use `permitJoin()`.                     |  
| stop           | Stop the network. All functions are disabled.                                                    |  
| reset          | Reset the netcore. Soft reset just restart the netcore, and hard reset will clear the blacklist. |  
| permitJoin     | Allow or disallow devices to join the network.                                                   |  
| isJoinable     | Checks if the netcore is currently allowing devices to join its network.                         |  
| getTraffic     | Get traffic records.                                                                             |  
| resetTxTraffic | Reset record of TX traffic.                                                                      |  
| resetRxTraffic | Reset record of RX traffic.                                                                      |  
| getBlacklist   | Get blacklist of the banned devices. Use `ban()` to put a device into blacklist.                 |  
| clearBlacklist | Clear the blacklist. Use `unban()` to release a device from blacklist.                           |  

* Device Management  

| Medthod       | Description                                                                                             |  
|---------------|---------------------------------------------------------------------------------------------------------|  
| isBlacklisted | To see if a device is blocked with its permanent address given.                                         |  
| remove        | Remove a device from the network.                                                                       |  
| ban           | Ban a device from the network.                                                                          |  
| unban         | Release a banned device from the blacklist.                                                             |  
| ping          | Ping a remote device.                                                                                   |  
| devRead       | Remotely read an attribute from the specified device.                                                   |  
| devWrite      | Remotely write an attribute value to the specified device.                                              |  
| identify      | Identify a device. If the remote device supports this feature, you may see it blinking leds or buzzing. |  

* Gadget Management  

| Medthod        | Description                                                                                      |  
|----------------|--------------------------------------------------------------------------------------------------|  
| gadRead        | Remotely read an attribute from the specified gadget on a device.                                |  
| gadWrite       | Remotely write an attribute value to the specified gadget on a device.                           |  
| gadExec        | Remotely invoke a procedure of the specified gadget on a device.                                 |  
| getReportCfg   | Get the attribute report/notification settings of a gadget.                                      |  
| setReportCfg   | Set the attribute report/notification configuration of a gadget.                                 |  

<a name="Standalone"></a>
## 5. Appendix: Netcore Standalone

By default, **freebird-netcore-mqtt** is designed to operate with the freebird framework. But you still can use it as a standalone network manager if you like. Please see [How to Use a Netcore Standalone](#) for more details.  
