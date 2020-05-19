function ping(msg) {
    msg.channel.createMessage({
        embed:
        {
            title: 'ButtBot',
            description: "A specialized bot for ely's discord server",
            fields: [
                {
                    name: 'Lead Developer',
                    value: '**Ariana** (adryd)  | <@298475055141355520> | https://adryd.com/\n',
                },
                {
                    name: 'Additional Credits',
                    value: '<@409166189974257714>:  Zachary | <@138862213527109632> | https://zachary.fun/\n<@711541439636701245>: Zivex | <@449433954529837056> | https://www.patreon.com/CommunityGamesBot\ndiscord lib: https://github.com/abalabahaha/eris\nsmall parts of code used from: https://gitlab.com/Cynosphere/HiddenPhox/-/blob/master/bot.js\n\nButtbot is open source. You can contribute here: https://github.com/elybeatmakerdiscord/buttbot.',
                },
            ],
            footer: {
                text: '<3LY',
            },
        },
    });
}

module.exports = [{
    name: 'credits',
    event: 'command',
    func: ping,
    command: {
        aliases: ['credits'],
    },
}];
