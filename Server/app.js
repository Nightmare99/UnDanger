import express from 'express';
import body_parser from 'body-parser'
import multer from 'multer';
import mongoose from 'mongoose';
import path from 'path';
import { createUser, getDetails, updateDetails } from './helpers/dbops.mjs';

const __dirname = path.resolve();

mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, req.headers.username + '-' + file.fieldname + '-' + req.headers.filenum + '.wav');
    }
  });
var upload = multer({ dest: 'uploads/', storage: storage });
var app = express();
app.use(express.json());
app.use(body_parser.urlencoded({extended: false}))

app.get('/test', (req, res) => {
    res.write("Server status: running :)");
    res.end();
});

app.post('/register', (req, res) => {
  console.log(req.body);
  var uname = req.body.username;
  var pword = req.body.password;
  var email = req.body.email;
  createUser(uname, pword, email).then((result) => {
    console.log(result);
    if (result == 'success')
      var response = {  
          message: 'success',  
      };
    else if (result == 'email exists')
      var response = {  
        message: 'email exists',  
      };
    else 
      var response = {  
        message: 'username exists',  
      };
    console.log(response);
    res.send(JSON.stringify(response));
  });
});

app.post('/login', (req, res) => {
    console.log(req.body);
    var uname = req.body.username;
    var pword = req.body.password;
    console.log(uname);
    getDetails(uname).then((pass) => {
      console.log(pword + " " + pass);
      if (pass == pword)
        var response = {  
            message: 'success',  
        };
      else var response = {  
        message: 'failed',  
        };
      res.send(JSON.stringify(response));
    });
});

app.post('/writedb', (req, res) => {
  console.log(req.body);
  var username = req.body.state.username;
  var filePaths = [];
  filePaths.push(__dirname + '/uploads/' + username + '-file-1.wav');
  filePaths.push(__dirname + '/uploads/' + username + '-file-2.wav');
  filePaths.push(__dirname + '/uploads/' + username + '-file-3.wav');
  console.log(filePaths);
  var emergency = req.body.state.emergency;
  console.log(emergency);
  updateDetails(username, {recordingLocations: filePaths, emergency: emergency}).then((result) => {
    console.log(result);
    res.send(JSON.stringify({message: result}));
  }).catch((err) => console.log(err));
});

app.post('/upload', upload.single('file'), (req, res, next) => {
    console.log('File upload triggered.');
    const file = req.file;
    console.log(req.headers.username);
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
        console.log('File upload success.');
        res.send(JSON.stringify({message: "Success"}));
});

app.listen(8080);