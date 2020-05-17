function sillies(args, ctx) {
    const msg = args[0];
    // Check to make sure not a system/webhook message
    if (!msg.author) return;

    // Check to make sure we don't respond to ourselves
    if (msg.author.id === ctx.client.user.id) return;

    // Check to make sure the author of the message is not a bot
    if (msg.author.bot) return;
    // Check if we're in a server with sillies
    if (!ctx.config.guilds[msg.channel.guild.id]) return;
    if (!ctx.config.guilds[msg.channel.guild.id].sillies) return;

    ctx.config.guilds[msg.channel.guild.id].sillies.forEach((silly) => {
        if (msg.content.toLowerCase() === silly.match) {
            msg.channel.createMessage(silly.response);
        }
    });
}
module.exports = [{
    name: 'sillies',
    event: 'messageCreate',
    func: sillies,
}];
