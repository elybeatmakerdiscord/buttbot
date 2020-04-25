/*
 * Buttbot v2
 * Base mostly taken from https://gitlab.com/Cynosphere/HiddenPhox/-/blob/master/bot.js
 */

const Eris = require('eris');
const fs = require('fs');
const path = require('path');
// We plan to use sequelize later
const Sequelize = require('sequelize'); // eslint-disable-line no-unused-vars
const log = require('./log.js');
const config = require('./config.js');

const client = new Eris(config.token, {
    // Large images for XP module
    defaultImageFormat: 'png',
    defaultImageSize: 1024,
});

client.on('ready', () => {
    log(0, 'ButtBot Instance Loaded.');
    log(0, `Logged in as: ${client.user.username}`);
});

const ctx = {
    cmds: new Eris.Collection(),
    events: new Eris.Collection(),
    ratelimits: new Eris.Collection(),
};

// Load command function
function loadCommand(cmd, file) {
    ctx.cmds.set(cmd.name, cmd);
    log(0, `Loaded Command: ${cmd.name} (${file})`);
}

function loadEvent(event, file) {
    const eventName = `${event.event} | ${event.name}`;
    ctx.events.set(eventName, event);
    // createEvent(event);
    log(0, `Loaded event: ${eventName} (${file})`);
}


const moduleDir = fs.readdirSync(path.join(__dirname, '/cmds'));
moduleDir.forEach((file) => {
    /* There isn't really any other safe option for this
     * So we'll use dynamic imports, even if it's not recommended */
    // eslint-disable-next-line import/no-dynamic-require
    const newModule = require(path.join(__dirname, 'cmds', file));


    if (newModule.length > 0) {
        newModule.forEach((subModule) => {
            if (subModule.type === 0 && subModule.func && subModule.name) {
                loadCommand(subModule, file);
            } else if (subModule.type === 1 && subModule.event) {
                loadEvent(subModule, file);
            }
        });
    }
});

client.connect();
