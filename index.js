const express=require('express');
const app=express();
const mongoose =require('mongoose');
const path = require('path');
const Chat=require('./models/chats.js')
const methOverride= require('method-override')

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methOverride('_method'))


main().then(()=>{console.log('Connection is Successfull.')})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// index route
app.get('/chats',async(req,res)=>{
    let chats=await Chat.find();
    // console.log(chats);
    res.render('index.ejs',{chats});
})

//New Routes
app.get('/chats/new',(req,res)=>{
    res.render('new.ejs');
});

// update route
app.put('/chats/:id',async (req,res)=>{
    let {id}=req.params;
    let {message:newMsg}=req.body;
    console.log(newMsg);
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        {message:newMsg},
        {runValidators:true,new:true});
        console.log(updatedChat);

        res.redirect('/chats');

});


// Create Route
app.post('/chats',(req,res)=>{
    let {from,to,message}=req.body;
    // console.log({from,to,message})
    let newChatt= new Chat ({
        from:from,
        to:to,
        message:message,
        created_at: new Date()
    });
    newChatt.save().then(res=>{console.log('Chat was saved');

    }).catch((err)=>{
        console.log(err);
    });
    res.redirect('/chats');
});

// Edit Route
app.get('/chats/:id/edit',async(req,res)=>{
        let {id}=req.params;
        let chat= await Chat.findById(id);
    res.render('edit.ejs',{chat});
});

// Destroy Route
app.delete('/chats/:id',async(req,res)=>{
    let {id}=req.params;
    await Chat.findByIdAndDelete(id);
    
    res.redirect('/chats')
    

});

// let chat1=new Chat({
//     from: 'Idrees',
//     to: 'Burhan',
//     message:'send me your exam sheets.',
//     created_at: new Date()
// });
// chat1.save().then((res)=>{console.log(res)})

// Root Route
app.get('/',(req,res)=>{
    res.send('Root is working.')
})
app.listen(8080,()=>{
    console.log('server is listening on port 8080.');
})