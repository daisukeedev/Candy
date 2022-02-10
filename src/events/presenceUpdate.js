const {
    applicationId, 
    channelId, 
    ownerId, 
    messageStatus
} = require('../config.json');

module.exports = {
    name: 'presenceUpdate',
    once: false,
    execute (client, oldPresence, newPresence) {
        if (newPresence.userId !== applicationId) return;
        if (!oldPresence) return;
        if (oldPresence.status === newPresence.status) return;
        
        const channel = client.channels.cache.get(channelId);
        if (!channel) return console.log('ERROR: The channel to send the message does not exist or is invalid');
        if (!channel.permissionsFor(client.user.id).has('VIEW_CHANNEL')) return console.log('ERROR: The app does not have permission to view the set channel');
        if (!channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return console.log('ERROR: he application does not have permission to send messages to the established channel');

        switch (newPresence.status) {
            case 'online': {
                channel.send({
                    content: `<@${ownerId}> ${messageStatus.online}`
                });
            }
            break;
            case 'offline': {
                channel.send({
                    content: `<@${ownerId}> ${messageStatus.offline}`
                });
            }
        }
    }
}