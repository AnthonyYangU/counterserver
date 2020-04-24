const { binToFloat } = require('./numberConvert.js')
const { counterUpdateOrCreate } = require('../mongo.js')
// var counter = {
//     u16 deviceId;
//     u8 errorFlag;
//     u8 equipErr;
//     u8 year;
//     u8 month;

//     u8 day;
//     u32 counterNumber;
//     float battery;
//     u16 tile;
// }

//head:5b5a

function dataConvert (data) {
    let deviceId = dataReverse(data.substring(4, 8));
    let errorFlag = data.substring(8, 10);
    let equipeErr = data.substring(10, 12);
    let year = data.substring(12, 14);
    let month = data.substring(14, 16);
    let day = data.substring(16, 18);
    let counterNumber = dataReverse(data.substring(24, 32));
    let battery = dataReverse(data.substring(32, 40));
    let tile = dataReverse(data.substring(40, 44));

    // console.log('deviceId', deviceId);
    // console.log("errorFlag", errorFlag);
    // console.log("battery", battery);
    // console.log("equipeErr", equipeErr);
    // console.log("year", year);
    // console.log('month', month)
    // console.log('day', day)
    // console.log("counterNumber", counterNumber)
    // console.log("barrery", battery)
    // console.log("tile", tile)

    deviceId = parseInt(deviceId.join(''));
    equipErr = parseInt(equipeErr, 16)
    errorFlag = parseInt(errorFlag, 16)
    counterNumber = parseInt(counterNumber.join(''), 16);

    // let sum=0;
    // for(let i=0;i<8;i++){
    //     sum += parseInt(counterNumber.substring())
    // }
    year = parseInt(year, 16);
    year = year < 10 ? '0' + year : year;
    month = parseInt(month, 16)
    month = month < 10 ? '0' + month : month;
    day = parseInt(day, 16)
    day = day < 10 ? '0' + day : day;
    let date = '20' + year + '-' + month + '-' + day

    let batteryBin = parseInt(battery.join(''), 16).toString(2)
    // console.log(batteryBin)
    battery = binToFloat(batteryBin).toFixed(2)
    // var counterTest = {
    //     deviceId:1002,
    //     data:{
    //         count:10,
    //         battery:3.3,
    //         date:'2018-12-58',
    //         status:0
    //     }
    // };

    // console.log('deviceId', deviceId);
    // console.log("errorFlag", errorFlag);
    // console.log("battery", battery);
    // console.log("equipeErr", equipeErr);
    // console.log(date)
    // console.log("counterNumber", counterNumber)
    // console.log("barrery", battery)
    // console.log("tile", tile)    

    let status = 0;

    if (equipeErr != 0) {
        status = 3;
    } else if (errorFlag != 0) {
        status = 1;
    }

    let counterData = {
        deviceId: deviceId,
        data: {
            count: counterNumber,
            battery: battery,
            date: date,
            status: status
        }
    }

    // console.log(counterData);
    counterUpdateOrCreate(counterData).then(() => {
        console.log("Data receive success, counter data is", counterData)
    })

}
function dataReverse (data) {
    let arr = [];
    let len = data.length;
    for (let i = 2; i <= len; i = i + 2) {
        arr.push(data.substring(len - i, len - i + 2));
    }
    // console.log(arr)
    return arr;
}
// dataConvert('5b5a010000000a0b0200000012000000000000006b6a0000')
// dataReverse('01002356');
// console.log('5b5a0100000000000000000000000000000000006b6a0000'.length)

module.exports = dataConvert;