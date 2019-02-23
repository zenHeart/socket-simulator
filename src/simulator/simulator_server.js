/**
 * Created by lockepc on 2017/6/2.
 */
const util = require('util');
const EventEmitter = require('events').EventEmitter;
const Simulator = require('./simulator');


class
function SimulatorServer() {
    //用来保存所有的 模拟器
    EventEmitter.call(this);

    this.allSimulator = [];

    if(!(this instanceof  SimulatorServer)) {
        return new SimulatorServer();
    } else {
        return this;
    }
}


//批量创建设备
SimulatorServer.prototype.newSimulator = function (simulatorInfo) {
    var self = this;
    simulatorInfo.forEach(function (ele) {
        var simulatorId = ele.deviceId;
        if (self.allSimulator[simulatorId] || !simulatorId) {
            throw new Error('不能创建 clientId 重复的设备');
        }
        else {
            self.allSimulator[simulatorId] = Simulator(ele);
        }
    });
};

SimulatorServer.prototype.getSimulator = function (clientId) {
    return this.allSimulator[clientId];
};


util.inherits(SimulatorServer, EventEmitter);


module.exports = SimulatorServer;

