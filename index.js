/*
 * Buttbot v2
 * Base mostly taken from https://gitlab.com/Cynosphere/HiddenPhox/-/blob/master/bot.js
 * Eris docs https://abal.moe/Eris/docs
 */

const Eris = require('eris');
const fs = require('fs');
const path = require('path');
// We plan to use sequelize later
const Sequelize = require('sequelize'); // eslint-disable-line no-unused-vars
const minimist = require('minimist');
const log = require('./log.js');
const config = require('./config.js');
// Not the best interpreter, but, we can do great things with it
// Might try copying https://github.com/mojang/brigadier in the future, but for now, this works

const client = new Eris(config.token, {
    // Large images for XP module
    defaultImageFormat: 'png',
    defaultImageSize: 1024,
});

client.on('ready', () => {
    log(0, 'ButtBot Instance Loaded.');
    log(0, `Logged in as: ${client.user.username}`);
    Object.entries(config.guilds).forEach((configuredGuild) => {
        if (configuredGuild[1].logStatus === true) {
            client.getChannel(configuredGuild[1].logChannel).createMessage('🔌 [Ready]: Ready!');
        }
    });
});

client.on('guildCreate', (guild) => {
    if (!config.guilds[guild.id]) {
        guild.leave();
        Object.entries(config.guilds).forEach((configuredGuild) => {
            if (configuredGuild[1].logStatus === true) {
                client.getChannel(configuredGuild[1].logChannel).createMessage(`:door: [Useless Guild]: Left useless guild \`${guild.id}\``);
            }
        });
    }
});

client.on('error', (err) => {
    if (err.message.length > 1900) {
        Object.entries(config.guilds).forEach((configuredGuild) => {
            if (configuredGuild[1].logStatus === true) {
                client.getChannel(configuredGuild[1].logChannel).createMessage('⛔ [Error]: Error too long to send.');
            }
        });
    } else {
        Object.entries(config.guilds).forEach((configuredGuild) => {
            if (configuredGuild[1].logStatus === true) {
                client.getChannel(configuredGuild[1].logChannel).createMessage(`⛔ [Error]: \`${err.message}\``);
            }
        });
    }
});

const ctx = {
    client,
    config,
    cmds: new Eris.Collection(),
    events: new Eris.Collection(),
    ratelimits: new Eris.Collection(),
    scheduledTasks: new Eris.Collection(),
};

/*
 * MODULE LOADING
 */


function loadEvent(module, file) {
    const eventName = `${file} | ${module.event} | ${module.name}`;
    switch (module.event) {
        case 'timer':
            break;
        case 'command':
            ctx.cmds.set(module.name, module);
            break;
        default:
            client.on(module.event, (...args) => { module.func(args, ctx); });
            ctx.events.set(eventName, module);
            break;
    }
}

const moduleDir = fs.readdirSync(path.join(__dirname, '/modules'));
moduleDir.forEach((file) => {
    /* There isn't really any other safe option for this
     * So we'll use dynamic imports, even if it's not recommended */
    // eslint-disable-next-line import/no-dynamic-require
    const newModule = require(path.join(__dirname, 'modules', file));

    if (newModule.length > 0) {
        newModule.forEach((subModule) => {
            loadEvent(subModule, file);
        });
    }
});

function commandHandler(msg) {
    if (!msg.author) return;
    if (msg.author.id === ctx.client.user.id) return;
    if (msg.author.bot) return;

    if (!msg.content.startsWith(ctx.config.prefix)) return;
    const command = msg.content.slice(ctx.config.prefix.length).split(' ')[0];
    // I wish there was a more elegant one liner for this
    const args = msg.content.slice(ctx.config.prefix.length).split(' '); args.shift(); args.join(' ');
    ctx.cmds.forEach((cmd) => {
        cmd.command.aliases.forEach((alias) => {
            if (alias !== command) return;
            cmd.func(msg, args, ctx);
        });
    });
}

client.on('messageCreate', commandHandler);
/*
 * TASK SCHEDULING
 */

/*
 * Logging
 */



client.connect();
