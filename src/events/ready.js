const {
    guildId,
    ownerId,
    applicationId,
    users
} = require('../config.json');

module.exports = {
    name: 'ready',
    once: true,
    execute (client) {
        const guild = client.guilds.cache.get(guildId);
        if (!guild) return console.log('ERROR: I am not present on the server or it is invalid');
        const owner = guild.members.cache.get(ownerId);
        if (!owner) return console.log('ERROR: You do not belong to the established server or it is invalid');
        const app = guild.members.cache.get(applicationId);
        if (!app) return console.log('ERROR: The application does not belong to the server or is invalid');
        if (typeof users !== 'object') return console.log('ERROR: The users key must be of type Array. Example: ["123456789"]');

        console.log(`I'm ready and seeing ${app.user.tag}`);
    }
};