const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
    name:{
        type:"string"
    },
    email:{
        type:"string"
    },
    phone:{
        type:"string"
    },
    designation:{
        type:"string"
    },
    salary:{
        type:"number"
    },
    city:{
        type:"string"
    },
    state:{
        type:"string"
    }
})

const Employee = new mongoose.model("Employee",employeeSchema)
module.exports = Employee