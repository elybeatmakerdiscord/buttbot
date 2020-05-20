function ping(msg, ctx) {
    const pongMsgPool = ['Pong.',
        'PING discordapp.com (162.159.129.233): 56 data bytes\n64 bytes from 162.159.129.233: icmp_seq=0 ttl=56 time=17.979 ms',
        'PoNg.', 'pong', 'Pong', ':ping_pong:', ':ping_pong: Pong', 'whoops, i missed', 'no', 'PONG', 'gnoP', 'Pong³', '³', 'p³ng', '𝒫𝒪𝒩𝒢', '𝐏𝐎𝐍𝐆', 'what does that mean', 'poggers', '<:YeetAary:664279299255435267>', 'now you\'re thinking with portals', 'stop poking me', `Pong!, ${msg.member.id / 2}ms`, `Pong!, ${msg.member.id / 4}ms`, `Pong!, ${msg.member.id / 32}ms`, `Pong!, -${msg.member.id / 1.5}ms`];
    const rng = (Math.random() * 10);
    if (rng < 1) {
        msg.channel.createMessage(pongMsgPool[Math.floor(Math.random() * pongMsgPool.length)]);
    } else if ((Math.random() * 10) < 1) {
        ctx.client.sendChannelTyping(msg.channel.id);
    } else {
        msg.channel.createMessage(pongMsgPool[0]);
    }
}

module.exports = [{
    name: 'ping',
    event: 'command',
    func: ping,
    command: {
        aliases: ['ping', 'p', 'pong', 'pingpong', ':ping_pong:'],
    },
}];
