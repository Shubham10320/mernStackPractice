const UserModel = require("../Models/userModel");
const moment=require('moment')


const userRegister=async (req, res)=>{
  const{userName, email, gender, status}=req.body;
  console.log(userName, email, gender, status)
  const isUser= await UserModel.findOne({email});
  if(isUser){
    res.status(400).send({message:"User Already Exist, Try With Another Account"})
  }
    const createdDate=moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
    const newUser=new UserModel({userName, email, gender, status, dateCreated:createdDate})
    await newUser.save();
    res.status(200).send({message:"User Registered Successfully", data:newUser})
}

const getUser=async(req, res)=>{
  const search=req.query.search || '';
  // const page=req.query.page || '';
  // const limit=req.query.limit || 2;
  const query={
    userName:{$regex:search, $options:'i'}
  }
  // const skip=(page-1)*limit

  try {
    // const allUsers=await UserModel.find(query).limit(limit).skip(skip) pagination and limitations
    const allUsers=await UserModel.find(query)
    res.status(200).send({message:"Here is all users", data:allUsers})
  } catch (error) {
    res.status(400).send({message:"unable to get users"})
  }
}





const deleteUser=async(req, res)=>{
   const {id}=req.params;
   console.log(id)
   try {
    const isUser=await UserModel.findOne({_id:id})
    if(isUser){
     const deleteUser= await UserModel.findByIdAndDelete({_id:id})
     res.status(200).send({message:"user delete successfully", deleteUser:deleteUser})

    }else{
      res.status(400).send({message:"User Not Found"})
    }
   } catch (error) {
    
   }
}
const updateUser=async(req, res)=>{
   const {id}=req.params;
   const{userName, email, gender, status}=req.body;
   console.log(id)
   try {
    const isUser=await UserModel.findOne({_id:id})
    if(isUser){
     const updatedDate=moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
     const updatedUser= await UserModel.findByIdAndUpdate({_id:id},{userName, email, gender, status, dateUpdated:updatedDate}, {new:true})
     res.status(200).send({message:"user updated successfully", updatedUser:updatedUser})
    }else{
      res.status(400).send({message:"User Not Found"})
    }
   } catch (error) {
    console.log(error)
   }
}



module.exports={userRegister,getUser, deleteUser, updateUser}