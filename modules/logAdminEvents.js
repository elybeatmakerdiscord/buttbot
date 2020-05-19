function sendMessage(adminLogChannels, message, ctx) {
    adminLogChannels.forEach((channelId) => {
        ctx.client.getChannel(channelId).createMessage(message);
    });
}

function logAdminEvents(args, ctx, eventName) {
    // Get logging guilds
    const adminLogChannels = [];
    Object.entries(ctx.config.guilds).forEach((configuredGuild) => {
        if (configuredGuild[1].logStatus === true) {
            adminLogChannels.push(configuredGuild[1].logChannel);
        }
    });

    switch (eventName) {
    case 'ready':
        sendMessage(adminLogChannels, ':electric_plug: [Ready]: Ready!', ctx);
        break;
    case 'warn':
        console.log('WARN');
        console.log(args);
        break;
    case 'error':
        sendMessage(adminLogChannels, `:no_entry: [Error]: ${args[0].message}`, ctx);
        console.error(args);
        break;
    default:
        break;
    }
}
module.exports = [{
    name: 'logAdminEvents',
    event: ['ready', 'error', 'warn'],
    func: logAdminEvents,
}];
