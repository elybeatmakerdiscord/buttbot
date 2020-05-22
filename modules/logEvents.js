const moderativeEvents = ['messageDelete', 'messageUpdate', 'guildBanAdd', 'guildBanRemove'];
function logEditsDeletes(args, ctx) {
    const msg = args[0];

    // Check if message occurs in enabled guild
    if (!ctx.config.guilds[msg.channel.guild.id].logEvents) return;
    if (!ctx.config.guilds[msg.channel.guild.id].logChannels) return;
    if (!ctx.config.guilds[msg.channel.guild.id].logChannels.editsDeletes) return;

    // Allow mods to delete messages from log channel
    if (msg.channel.id === ctx.config.guilds[msg.channel.guild.id].logChannels.editsDeletes) return;

    ctx.client.createMessage(
        ctx.config.guilds[msg.channel.guild.id].logChannels.editsDeletes,
        `:wastebasket: [logEvents] messageDelete; by ${msg.member.username}#${msg.member.discriminator} in <#${msg.channel.id}>\n**Content:**\n${msg.cleanContent}`,
    );
}

function logJoinsLeaves(args, ctx, eventName) {
    const guild = args[0];
    const member = args[1];
    if (!ctx.config.guilds[guild.id].logChannels
        && !ctx.config.guilds[guild.id].logChannels.joinsLeaves) return;

    if (eventName === 'guildMemberAdd') {
        ctx.client.createMessage(ctx.config.guilds[guild.id].logChannels.joinsLeaves, `:door: [guildMemberAdd] \`${member.username}#${member.discriminator} ${member.id}\` joined`);
    }
    if (eventName === 'guildMemberRemove') {
        ctx.client.createMessage(ctx.config.guilds[guild.id].logChannels.joinsLeaves, `:leaves: [guildMemberRemove] \`${member.username}#${member.discriminator} ${member.id}\` left`);
    }
}
module.exports = [{
    name: 'logEditsDeletes',
    event: 'messageDelete',
    func: logEditsDeletes,
}, {
    name: 'logJoinsLeaves',
    event: ['guildMemberAdd', 'guildMemberRemove'],
    func: logJoinsLeaves,
}];
