const router = require('koa-router')();
const Controller = require('./controller/index')
// const multer = require('koa-multer')
// const uuidV1 = require('uuid/v1')

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       const fileFormat = (file.originalname).split('.')
//       cb(null, uuidV1()+'.'+fileFormat[fileFormat.length-1])
//     }
//   })
  
// var upload = multer({ storage: storage })
// const bodyParser = require('koa-body')();
// const bodyParser = require('koa-bodyparser');
module.exports = (app)=>{
    // app.use(bodyParser());
    router.get('/api',Controller.api);
    router.post('/api/register',Controller.register);
    router.get('/api/userfind',Controller.userfind);
    router.post('/api/login',Controller.login);
    router.get('/api/delete',Controller.delete);
    // router.post('/api/upload',upload.single('file'),Controller.upload);
    router.get('/api/detail',Controller.detail);
    router.post('/api/dm',Controller.dm);
    router.post('/api/equipRegister',Controller.equipRegister);
    router.get('/api/findEquip',Controller.findEquip);
    router.post('/api/findEquipById',Controller.findEquipById);
    router.post('/api/deleteEquip',Controller.deleteEquip)
    app.use(router.routes()).use(router.allowedMethods());
};


