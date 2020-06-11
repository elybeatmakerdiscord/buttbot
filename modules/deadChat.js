function noDeadChat(args, ctx) {
    const msg = args[0];
    if (!ctx.util.shouldHandleMessage(msg, ctx, { configEntry: 'noDeadChat' })) return;
    // Check if message author is immune
    if (msg.member.roles.includes(ctx.config.guilds[msg.channel.guild.id].immuneRoleId)) return;

    // Check if message contains dead chat
    ctx.config.deadChatStrings.forEach((deadChatString) => {
        if (msg.content.toLowerCase().includes(deadChatString)) {
            msg.delete('buttbot/badWords: Said dead chat');
            if (ctx.config.guilds[msg.channel.guild.id].logChannel) {
                ctx.client.createMessage(ctx.config.guilds[msg.channel.guild.id].logChannel, `:skull_crossbones: [deadChat] <@${msg.member.id}> tried to say \`${msg.cleanContent}\` in <#${msg.channel.id}>`);
            }
        }
    });
}

module.exports = [{
    name: 'deadChat',
    event: 'messageCreate',
    func: noDeadChat,
}];
