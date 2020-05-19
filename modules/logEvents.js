const moderativeEvents = ['messageDelete', 'messageUpdate', 'guildBanAdd', 'guildBanRemove'];
function logDelete(args, ctx) {
    const msg = args[0];

    // Check if message occurs in enabled guild
    if (!ctx.config.guilds[msg.channel.guild.id].logEvents) return;

    // Check if message author is immune
    //if (msg.member.roles.includes(ctx.config.guilds[msg.channel.guild.id].immuneRoleId)) return;

    // Allow mods to delete messages from log channel
    if (msg.channel.id === ctx.config.guilds[msg.channel.guild.id].msgLogChannel) return;

    if (ctx.config.guilds[msg.channel.guild.id].msgLogChannel) {
        ctx.client.createMessage(ctx.config.guilds[msg.channel.guild.id].msgLogChannel, `:wastebasket: [logEvents] messageDelete; by ${msg.member.username}#${msg.member.discriminator} in <#${msg.channel.id}>\n**Content:**\n${msg.cleanContent}`);
    }
}
module.exports = [{
    name: 'logDelete',
    event: 'messageDelete',
    func: logDelete,
}];
