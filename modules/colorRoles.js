function color(msg, args, ctx) {
    // Check if guild has a config
    if (!ctx.config.guilds[msg.channel.guild.id]) return;

    // Check if message occurs in enabled guild
    if (!ctx.config.guilds[msg.channel.guild.id].colorRoles) return;

    // Check if message author has preresiquite roles
    if (
        ctx.config.guilds[msg.channel.guild.id].colorRoles.requires
        && msg.member.roles.includes(ctx.config.guilds[msg.channel.guild.id].colorRoles.requires)
    ) return;
    console.log(ctx.config.guilds[msg.channel.guild.id].colorRoles.roles[args['0']]);
}

module.exports = [{
    name: 'color',
    event: 'command',
    func: color,
    command: {
        aliases: ['color'],
    },
}];
