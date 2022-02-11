const {
    sendDM,
    ownerId,
    messageStatus,
    users
} = require('../config.json');

function notification (client, channel, status) {
    if (sendDM) {
        const ownerUser = client.users.cache.get(ownerId);
        if (!ownerUser) {
            console.log('ERROR: I could not find you. The ID is invalid or we do not have a common server');
        } else {
            switch (status) {
                case 'online': {
                    ownerUser.send({
                        content: `<@${ownerId}> ${messageStatus.online}`
                    }).catch((err) => console.error(err));
                };
                break;
                case 'offline': {
                    ownerUser.send({
                        content: `<@${ownerId}> ${messageStatus.offline}`
                    }).catch((err) => console.error(err));
                };
            };
        };

        if (users[0]) {
            users.map(function(userId) {
                const user = client.users.cache.get(userId);
                if (!user) {
                    console.log(`ERROR: I couldn't find the user ${userId}. The ID is invalid or we do not have a common server`);
                } else {
                    switch (status) {
                        case 'online': {
                            user.send({
                                content: `<@${userId}> ${messageStatus.online}`
                            }).catch((err) => console.error(err));
                        };
                        break;
                        case 'offline': {
                            user.send({
                                content: `<@${userId}> ${messageStatus.offline}`
                            }).catch((err) => console.error(err));
                        };
                    };
                };
            });
        };
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
        };
    };

};

module.exports = notification;