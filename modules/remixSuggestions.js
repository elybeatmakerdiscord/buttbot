const urlRegex = /((http(s)?:\/\/)((www\.)?|(m\.)?)((((youtu\.be\/|youtube.com\/watch))(((\?|&)v=)?.{11}))|(www\.)?twitch.tv\/\w+\/v\/\d+|clips\.twitch\.tv\/\w+))/gi;
const timestampRegex = /((&|\?)(t=)\d+)|((\d\d?:)?\d\d?:\d\d)|(clips\.twitch\.tv)/g;
const tips = [
    'TIP: If you already submitted a suggestion, and want to add a comment, edit your previous message.',
    'TIP: You can copy a link and timestamp from a youtube video by right clicking, and clicking "Copy video URL at current time"',
    'TIP: Don\'t respond to other people\'s messages. Your message will be deleted. Use a reaction instead',
];
const title = 'remixSuggestions';
const failedLink = 'Please include a link to the video you want remixed, and a timestamp.\nOtherwise, you cannot chat in this channel.';
const failedTimestamp = 'Please include the time of the video you want remixed';

async function timedDelete(msg, guildId, ctx) {
    const awaitedMsg = await msg;
    setTimeout(() => {
        awaitedMsg.delete();
    }, ctx.config.guilds[guildId].remixSuggestions.deleteTimer);
}


function failedMessage(reason, msg, ctx) {
    msg.delete(`buttbot/remixSuggestions: Failed ${reason} check`);
    if (ctx.config.guilds[msg.channel.guild.id].logChannel) {
        ctx.client.createMessage(ctx.config.guilds[msg.channel.guild.id].logChannel, `:speech_balloon: [remixSuggestions] Failed: ${reason}; <@${msg.member.id}> tried to say \`${msg.cleanContent}\` in <#${msg.channel.id}>`);
    }
    let reasonString = '';
    switch (reason) {
    case 'link':
        reasonString = failedLink;
        break;
    case 'timestamp':
        reasonString = failedTimestamp;
        break;
    // This should never fire
    default:
        reasonString = 'Invalid Message';
        break;
    }
    let tipString = '';
    if (tips.length > 0) {
        const tipSelector = Math.floor(Math.random() * tips.length);
        tipString = tips[tipSelector];
    }

    timedDelete(ctx.client.createMessage(msg.channel.id, {
        embed: {
            title,
            description: reasonString,
            footer: { text: tipString },
        },
    }), msg.channel.guild.id, ctx);
}

function remixSuggestions(args, ctx) {
    const msg = args[0];

    if (!ctx.util.shouldHandleMessage(msg, ctx, { configEntry: 'remixSuggestions' })) return;

    // Check if message occurs in affected channels
    if (!ctx.config.guilds[msg.channel.guild.id].remixSuggestions.affectedChannels.includes(msg.channel.id)) return;

    // Check if message author is immune
    if (msg.member.roles.includes(ctx.config.guilds[msg.channel.guild.id].immuneRoleId)) return;

    // Check if message contains YouTube url
    if (!msg.content.match(urlRegex)) {
        failedMessage('link', msg, ctx);
        return;
    }

    // Check if message contains a valid timestamp
    if (!msg.content.match(timestampRegex)) {
        failedMessage('timestamp', msg, ctx);
    }
    // All tests passed. Do no action
}


module.exports = [{
    name: 'remixSuggestions',
    event: 'messageCreate',
    func: remixSuggestions,
}];
