require('dotenv').config();
const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log('Mongodb Atlas Connected Successfully...');
}).catch((error)=>{
    console.log('Mongdb connection error: '+error);
})