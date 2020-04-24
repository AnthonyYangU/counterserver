


// function hexTobin(n){
//     let num = parseInt(n,16)
//     console.log(num)
// }

// hexTobin('12')

// function hexToInt(n){
//     let num = parseInt(n,16).toString();
//     console.log()
// }

// function hexArrayToFloat(){

// }

function floatToBin (float) {
    // let float = -9;
    let BinArray = new Array(32);
    if (float.length == 0)
        return console.log("Error")

    if (float == 0) {
        for (let i = 0; i < BinArray.length; i++) {
            BinArray[i] = 0
        }
        return BinArray.join('')
    }

    // let signal,//31正负号,正0负1
    //     indexSignal,//30指数的正负号,正1，非负0
    //     index,//29-23指数
    //     body;//22-0
    // let pointPosition = 0;
    var signal = '0'
    //0 代表正，1 代表负
    if (float < 0) {
        float = - float
        signal = '1'
    } else {
        signal = '0'
    }
    var indexSiganl, index, body;

    let binString = float.toString(2);
    // console.log(binString)
    // console.log(binString)
    let len = binString.length;
    let pointPosition = binString.indexOf('.')
    // console.log(pointPosition)

    if (pointPosition == -1) {
        pointPosition = len
    }
    if (pointPosition == 0) {
        return console.log(error)
    }
    if (pointPosition == 1) {
        indexSiganl = 0
        if (binString[0] == '1') {
            index = 127
            body = bodyCon(binString.substring(2, len))
        } else {
            let onePosition = firstNumber(binString)
            index = pointPosition - onePosition + 127;
            body = bodyCon(binString.substring(onePosition + 1, len))
        }
    }

    if (pointPosition > 1) {
        indexSiganl = 1;
        index = 127 + pointPosition - 1;
        binString = binString.replace('.', '');
        body = bodyCon(binString.substring(1, len))
    }
    // console.log("index 1 is",index.toString(2))

    if (indexSiganl == 1) {
        index = index.toString(2).substring(1, 8);
    } else {
        index = index.toString(2)
    }
    // console.log(signal)
    // console.log(indexSiganl)
    // console.log("index 2 is",index)
    // console.log("body is",body)
    //高位在前，低位在后
    var result = signal + indexSiganl + index + body
    // console.log(result)
    return result;
}

function firstNumber (BinArray) {
    for (let i = 0; i < BinArray.length; i++) {
        if (BinArray[i] == '1')
            return i
    }
}
function bodyCon (array) {
    var test = []
    for (let i = 0; i < 23; i++) {
        if (i < array.length)
            test.push(array[i])
        else
            test.push('0')
    }
    return test.join('')
}
// 10111110110000000000000000000000 -0.375
function binToFloat (bin) {
    while (bin.length < 32) {
        bin = '0' + bin;
    }
    var result, index, body;
    index = parseInt(bin.substring(1, 9), 2) - 127;
    // console.log("index result is ",index)
    body = '1.' + bin.substring(9, 32)
    body = binToDecimal(body)
    // console.log("body result is",body)
    if (bin[0] == '0') {
        result = Math.pow(2, index) * body
    } else if (bin[0] == '1') {
        result = -Math.pow(2, index) * body
    }

    // console.log(result)
    return result

}

function binToDecimal (bin) {
    let pointPosition = bin.indexOf('.')
    let sum = 0;
    if (pointPosition == '-1') {
        pointPosition = bin.length
    }
    for (let i = 0; i < bin.length; i++) {
        if (i < pointPosition) {
            sum += bin[i] * Math.pow(2, pointPosition - i - 1)
        }
        if (i > pointPosition) {
            sum += bin[i] * Math.pow(2, pointPosition - i)
        }
    }
    return sum
}

// let t = floatToBin(0);
// let v = binToFloat(t).toFixed(2)
// console.log(t)
// console.log(v)
module.exports = { binToFloat }