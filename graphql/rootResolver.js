const { merge } = require('lodash');
const eventResolver = require('./event/event.resolver');
const userResolver = require('./user/user.resolver');

//merge all the resolver into one rootResolver
module.exports = merge(eventResolver, userResolver);