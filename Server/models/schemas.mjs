import mongoose from 'mongoose'

export const UserSchema = mongoose.Schema({
    email: {
        type : String, 
        required: true,
    },
    username: {
        type : String, 
        required: true,
        unique: true,
        dropUps: true,
    },
    password: {
        type: String,
        required: true
    },
    recordingLocation: {
        type: String,
    },
    emergency: [{
        name: {
            type: String,
        },
        phone: {
            type: String,
        },
    }],
})
export var User = mongoose.model('User', UserSchema)