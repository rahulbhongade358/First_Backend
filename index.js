import express from "express";
import dotenv from "dotenv"
import cors from "cors";
dotenv.config()
 const app = express()
 app.use(express.json())
    app.use(cors())
 const REGISTERED_USERS =[
       {ID:1,
        firstName:"Kunal",
        middleName:"Rajendra",
        lastName:"Sonwane",
        gender:"male",
        DoB:"7/09/2000",
        email:"kunalsonwane@DOC.com",
    Contactnumber:"9112965256",
    Address:"Somalwar Khamla Sonegaon road",
    Whoareyou:"doctor",
    Licenseproof:"IND_DOC_5638@Kunal",
    MLN:"IND_DOC305681KUN5435",
    Specialization:"Physician",
    Experience:"10+",
    HCname:"Suertech Hospital",
     isApproved:false,
    registeredAt:new Date().toISOString()
},{
    ID:2,
        firstName:"Rahul",
        middleName:"Bhagawan",
        lastName:"Bhongade",
        gender:"male",
        DoB:"12/04/2004",
        email:"rahulbhongade@DOC.com",
    Contactnumber:"9112965273",
    Address:"Somalwar Khamla Sonegaon road",
    Whoareyou:"doctor",
    Licenseproof:"IND_DOC_12@RAHUL",
    MLN:"IND_DOC30981RAH5463",
    Specialization:"Cardiology",
    Experience:"15+",
    HCname:"Suertech Hospital",
     isApproved:false,
    registeredAt:new Date().toISOString()
}
 ]


 app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "API is healthy"
    })
})

 app.get("/registeredusers", (req,res)=>{
    res.json({
        success:true,
        data:REGISTERED_USERS,
        message:"Registered User Fetched successfully"
    })
 })

 app.get("/registeredusers/Search",(req,res)=>{
    
    const {firstName,email,role}=req.query
    const SearchedUser=REGISTERED_USERS.filter((search)=>{
        if (search.firstName.toLowerCase().includes(firstName.toLowerCase())&&search.email==email&&search.Whoareyou.toLowerCase().includes(role.toLowerCase())) {
            return true
        }return false
    })
res.json({
    success:true,
    data :SearchedUser,
    message:"Search User Found"
})
 })
 
 app.get("/registeredusers/:ID",(req , res)=>{
   
    const {ID}=req.params;
    const registered_user =REGISTERED_USERS.find((registered)=>{
        if(registered.ID==ID) return registered;
    });
    if(registered_user){
        res.json({
            success:true,
            data:registered_user,
            message:"User Fetched Successfully"
        })
    }else{
        res.json({
            success:false,
            message:"User Not Found"
        })
    }
 })
 app.post("/registeredusers",(req,res)=>{
  
    const {firstName,middleName,lastName,gender,DoB,email,
        Contactnumber,Address,Whoareyou,Licenseproof,MLN,
        Specialization,Experience,HCname}=req.body

    const Registration_Obj={
        ID:REGISTERED_USERS.length===0?1:REGISTERED_USERS[REGISTERED_USERS.length-1].ID+1,
        firstName:firstName,
        middleName:middleName,
        lastName:lastName,
        gender:gender,
        DoB:DoB,
        email:email,
        Contactnumber:Contactnumber,
        Address:Address,
        Whoareyou:Whoareyou,
        Licenseproof:Licenseproof,
        MLN:MLN,
        Specialization:Specialization,
        Experience:Experience,
        HCname:HCname,
        isApproved:false,
        registeredAt:new Date().toISOString()
    }
    REGISTERED_USERS.push(Registration_Obj)
    res.json({
        success:true,
        data:REGISTERED_USERS,
        message:"User registered Successfully"
    })
 })

 app.delete("/registeredusers/:ID",(req,res)=>{
    const{ID}=req.params;
    const index = REGISTERED_USERS.findIndex((i)=>i.ID==ID);
    if(index === -1){
        res.json({
            success:false,
            message:"user not found"
        })
    }else{
        REGISTERED_USERS.splice(index,1)
        res.json(
            {
                success:true,
                message:"User Deleted Successfully"
            }
        )
    }
 })
 app.patch("/registeredusers/:ID/verify",(req,res)=>{
    const {ID}=req.params;
    const {isApproved}=req.body;
    const index=REGISTERED_USERS.findIndex((user)=>user.ID==ID)
    if (index==-1) {
        res.json({
            success:false,
            message:"user not found"
        })
    }else{
        REGISTERED_USERS[index].isApproved=isApproved;
        res.json({
            success:true,
            data:REGISTERED_USERS[index],
            message:"User Verification Completed"
        })
    }
    
 })

 app.put("/registeredusers/:ID",(req,res)=>{
    const {ID}=req.params;
    const index = REGISTERED_USERS.findIndex((user)=>user.ID==ID)
    if (index == -1) {
      return res.json({
            success:false,
            message:"User not Found"
        })
    }
    const{firstName,middleName,lastName,gender,DoB,email,Contactnumber,Address,Specialization,Experience}=req.body;
    const editUser={
        ID:REGISTERED_USERS[index].ID,
        firstName,
        middleName,
        lastName,
        gender,
        DoB,
        email,
        Contactnumber,
        Address,
        Specialization,
        Experience,
        Whoareyou: REGISTERED_USERS[index].Whoareyou,
        Licenseproof:REGISTERED_USERS[index].Licenseproof,
        MLN:REGISTERED_USERS[index].MLN,
        HCname:REGISTERED_USERS[index].HCname,
        isApproved: REGISTERED_USERS[index].isApproved,
        registeredAt:REGISTERED_USERS[index].registeredAt,
    }
    REGISTERED_USERS[index]=editUser;
    res.json({
        success:true,
        data:editUser,
        message:"User Edit Successfully"
    })
 })
 const PORT = process.env.PORT||5003
 app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
 })