function badWords(args, ctx) {
    const msg = args[0];

    if (!ctx.util.shouldHandleMessage(msg, ctx, { configEntry: 'badWords' })) return;

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
