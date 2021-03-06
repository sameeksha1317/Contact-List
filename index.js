const express = require('express');
const path = require('path');
const { isRegExp } = require('util');
const port = 8001;

const db = require('./config/mongoose');
const Contact =  require('./models/contact');

const app =express();

app.set('view engine' , 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assests'));
//middleware1

// app.use(function(req,res,next){
// console.log('moddleware1');
// next();

// });

// //middleware2
// app.use(function(req,res,next){
//     console.log('moddleware2');
//     next();
    
//     });
var contactList = [
    {
        name : " Sameeksha",
        phone : "12345"
    },
    
    {
        name : " Twinkle",
        phone : "1777775"
    },
    
    {
        name : " Hasrsh",
        phone : "000000"
    }
    
    ]

app.get('/',function(req,res){
    // console.log(__dirname);
    // res.send('<h1>Chill and Enjoy</h1>');
 
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Erre in fetching contacts');
            return 
        }

        return res.render('home',{
            title : "Contact List",
            contact_list : contacts
        });

    });
    
   
});

app.get('/practice' ,function(req,res){
return res.render('practice',{
    title : "playyyyy"
});
});


app.post('/create-contact',function(req,res){
// return res.redirect('/practice');
// console.log(req.body);
// console.log(req.body.name);
// console.log(req.body.phone);

// contactList.push({
// name : req.body.name,
// phone : req.body.phone
// });
Contact.create({
    name : req.body.name,
    phone :req.body.phone
},function(err,newContact){
if(err){
    console.log('erre in creating contact');
    return;
}
console.log('*****',newContact);
return res.redirect('back');
});

});





// app.get('/delete-contact/',function(req,res){
// // console.log(req.query);

// let id = req.query.id;
// Contact.findByIdAndDelete(id, function(err){
//     if(err){
//         console.log('error in deleting ');
//         return;
//     }
//     return res.redirect('back');
// });
// // let phone = req.query.phone;
// // let contactIndex = contactList.findIndex(contact => contact.phone==phone);
// // if(contactIndex != -1){
// //     contactList.splice(contactIndex , 1);
// // }


// });
app.get('/delete-contact/', function(req, res){
    console.log(req.query);
    let id = req.query.id

    Contact.findOneAndDelete(id, function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('back');
    });   
});





app.listen(port , function(err){
if(err){
    console.log('Error in running the server',err);
}

console.log('happy!');
});