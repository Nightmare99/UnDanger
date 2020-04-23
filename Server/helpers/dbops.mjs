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

export function updateDetails(username, fields) {
    User.findOneAndUpdate({username: username}, fields, {upsert: true}, function(err, doc) {
        if (err) {
            console.log('There was an error:\n' + err);
            return {message: 'failure'};
        }
        else {
            console.log('Success');
            return {message: 'success'};
        }
    });
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