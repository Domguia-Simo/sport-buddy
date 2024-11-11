const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()

app.use(cors({origin:'*'}))
// app.use(bodyParser({extended:false}))
app.use(bodyParser.json())


const port = 5000

const url = "mongodb://127.0.0.1:27017/sport_buddy"
mongoose.connect(url).then(()=>{
    console.log("Connection to db successfull")
})
.catch(e => console.log(e))


const userRoutes = require('./routes/userRoutes')
const sportRoutes = require('./routes/sportRoutes')
const cityRoutes = require('./routes/cityRoutes')
const areaRoutes = require('./routes/areaRoutes')
const eventRoutes = require('./routes/eventRoutes')


app.use("/api/user" ,userRoutes)
app.use("/api/sport" ,sportRoutes)
app.use("/api/city" ,cityRoutes)
app.use("/api/area" ,areaRoutes)
app.use("/api/event" ,eventRoutes)


app.get("/" ,(req ,res)=>{
    return res.send("Welcome to sport buddy")
})

app.get("*" ,(req ,res)=>{
    return res.send("API Not found")
})

app.listen(port ,()=>{
    console.log("Server running on port "+port)
})