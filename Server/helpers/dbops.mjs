import mongoose from 'mongoose';
import { User } from '../models/schemas.mjs';

mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export async function createUser(username, password, email) {
    const me = new User({
        email: email,
        username: username,
        password: password,
    });
    try {
        await me.save();
        return 'success';
    }
    catch(err) { 
        var error = Object.keys(err.keyPattern)[0] + ' exists';
        return error; 
    }
}

export async function updateDetails(username, fields) {
    try {
        console.log(fields);
        var up = await User.findOneAndUpdate({username: username}, fields, {upsert: true});
        console.log('Success');
        return 'success';
    }
    catch(err) {
        console.log('There was an error:\n' + err);
        return 'failure';
    }
}

export async function getDetails(username) {
    try {
        var user = await User.findOne({ username: username });
        console.log(user.password);
        return user.password;
    }
    catch(err) {
        console.log(err);
        return 'Not Found';
    }
}
//createUser("vishal", "abcde", "example@example.com");
//getDetails("vishal4");