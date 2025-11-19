const express=require('express');
const app=express();
const mongoose =require('mongoose');
const path = require('path');
const Chat=require('./models/chats.js')

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'views','public')));

main().then(()=>{console.log('Connection is Successfull.')})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// index route
app.get('/chats',async(req,res)=>{
    let chats=await Chat.find();
    console.log(chats);
    res.render('index.ejs',{chats});
})

let chat1=new Chat({
    from: 'Idrees',
    to: 'Burhan',
    message:'send me your exam sheets.',
    created_at: new Date()
});
chat1.save().then((res)=>{console.log(res)})

// Root Route
app.get('/',(req,res)=>{
    res.send('Root is working.')
})
app.listen(8080,()=>{
    console.log('server is listening on port 8080.');
})