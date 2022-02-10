const {
    applicationId,
    channelId
} = require('../config.json');
const notification = require('../functions/notification');

module.exports = {
    name: 'presenceUpdate',
    once: false,
    execute (client, oldPresence, newPresence) {
        if (newPresence.userId !== applicationId) return;
        if (!oldPresence) return;
        if (oldPresence.status === newPresence.status) return;

        let channel;
        if (channelId){
            channel = client.channels.cache.get(channelId);
            if (!channel) return console.log('ERROR: The channel to send the message does not exist or is invalid');
            if (!channel.permissionsFor(client.user.id).has('VIEW_CHANNEL')) return console.log('ERROR: The app does not have permission to view the set channel');
            if (!channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return console.log('ERROR: he application does not have permission to send messages to the established channel');
        };

        notification(client, channel, newPresence.status);
    }
}