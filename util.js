module.exports.shouldHandleMessage = (msg, ctx, optIn) => {
    const options = {
        ignoreBots: true,
        guildOnly: true,
        configEntry: null,
        ...optIn,
    };

    // Check to make sure not a system/webhook message
    if (!msg.author) return false;

    // Check to make sure we don't respond to ourselves
    if (msg.author.id === ctx.client.user.id) return false;

    // Check to make sure the author of the message is not a bot
    if (options.ignoreBots && msg.author.bot) return false;

    // Check if we're in a guild
    if (options.guildOnly && !msg.channel.guild) return false;

    // Check if guild has a config
    if (options.configEntry && !ctx.config.guilds[msg.channel.guild.id]) return false;

    // Check if message occurs in enabled guild
    if (options.configEntry && !ctx.config.guilds[msg.channel.guild.id][options.configEntry]) {
        return false;
    }
    // make sure it's text message
    if (msg.content === '') return false;

    return true;
};
