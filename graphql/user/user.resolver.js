const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

    login: async ({ loginInput }) => {

        try {

            const user = await User.findOne({ email: loginInput.email });

            if (!user) {
                throw new Error('Invalid Credentials');
            }

            const isPasswordRight = await bcrypt.compare(loginInput.password, user.password)

            if (!isPasswordRight) {
                throw new Error('Invalid Credentials');
            }

            const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_KEY, { expiresIn: '1h' });

            return { userId: user.id, token, tokenExpiration: 1 };

        } catch (error) {
            console.log('Error while trying to login: ' + error);
        }
    },

    users: async () => {
        try {

            const users = await User.find().populate('events');
            return users;

        } catch (error) {
            console.log('Error while trying to fetch users: ' + error);
        }
    },

    user: async (props) => {
        try {

            let user = await User.findOne({ ...props.userInput }).populate('events');
            return user;
        } catch (error) {
            console.log('Error while trying to fetch users: ' + error);
        }
    },

    createUser: async props => {
        try {

            let userDB = await User.findOne({ email: props.userInput.email });

            if (userDB) {
                throw new Error('Us er already exists');
            }

            const user = new User({
                ...props.userInput,
            });

            userDB = await user.save();

            return { ...userDB._doc, password: null };
        } catch (error) {
            console.log('Error while trying to create user: ' + error);
        }
    },
}