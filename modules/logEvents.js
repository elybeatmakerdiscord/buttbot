const moderativeEvents = ['messageDelete', 'messageUpdate', 'guildBanAdd', 'guildBanRemove'];
function logDelete(args, ctx) {
    const msg = args[0];

    // Check if message occurs in enabled guild
    if (!ctx.config.guilds[msg.channel.guild.id].logEvents) return;

    // Check if message author is immune
    if (msg.member.roles.includes(ctx.config.guilds[msg.channel.guild.id].immuneRoleId)) return;

    if (ctx.config.guilds[msg.channel.guild.id].msgLogChannel) {
        ctx.client.createMessage(ctx.config.guilds[msg.channel.guild.id].msgLogChannel, `:wastebasket: [logEvents] messageDelete; \`${msg.cleanContent}\` by ${msg.member.id} in <#${msg.channel.id}>`);
    }
}
module.exports = [{
    name: 'logDelete',
    event: 'messageDelete',
    func: logDelete,
}];
