const express = require('express');
const cors = require('cors');
const { connection } = require('./config/db'); 
const {DevAuthrouter} = require("./routes/DeveloperAuth.routes")
const {ClientAuthrouter} = require("./routes/ClientAuth.routes")
const {router} = require("./routes/DevBoard.routes")

const app = express();
app.use(express.json());
app.use(cors());

app.use('/developer', DevAuthrouter);
app.use('/client', ClientAuthrouter);
app.use("/dev", router)


app.listen(process.env.PORT , async()=>{
    try {
        await connection;
        console.log("connected to the database!!")
        
    } catch (error) {
        console.log("can't connect")
    }
    console.log(`server is running at port ${process.env.PORT}`)
})