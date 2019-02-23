/**
 * Created by lockepc on 2017/6/3.
 */
var util = require('util');
var Socket = require('net').Socket;


var DEVICE_CONST = require('./simulator_command');

var CMD_NAME = DEVICE_CONST.API;
var ITEM = DEVICE_CONST.ITEM;

function Simulator(chargerInfo) {
    //保存模拟设备的信息
    //mac,version 等
    this.chargerInfo = chargerInfo;
    this.intervalId = null;

    //初始状态未连接服务器
    //实际上该变量应该为私有
    this.netStatus = 0;
    this.chargerStatus = 0;

    this.mac = chargerInfo.mac || '121212121212';
    this.deviceId = chargerInfo.deviceId || 1;
    this.meterNumber = null;
    //设置心跳包时间,若未设定默认为 10s
    this.heartInterval = chargerInfo.heartInterval || 10;


    //在父类中实例化该对象原型
    Socket.call(this);

    if (!(this instanceof Simulator)) {
        return new Simulator(chargerInfo);
    } else {
        return this;
    }
}

//计算灯的状态
Simulator.prototype.ledStatusCal = function () {
    return this.netStatus + this.chargerStatus;
};


Simulator.prototype.sendCommand = function (commandName, commandData) {
    var self = this;
    var cmdInfo = DEVICE_CONST.DEVICE_CMD[commandName];
    var cmdData = {};
    var sendData = {};
    var cmdType = (cmdInfo.type === DEVICE_CONST.API_TYPE.NOTIFY) ?
        DEVICE_CONST.ITEM.REQ_TYPE : DEVICE_CONST.ITEM.RESP_TYPE;

    cmdInfo.item.forEach(function (ele) {
        cmdData[ele] = commandData[ele];
    });

    sendData[cmdType] = commandName;
    sendData.data = cmdData;

    self.write(JSON.stringify(sendData));
};

Simulator.prototype.notifyNewDevice = function (isReconnect) {
    var self = this;
    var data = {
        [ITEM.MAC]: self.mac,
        [ITEM.IS_RECONNECT]: isReconnect
    };

    self.sendCommand(CMD_NAME.NOTIFY_NEW_DEVICE, data);
};


Simulator.prototype.notifyHeartPackage = function () {
    var self = this;

    var data = {
        [ITEM.LED_STATUS]: self.ledStatusCal()
    };

    //只有当状态非 0 时才可发送心跳包
    if (self.netStatus) {
        self.sendCommand(CMD_NAME.NOTIFY_HEART_PACKAGE, data);
    }
};

/**
 * 使能或关闭心跳包发送
 * @param heartFlag 1 使能,0 关闭 */
Simulator.prototype.heartSend = function (heartFlag) {
    var self = this;


    //todo 在异步回调中传递函数索引会导致 this 丢失
    if (heartFlag) {
        self.intervalId = self.intervalId || setInterval(function () {
                self.notifyHeartPackage();
            }, self.heartInterval * 1000);//注意是间隔秒数
    }
    else {
        clearInterval(self.intervalId);
    }
};

Simulator.prototype.resolveCmd = function (receiveData) {
    //接收可能出错
    var data = JSON.parse(receiveData);
    var cmdName = data[ITEM.REQ_TYPE] || data[ITEM.RESP_TYPE];

    return [cmdName, data.data];
};

util.inherits(Simulator, Socket);
module.exports = Simulator;
