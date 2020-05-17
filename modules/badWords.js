function badWords(args, ctx) {
    const msg = args[0];

    // Check to make sure not a system/webhook message
    if (!msg.author) return;

    // Check to make sure we don't respond to ourselves
    if (msg.author.id === ctx.client.user.id) return;

    // Check to make sure the author of the message is not a bot
    if (msg.author.bot) return;

    // Check if we're in a guild
    if (!msg.channel.guild) return;

    // Check if guild has a config
    if (!ctx.config.guilds[msg.channel.guild.id]) return;

    // Check if message occurs in enabled guild
    if (!ctx.config.guilds[msg.channel.guild.id].noDeadChat) return;

    // make sure it's text message
    if (!msg.content) return;

    // Check if message author is immune
    if (msg.member.roles.includes(ctx.config.guilds[msg.channel.guild.id].immuneRoleId)) return;

    // Check if message contains badword
    ctx.config.badWords.forEach((i) => {
        if (msg.content.toLowerCase().includes(i)) {
            msg.delete('buttbot/badWords: Said blacklisted word');
            if (ctx.config.guilds[msg.channel.guild.id].logChannel) {
                ctx.client.createMessage(ctx.config.guilds[msg.channel.guild.id].logChannel, `:eye_in_speech_bubble: [badWords] <@${msg.member.id}> tried to say \`${msg.cleanContent}\` in <#${msg.channel.id}>`);
            }
        }
    });
}


module.exports = [{
    name: 'badWords',
    event: 'messageCreate',
    func: badWords,
}];
