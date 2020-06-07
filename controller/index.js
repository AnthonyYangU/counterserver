const {userRegister,userFind,userUpdate,counterUpdateOrCreate,counterFindAll,counterFindDetail,
    counterDelete,counterDeleteMany,findEquip,creatEquip,findEquipById,deleteEquip} = require('../mongo.js')

const JSON_MIME = 'application/json'
module.exports = {
    register:async (ctx,next) =>{
        let userInfo = ctx.request.body;
        ctx.type = JSON_MIME;
        userRegister(userInfo);
        ctx.response.body = {
            status:0,
        }
    },
    userfind:async (ctx,next)=>{
        let userName = ctx.request.query;
        // console.log(userName)
        ctx.response.body = {
            status: ((await userFind(userName))==null?0:1)
        }
        // let userName = {userName:ctx.request.body}
    },
    login: async (ctx,next) =>{
        // console.log(ctx.request.body)
        let userInfo={};
        userInfo.userName = ctx.request.body.userName,
        userInfo.userPwd = ctx.request.body.userPwd;
        ctx.response.body = {
            status: ((await userFind(userInfo))==null?0:1)
        }
    },
    api: async(ctx,next)=>{
        ctx.response.body = {
            status:0,
            data: await counterFindAll()
        }
    },
    detail: async(ctx,next)=>{
        let deviceId = ctx.request.query;
        // console.log(deviceId)
        ctx.response.body = {
            status:0,
            data: await counterFindDetail(deviceId)
        }
    },
    delete: async(ctx,next)=>{
        let id = ctx.request.query;
        // console.log(id)
        ctx.response.body = {
            status:0,
            data:await counterDelete(id)
        }
    },
    dm:async(ctx,next)=>{
        let delArray = ctx.request.body.delArray;
        console.log(`Delete ${delArray.length} successfully`)
        ctx.response.body = {
            status:0,
            data:await counterDeleteMany(delArray)
        }
    },
    equipRegister:async(ctx,next)=>{
        let requestData = ctx.request.body;
        // console.log(requestData);
        ctx.response.body={
            status:await creatEquip(requestData.ruleForm)
        }
    },
    findEquip:async(ctx,next)=>{
        ctx.response.body={
            status:0,
            data:await findEquip()
        }
    },
    findEquipById:async(ctx,next)=>{
        let requestData = ctx.request.body;
        // console.log(requestData);
        ctx.response.body={
            status:0,
            data:await findEquipById(requestData)
        }
    },
    deleteEquip:async(ctx,next)=>{
        let id = ctx.request.body;
        // console.log(id)
        ctx.response.body={
            status1:await counterDelete(id),
            status2:await deleteEquip(id)
        }
    }

}