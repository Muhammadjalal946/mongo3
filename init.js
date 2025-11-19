const mongoose=require('mongoose');
const Chat=require('./models/chats.js'); 

main().then(()=>{console.log('Connection is Successfull.')})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
let allChats =[
    {
    from: 'Idrees',
    to: 'Burhan',
    message:'send me your exam sheets.',
    created_at: new Date()
    },
    {
    from: 'Gul',
    to: 'Saqib',
    message:'send me your exam sheets.',
    created_at: new Date()
    },
    {
    from: 'Jalal',
    to: 'waqar',
    message:'send me your exam sheets.',
    created_at: new Date()
    },
    {
    from: 'Salman',
    to: 'Yousaf',
    message:'send me your exam sheets.',
    created_at: new Date()
    }
];
Chat.insertMany(allChats);
