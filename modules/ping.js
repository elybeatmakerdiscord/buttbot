function ping(msg) {
    msg.channel.createMessage('Pong.');
}

module.exports = [{
    name: 'ping',
    event: 'command',
    func: ping,
    command: {
        aliases: ['ping', 'p'],
    },
}];
