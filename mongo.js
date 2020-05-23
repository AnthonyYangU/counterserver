var mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/counter',{
        user:'counterManager',
        pass:'q95519000a',
        poolSize:10,
        useNewUrlParser:true,
        useUnifiedTopology: true
}).then(()=>{
    console.log('数据库连接成功')
})

var counterUserSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    userPwd:{
        type:String,
        required:true,
    }
})

const counterUserModel = mongoose.model('counterUser',counterUserSchema);

var counterSchema = mongoose.Schema({
    deviceId:{
        type:Number,
        required:true,
        unique:true
    },
    lastData:{
        lastCount:{
            type:Number,
            required:true,
        },
        lastBattery:{
            type:Number,
            required:true
        },
        lastDate:{
            type:String,
            required:true
        },
        lastStatus:{
            type:String,
            required:true
        },
    },
    data:[{
        count:{
            type:Number,
            required:true,
        },
        battery:{
            type:Number,
            required:true
        },
        date:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        }
    }],
})

const counterModel = mongoose.model('counter',counterSchema);

async function userRegister(userInfo){
    return await counterUserModel.create(userInfo,err=>{
        // console.log(userInfo)
        if(err){
            console.log(err)
        }
    })
}

async function userDelete(userName){
    return await counterUserModel.deleteOne({userName:userName},(err)=>{
        if(err)
            console.log(err);
    })
}

async function userFind(userInfo){
    return await counterUserModel.findOne(userInfo,(err)=>{
        if(err){
            console.log(err)
        }
    })
}

async function userUpdate(userInfo){
    return await counterUserModel.updateOne({userName:userInfo.userName},userInfo,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log(userInfo.userName," 用户信息更新完成")
        }
    })
}

async function counterCreate(counterInfo){
    return await counterModel.create(counterInfo,err=>{
        if(err)
            console.log(err)
    })
}

async function counterFindAll(){
    return await counterModel.find(err=>{
        if(err)
            console.log(err)
    }).sort({_id: 1}).select('deviceId lastData')
}

async function counterFindDetail(deviceId){
    return await counterModel.findOne(deviceId,err=>{
        if(err)
            console.log(err)
    }).select('deviceId data')
}
//$push 有bug
// {upsert:true}
/**
 * 
 * @param {Object} counterInfo 
 */
async function counterUpdateOrCreate(counterInfo){
    // console.log(counterInfo)
    return await counterModel.updateOne({
        deviceId:counterInfo.deviceId
    },{
        lastData:{
            lastCount:counterInfo.data.count,
            lastBattery:counterInfo.data.battery,
            lastDate:counterInfo.data.date,
            lastStatus:counterInfo.data.status,
        },
        $addToSet:{
            data:counterInfo.data
        }
    },{upsert:true},(err)=>{
        if(err){
            console.log(err)
        }
    })
}

async function counterDelete(id){
    return await counterModel.deleteOne(id,err=>{
        if(err){
            console.log(err)
        }else{
            console.log(`Delete one data, _id is ${id._id}`)
        }
    })
}

async function counterDeleteMany(deviceIdArray){
    return await counterModel.deleteMany({deviceId:{$in:deviceIdArray}}),err=>{
            console.log(`Delete ${deviceIdArray.length} successfully`)
    }
}

var userTest = {
    userName:'anthony5',
    userPwd:'q95519000a'
}

var counterTest = {
    deviceId:1002,
    data:{
        count:10,
        battery:3.3,
        date:'2018-12-58',
        status:0
    }
};

function simulateData(){
    var i = 0;
    setInterval(() => {

        i++;
    }, 200);
    
    for(let j=0;j<20;j++){
        counterTest.deviceId = 1000 + j;
        for(let i=0;i<20;i++){
            if(i==10){
                counterTest.data.status=1
            }else if(i==15){
                counterTest.data.status=2
            }else if(i==18){
                counterTest.data.status=3
            }else{
                counterTest.data.status=0
            }
            let day = i+1>=10?'-' + (i+1):'-' + '0' + (i+1);
            counterTest.data.count = 10 + i*2 ;
            counterTest.data.battery = (3.15 + 0.3*i*i).toFixed(3)
            counterTest.data.date = '2020' + '-' + '0' + 4 + day
            // console.log(counterTest.data.battery)
            counterUpdateOrCreate(counterTest).then(data=>{
                console.log(data)
            })
        }
    }
}
function tester(){
    // userTest.userName = '14255536'
    // userRegister(userTest).then(data=>{
    //     console.log(data)
    // })
    // console.log(userRegister(userTest))
    // userFind({userName:'anthony'}).then((data)=>{
    //     console.log(data)
    // })
    // userStatus('anthony').then((data)=>{
    //     console.log(data)
    // })
    // userTest.userName = '01234s';
    // userUpdate(userTest).then(data=>{
    //     console.log(data)
    // })

    // counterTest.deviceId = 20001;
    // counterCreate(counterTest).then(data=>{
    //     counterUpdate(counterTest).then(data=>{
    //         console.log(data)
    //     })        
    // })

    // counterFindAll().then(data=>{
    //     console.log(data)
    // })
    // simulateData()
    // counterUpdateOrCreate(counterTest)
    // counterFindAll().then(data=>{
    //     console.log(data)
    // })
    // counterFindDetail(1002).then(data=>{
    //     console.log(data)
    // })
    // userStatus('01234s').then(data=>{
    //     console.log(data)
    // })
    // userStatus('0123s').then(data=>{
    //     console.log(data)
    // })
    // counterDeleteMany([1008,1009]).then(data=>{
    //     //  console.log(data)
    // })
}

tester();
module.exports = {
    userRegister,
    userFind,
    userUpdate,
    counterFindAll,
    counterFindDetail,
    counterUpdateOrCreate,
    simulateData,
    counterDelete,
    counterDeleteMany
}