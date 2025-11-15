const express=require('express');
const app=express();
const mongoose =require('mongoose');
const path = require('path');
const Chat=require('./models/chats.js')

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

main().then(()=>{console.log('Connection is Successfull.')})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let chat1=new Chat({
    from: 'Muhammad',
    to: 'khan',
    message:'send me your exam sheets.',
    created_at: new Date()
})

// Root Route
app.get('/',(req,res)=>{
    res.send('Root is working.')
})
app.listen(8080,()=>{
    console.log('server is listening on port 8080.');
})