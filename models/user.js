const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Event = require('./event');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
    },

    {
        //setting that allow the virtual field events to be shown like a normal field
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

userSchema.virtual('events', {
    'ref': 'Event',
    'foreignField': 'creator',
    'localField': '_id'
});

//encrypts the password before creating the user in the db
userSchema.pre('save', async function (next) {
    const user = this;
    //Hash the plain text password 
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 12);
    }

    //Callback to be called after the logic is done  so mongoose knows it's done
    //This is necessary once this function is asynchronous
    next();
});

//Delete events of the user before deleting the user
userSchema.pre('remove', async function (next) {
    const user = this;
    await Event.deleteMany({ user: user._id });
    next();
});

// userSchema.methods.toJSON = function () {
//     const user = this;
//     console.log('inside ToJSON: ' + user);
//     const userObject = user.toObject();
//     //delete the password and tokens from the user object that will be sent to the user in the response
//     delete userObject.password;
//     console.log('toObject: ' + userObject);
//     return userObject;
// }

const User = mongoose.model('User', userSchema);
module.exports = User;