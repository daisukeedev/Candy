const {
    sendDM,
    ownerId,
    messageStatus
} = require('../config.json');

function notification (client, channel, status) {
    if (sendDM) {
        const user = client.users.cache.get(ownerId);
        if (!user) {
            console.log('ERROR: I could not find you. The ID is invalid or we do not have a common server');
        } else {
            switch (status) {
                case 'online': {
                    user.send({
                        content: `<@${ownerId}> ${messageStatus.online}`
                    }).catch((err) => console.error(err));
                };
                break;
                case 'offline': {
                    user.send({
                        content: `<@${ownerId}> ${messageStatus.offline}`
                    }).catch((err) => console.error(err));
                }
            };
        }
    };

    if (!channel) return;

    switch (status) {
        case 'online': {
            channel.send({
                content: `<@${ownerId}> ${messageStatus.online}`
            });
        };
        break;
        case 'offline': {
            channel.send({
                content: `<@${ownerId}> ${messageStatus.offline}`
            });
        }
    };

}

module.exports = notification;