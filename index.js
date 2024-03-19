const express = require("express")
const path = require("path")
const hbs = require("hbs")
const bodyParser = require("body-parser")
const employee = require("./models/Employee")
require("./dbConnent")

const encoder = bodyParser.urlencoded()

const app = express()

app.use(express.static(path.join(__dirname,"/views/public")))
app.set("view engine","hbs")
hbs.registerPartials(path.join(__dirname,"/views/partials"))


app.get("/",async (req,res)=>{
try{
let data = await employee.find().sort({_id:1})
res.render("index",{data:data})
}
catch(error){
console.log(error)
}
})

app.get("/add",(req,res)=>{
    res.render("add")
})

app.post("/add",encoder,(req,res)=>{
try{
let data = new employee(req.body)
data.save()
res.redirect("/")
}
catch(error){
console.log(error)
}
})

app.get("/delete/:_id", async(req,res)=>{
try {
    let data = await employee.findOne({_id:req.params._id})
    await data.deleteOne()
    res.redirect("/")

    // await employee.deleteOne({_id:req.params._id})
    // res.redirect("/")
} 
catch (error) {
   console.log(error) 
}
})

app.get("/edit/:_id",async(req,res)=>{
try {
    let data = await employee.findOne({_id:req.params._id})
    res.render("edit",{data:data})
} 
catch (error) {
    console.log(error)
}
})


app.post("/edit/:_id",encoder,async(req,res)=>{
    try {
        await employee.updateOne({_id:req.params._id},req.body)
        res.redirect("/")
    } 
    catch (error) {
        console.log(error)
    }
    })


app.get("/search",async(req,res)=>{
    try {
        let search = req.query.search
    let data = await employee.find({
        $or:[
            {name:{$regex:`/*${search}/*`,$options:"i"}},
            {email:{$regex:`/*${search}/*`,$options:"i"}},
            {designation:{$regex:`/*${search}/*`,$options:"i"}},
            {phone:{$regex:`/*${search}/*`,$options:"i"}},
            {city:{$regex:`/*${search}/*`,$options:"i"}},
            {state:{$regex:`/*${search}/*`,$options:"i"}},
        ]
    })
    res.render("index",{data:data})
    }
     catch (error) {
        console.log(error)
    }
})    

app.listen(8000,()=>console.log("server is running at http://localhost:8000"))