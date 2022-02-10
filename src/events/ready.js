const {
    guildId,
    ownerId,
    applicationId
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

        console.log(`I'm ready and seeing ${app.user.tag}`);
    }
}