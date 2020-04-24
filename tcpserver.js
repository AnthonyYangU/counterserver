const net = require('net');
const TCP_PORT = "9001"
const TIMEOUT = 6000;//tcp客户端超过6秒没发数据判为超时并断开连接
const dataConvert = require('./utils/dataProcess');

// var tcpClient = null;//tcp客户端

const tcpServer = net.createServer((socket) => {
    //connect
    let addr = socket.address().address + ':' + socket.address().port;
    console.log(addr, "connect.");
    socket.addr = addr;
    tcpClient = socket;

    // recieve data
    socket.on("data", data => {
        // console.log(data)
        let receivedData = data.toString('hex')
        let str = addr + " receive: " + receivedData + '\n';
        console.log(str);
        if (receivedData.length == 48 && receivedData.substring(0, 4) == '5b5a') {
            dataConvert(receivedData)
        } else {
            console.log('Data module error');
        }
        // if(receivedData.length == )
        // if(receivedData.substring(0,4) === '5aab' && receivedData.substring())
        // socket.lastValue = Translate(data.toString('hex'));
    });

    // close
    socket.on('close', () => {
        console.log(addr, "close");
        // tcpClient = null;
    });

    socket.on('error', (err) => {
        console.log("error", err);
        // tcpClient = null;
    });

    socket.setTimeout(TIMEOUT);

    // 超过一定时间 没接收到数据，就主动断开连接。
    socket.on('timeout', () => {
        console.log(socket.addr, 'socket timeout');
        socket.end();
        // tcpClient = null;
    });

});

tcpServer.on("error", (err) => {
    console.log(err);
    tcpClient = null;
});

tcpServer.listen({ port: TCP_PORT, host: '0.0.0.0' }, () => {
    console.log('tcp server running on', tcpServer.address())
});

// function sentCommand(command){
//     if(tcpClient){
//         if(command === 'open')
//         tcpClient.write('1','ascii');
//         else if(command === 'close')
//         tcpClient.write('0','ascii');
//     }else{
//         console.log("openLed error:no tcpClient.")
//     }
// }
function start () {
    console.log(`Tcp server run at port ${TCP_PORT}!`)
}
// function getData(){
//     if(tcpClient){
//         return tcpClient.lastValue;
//     }else{
//         console.log("getData error:no tcpClient.");
//     }
// }
module.exports = start;