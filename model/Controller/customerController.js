
const CustomerModel = require("../CustomerModel")
const jwt = require("jsonwebtoken")

const validator = require('../Controller/middleware/validator')




const registration = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter Data like tile,fullname etc" })
        }
        const { name, email, password, phone, subject } = data


        if (!validator.isvalid(name)) {
            return res.status(400).send({ status: false, massage: "please enter name" })
        }


        if (!validator.isvalid(email)) {
            return res.status(400).send({ status: false, massage: "please enter email" })
        }
        if (!validator.isValidEmail(email)) {
            return res.status(400).send({ status: false, massage: "please enter correct email like:- abc@gmail.com" })
        }
        const user = await CustomerModel.findOne({ email: email })
        if (user) {
            return res.status(400).send({ status: false, message: 'email already in use' })
        }

        if (!validator.isvalid(password)) {
            return res.status(400).send({ status: false, massage: "please enter password" })
        }
        if (password.length < 6 || password.length > 15) {
            return res.status(400).send({ status: false, massage: "please length should be 6 to 15 password" })
        }
        console.log(phone)
        if (!validator.isvalid(phone)) {
            return res.status(400).send({ status: false, massage: "please enter phonenumber" })
        }
        if (!validator.isValidPhone(phone)) {
            return res.status(400).send({ status: false, massage: "please enter correct phonenumber" })
        }

        let CusDetails = await CustomerModel.findOne({ phone: phone })
        if (CusDetails) {
            return res.status(400).send({ status: false, message: 'phone already in use' })

        }
        if (!validator.isvalid(subject[0])) {
            return res.status(400).send({ status: false, massage: "please enter correct subject" })
        }

        let createCustomer = await CustomerModel.create(data)
        return res.status(201).send({ status: true, message: "successful", data: createCustomer })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports.registration = registration


const loginUser = async (req , res) => {
    try {
        //Checking if no data is present in our request
        let data = req.body
        if (Object.keys(data) == 0) {
        return res.status(400).send({ status: false, message: "Please enter your details to login" })
        }

        //Checking if user has entered these mandatory fields or not
        const { phone,password} = data

        if (!validator.isvalid(phone)) {
             return res.status(400).send({ status: false, message: "phone is required" })
             }  

             if (!validator.isValidPhone(phone)) {
                return res.status(400).svnd({ status: false, massage: "please enter correct phonenumber" })
            }

             if (!validator.isvalid(password)) { 
            return res.status(400).send({ status: false, message: "Password is required" }) 
        }
        if (password.length < 6 || password.length > 15) {
            return res.status(400).send({ status: false, massage: "please length should be 6 to 15 password" })
        }

        console.log(phone)

        //Matching that email and password with a user document in our UserModel
        const userMatch = await CustomerModel.findOne({ phone: phone, password: password })
        //If no such user found 
        if (!userMatch) {
            return res.status(401).send({ status: false, message: "Invalid login credentials" })
        }

        //Creating a token if email and password matches
        const token = jwt.sign({
            userId: userMatch._id,
        }, "Secret-Key-given-by-us-to-secure-our-token")
        
        //Setting back that token in header of response
        res.setHeader("x-api-key", token);
        
        //Sending response on successfull login
        return res.status(200).send({ status: true, message: "You are successfully logged in", data: token })
    
    }
    //Exceptional error handling
    catch (error) {
        console.log(error)
        return res.status(500).send({status: false , message: error.message })
   }
}
 const findSubject =  async (req , res) =>{
    try{
        // let subject = await CustomerModel.find({$sortArray:{input:"$subject",sortBy:{"subject":1}}}).select({name:1,subject:1, _id:0})
        let filter= {}

        let Csubject = await CustomerModel.find()
        for(let i=0;i<Csubject.length;i++){
            filter["name"]=Csubject[i].name
            filter["subject"]=Csubject[i].subject.sort()
        }
        
        return res.status(200).send({ status:true , message:"sucessfull" ,data:filter})
    }

    catch (error) {
        console.log(error)
        return res.status(500).send({status: false , message: error.message })
   }
}

const updateCustomer = async (req , res)=> {
    try {
        let data = req.body

        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, message: "Please enter your details to login" })
        }
     const {email,name} = data
     if (!validator.isvalid(email)) {
        return res.status(400).send({ status: false, message: "email is required" })
    }
    if (!validator.isvalid(name)) {
        return res.status(400).send({ status: false, message: "Newname is required" })
    }
    if (!validator.isValidEmail(email)) {
        return res.status(400).send({ status: false, massage: "please enter correct email like:- abc@gmail.com" })
    }

        let findByEmail = await CustomerModel.findOne({email:email})
        if(!findByEmail){
            return res.status(400).send({ status: false, message: "please enter correct email" })
        }
        if(findByEmail.name==name){
            return res.status(400).send({ status: false, message: "please enter different name both are same" })
        }
            
        let updatecutomer = await CustomerModel.findOneAndUpdate({email:email},{$set:{name:name}},{new:true})
        return res.status(200).send({ status: true, message: "successful",data:updatecutomer })




    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }
}


const CustomerDetails = async (req,res) =>{
 try{
    let data = await CustomerModel.find()
    return res.status(200).send({ status: true, message: "successful",data:data })

 
}
catch (error) {
    console.log(error)
    return res.status(500).send({ status: false, message: error.message })
}
}



module.exports.loginUser = loginUser
module.exports.findSubject = findSubject
module.exports.updateCustomer=updateCustomer
module.exports.CustomerDetails=CustomerDetails

