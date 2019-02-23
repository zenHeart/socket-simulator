/**
 * Created by lockepc on 2017/6/2.
 */
var COMMAND = {
    /*app 和 设备共有的命令****/
    SET_CHARGING_START: 'setChargingStart',
    SET_CHARGING_END: 'setChargingEnd',
    SET_UPDATE_VERSION: 'setUpdateVersion',
    GET_CHARGER_STATUS: 'getChargerStatus',
    GET_CHARGING_INFO: 'getChargingInfo',
    NOTIFY_NEW_DEVICE: 'notifyNewDevice',
    NOTIFY_CHARGER_STATUS: 'notifyChargerStatus',
    NOTIFY_CONNECT_STATUS: 'notifyConnectStatus',
    NOTIFY_CHARGING_INFO: 'notifyChargingInfo',
    NOTIFY_END_CHARGING: 'notifyEndCharging',
    NOTIFY_CHECK_VERSION: 'notifyCheckVersion',
    NOTIFY_UPDATE_VERSION: 'notifyUpdateVersion',
    NOTIFY_UPDATE_SUCCESS: 'notifyUpdateSuccess',
    NOTIFY_HEART_PACKAGE: 'notifyHeartPackage',
},ITEM = {
    MAC: 'mac',
    LED_STATUS: 'ledStatus',
    DEVICE_ID: 'deviceId',
    DEVICE_SN: 'deviceSN',
    OWNER_ID: 'ownerId',
    OWNER_SN: 'ownerSN',
    VERSION_ID: 'versionId',
    OLD_VERSION_ID: 'oldVersionId',
    NEW_VERSION_ID: 'newVersionId',
    VERSION_SN: 'versionSN',
    VERSION_SIZE: 'versionSize',
    VERSION_NUMBER: 'versionNumber',
    FILE_INFO: 'fileInfo',
    METER_NUMBER: 'meterNumber',
    URL: 'url',
    IP: 'ip',
    PORT: 'port',
    TIME: 'time',
    BIN: 'bin',
    VERSION_CHECK_SUM: 'versionCheckSum',
    DESCRP: 'description',
    IS_RECONNECT: 'isReconnect',
    MSG_TYPE: 'msgType',
    MSG_SECRET: 'msgSecret',
    MSG_DATE: 'msgDate',
    MSG_DESC: 'msgDesc',
    MSG_IP: 'msgIp',
    MSG_ID: 'msgId',
    STATUS: 'status',
    BLOCK_OFFSET: 'blockOffset',
    BLOCK_SIZE: 'blockSize',
    CHECK_SUM: 'checkSum',
    CONNECT: 'connect',
    ENERGY: 'energy',
    VOLTAGE: 'voltage',
    CURRENT: 'current',
    POWER: 'power',
    DURATION: 'duration',
    DATA: 'data',
    ERR_MSG: 'errMsg',
    RESP_CODE: 'respCode',
    RESP_TYPE: 'respType',
    REQ_TYPE: 'reqType',
    PARSE_NAME: 'commandName',  //返回时解析对应的命令名称
    PARSE_TYPE: 'commandType', // 返回时对应的命令类型
},COMMAND_TYPE = {
    NOTIFY: 'notify',   //设备主动上报的信息
    RESPOND: 'respond',  //设备响应的结果
    APP_COMMAND: 'command',
},DEVICE_CMD = {
    /**{@link} https://zenheart.gitbooks.io/charger/content/node_device.html#setChargingStart. */
    [COMMAND.SET_CHARGING_START]: {
        item: [ITEM.RESP_CODE, ITEM.MSG_ID],
        type: COMMAND_TYPE.RESPOND
    },
    /**{@link} https://zenheart.gitbooks.io/charger/content/node_device.html#setChargingStart. */
    [COMMAND.SET_CHARGING_END]: {
        item: [ITEM.RESP_CODE, ITEM.MSG_ID, ITEM.CONNECT, ITEM.STATUS, ITEM.ENERGY, ITEM.DURATION],
        type: COMMAND_TYPE.RESPOND
    },
    /**{@link} https://zenheart.gitbooks.io/charger/content/node_device.html#setUpdateversion. */
    [COMMAND.SET_UPDATE_VERSION]: {
        item: [ITEM.RESP_CODE, ITEM.MSG_ID],
        type: COMMAND_TYPE.RESPOND
    },

    /**{@link} https://zenheart.gitbooks.io/charger/content/node_device.html#getChargerStatus. */
    [COMMAND.GET_CHARGER_STATUS]: {
        item: [ITEM.RESP_CODE, ITEM.MSG_ID, ITEM.CONNECT, ITEM.STATUS],
        type: COMMAND_TYPE.RESPOND
    },
    /**{@link} https://zenheart.gitbooks.io/charger/content/node_device.html#getChargingInfo. */
    [COMMAND.GET_CHARGING_INFO]: {
        item: [ITEM.RESP_CODE, ITEM.MSG_ID, ITEM.CONNECT, ITEM.STATUS, ITEM.ENERGY,
            ITEM.VOLTAGE, ITEM.CURRENT, ITEM.POWER, ITEM.DURATION],
        type: COMMAND_TYPE.RESPOND
    },
    /**{@link} https://zenheart.gitbooks.io/charger/content/node_device.html#notifyNewDevice. */
    [COMMAND.NOTIFY_NEW_DEVICE]: {
        item: [ITEM.IS_RECONNECT, ITEM.MAC],
        type: COMMAND_TYPE.NOTIFY
    },
    /**{@link} https://zenheart.gitbooks.io/charger/content/node_device.html#notifyChargerStatus. */
    [COMMAND.NOTIFY_CHARGER_STATUS]: {
        item: [ITEM.CONNECT, ITEM.STATUS],
        type: COMMAND_TYPE.NOTIFY
    },
    /**{@link} https://zenheart.gitbooks.io/charger/content/node_device.html#notifyChargingInfo. */
    [COMMAND.NOTIFY_CHARGING_INFO]: {
        item: [ITEM.CONNECT, ITEM.STATUS, ITEM.ENERGY,
            ITEM.VOLTAGE, ITEM.CURRENT, ITEM.POWER, ITEM.DURATION],
        type: COMMAND_TYPE.NOTIFY
    },
    /**{@link} https://zenheart.gitbooks.io/charger/content/node_device.html#notifyEndCharging. */
    [COMMAND.NOTIFY_END_CHARGING]: {
        item: [ITEM.CONNECT, ITEM.STATUS, ITEM.ENERGY, ITEM.DURATION],
        type: COMMAND_TYPE.NOTIFY
    },
    /**{@link} https://zenheart.gitbooks.io/charger/content/node_device.html#notifyCheckVersion. */
    [COMMAND.NOTIFY_CHECK_VERSION]: {
        item: [],
        type: COMMAND_TYPE.NOTIFY
    },
    /**{@link} https://zenheart.gitbooks.io/charger/content/node_device.html#notifyUpdateVersion. */
    [COMMAND.NOTIFY_UPDATE_VERSION]: {
        item: [ITEM.BLOCK_OFFSET, ITEM.BLOCK_SIZE, ITEM.VERSION_SN],
        type: COMMAND_TYPE.NOTIFY
    },
    /**{@link} https://zenheart.gitbooks.io/charger/content/node_device.html#notifyUpdateSuccess. */
    [COMMAND.NOTIFY_UPDATE_SUCCESS]: {
        item: [ITEM.OLD_VERSION_ID, ITEM.NEW_VERSION_ID],
        type: COMMAND_TYPE.NOTIFY
    },
    /**{@link} https://zenheart.gitbooks.io/charger/content/node_device.html#notifyHeartPackage. */
    [COMMAND.NOTIFY_HEART_PACKAGE]: {
        item: [ITEM.LED_STATUS],
        type: COMMAND_TYPE.NOTIFY
    }
};

exports.API = COMMAND;
exports.ITEM = ITEM;
exports.API_TYPE = COMMAND_TYPE;
exports.DEVICE_CMD = DEVICE_CMD;


