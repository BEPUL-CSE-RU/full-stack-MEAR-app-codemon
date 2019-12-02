const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Data = require('./data');
const cors = require('cors');
const logger = require('morgan')
//const router = express.Router();

const api_port = 3002;
const app = express();
app.use(cors());
const dbRoute = "mongodb+srv://Bepul:Bepul@cluster0-lo1zs.mongodb.net/test2?retryWrites=true&w=majority";
mongoose.connect(dbRoute,{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false});

let db = mongoose.connection;
db.once('open',()=>console.log("connected to the database"));
//db.on('error', console.log(""));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));


app.get('/getData',(req,res)=>{
    Data.find((err,data)=>{
        if(err) return res.json({success: false, error: err});
        return res.json({success: true, data: data});
    });
    //res.send("express ready and port is 3002");
    //console.log(api_port+" api_port ready");
    
});

app.post('/postData',(req,res)=>{
    let data = new Data();
    const {id, msg } = req.body;
    if((!id && id!==0) || !msg){
        return res.json({
            success: false,
            error: 'Invalid inputs'
        });
    }
    data.id = id;
    data.msg = msg;
    data.save((err)=>{
        if (err) {
            return res.json({success: false, error: err});
        }
        return res.json({success: true});
    });
});

app.put('/updateData',(req,res)=>{
    const { id, update } = req.body;
    //console.log(update);
    console.log(id);
    
    //console.log(req.body);
    
    //var ob = { update};
    Data.findOneAndUpdate(id,update,{new:true},(err)=>{
        if (err) {
            return res.json({success: false, error: err});
        }
        return res.json({success: true});
    });
});

app.delete('/deleteData',(req,res)=>{
    const id = req.body;
    console.log(id);
    Data.findOneAndRemove(id,(err)=>{
        if (err) {
            return res.json(err);
        }
        return res.json({success: true})
    });
    
});

app.listen(api_port);