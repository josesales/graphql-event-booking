const User = require('../../models/user');

module.exports = {

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
            // user = await user.populate('events').execPopulate();
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

            // const password = await bcrypt.hash(props.userInput.password, 12);

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