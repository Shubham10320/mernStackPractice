const express=require('express')
const router=express.Router();
const controller=require('../Controller/controllers')

router.post('/user/register', controller.userRegister)  //create
router.get('/getAllUser', controller.getUser)   //read
router.delete('/deleteUser/:id', controller.deleteUser)  //delete
router.put('/user/edit/:id', controller.updateUser)   //update


module.exports=router