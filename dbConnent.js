const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/testing-crud")
.then(()=>{
    console.log("Database is Connected")
})
.catch((error)=>{
    console.log(error)
})


// (async function connectDatabase(){
//     try{
//         await mongoose.connect("mongodb://127.0.0.1:27017/testing-crud")
//         console.log("Database is Connected")
//     }
//     catch(error){
//         console.log(error)
//     }
// })()