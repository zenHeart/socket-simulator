/**
 * Created by lockepc on 2017/6/2.
 */
var winston = require('winston');
var moment = require('moment');
var sysConst = require('../../config/sys.conf.js');
var formatStr = 'YYYY.M.D-H:m:s.SSS';

var myCustomLevels = {
    levels: {
        error: 0,    //错误信息
        warn: 1,     //警告信息
        access: 2,   //访问信息
        debug: 3,    //调试信息
        info: 4      //额外信息
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        access: 'green',
        debug: 'blue',
        info: 'cyan'
    }
};


//该函数用来打印访问日志
var deviceLog  = new (winston.Logger)({levels: myCustomLevels.levels,
    colors: myCustomLevels.colors,
    transports: [
        new winston.transports.File({
            level: 'access',
            filename: sysConst.DEVICE_ACCESS_PATH,
            json:false,
            colorize: false,
            formatter:function formatLog(originData) {
                //todo 采用格式化方式实现日志输出控制
                //todo 当字段为空时利用 - 代替
                var meta = originData.meta;
                var defaultSort = ['reqTime','clientIp','clientId','clientData','label'];

                var result = [];

                defaultSort.forEach(function (ele) {
                    if(meta[ele])
                        result.push(JSON.stringify(meta[ele]));
                });

                return result.join(' ');
            },
            timestamp: function () {
                return moment().format(formatStr);
            }
        })]
});

var devAccess = function (device,info) {
    if(!info) {
        info = {};
    }

    var deviceData = {
        reqTime:moment().format(formatStr),
        clientIp:device.remoteAddress,
        clientId:device._deviceId ||'-',
        label:info.label || 'device-access',
        clientData:info.data || '-',
    };
    deviceLog.access('%s',deviceData.label,deviceData);
};

var clientLog = new (winston.Logger)({
        transports: [
            new winston.transports.Console({
                level: 'debug',
                colorize: true,
                prettyPrint: true,
                handleExceptions: true,
                timestamp: function () {
                    return moment().format('YYYY-M-D H:m:s.SSS');
                }
            }),
            new winston.transports.File({
                level: sysConst.LOG_LEVEL,
                filename: sysConst.CLIENT_LOG_PATH,
                colorize: true,
                timestamp: function () {
                    return moment().format('YYYY-M-D H:m:s.SSS');
                }

            })
        ],

        exceptionHandlers: [
            new winston.transports.File({
                timestamp: function () {
                    return moment().format();
                },
                filename: sysConst.CLIENT_EXP_PATH
            })
        ],
        /*在运行出现错误时不退出服务*/
        exitOnError:false
    }
);

clientLog.cli();

//必须自定义 log 格式,方便后续处理


exports = module.exports = clientLog;
exports.devAccess = devAccess;