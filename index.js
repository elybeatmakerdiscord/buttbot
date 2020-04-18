/*
 * Buttbot v2
 * Base mostly taken from https://gitlab.com/Cynosphere/HiddenPhox/-/blob/master/bot.js
 */

const Eris = require('eris');
const Sequelize = require('sequelize');
const reload = require('require-reload')(require);
const log = require('./log.js');
const config = require('./config.js');

const client = new Eris(config.token, {
    // Large images for XP module
    defaultImageFormat: 'png',
    defaultImageSize: 1024,
});

const ctx = {
    client,
};

ctx.db = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,

    // SQLite only
    storage: 'database.mysql',
    define: {
        freezeTableName: true,
    },
});

client.on('ready', () => {
    log(0, 'ButtBot Instance Loaded.');
    log(0, `Logged in as: ${client.user.username}`);
});
