function ping(msg, args, ctx) {
    msg.channel.createMessage('pong');
}

module.exports = [{
    name: 'ping',
    event: 'command',
    func: ping,
    command: {
        aliases: ['ping'],
    },
}];
