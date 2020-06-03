const fishes = [
    'FishAary:715712493850460190',
    'FishAri:716317361711349810',
    'FishEly:715711570549932132',
    'FishJC:715301869781516531',
    'FishLain:715696523069095947',
    'FishMelone:715713407034065057',
    'FishOwen:715325048537350196',
    'FishPara:716317361967464519',
    'FishRex:716317361782915073',
    'FishRoth:716716856127258704',
];
function sillies(args, ctx) {
    const msg = args[0];
    // Check to make sure not a system/webhook message
    if (!msg.author) return;

    // Check to make sure we don't respond to ourselves
    if (msg.author.id === ctx.client.user.id) return;

    // Check to make sure the author of the message is not a bot
    if (msg.author.bot) return;

    // Check if we're in the trivia channel
    if (msg.channel.id !== '554566075333869579') return;

    // Add emoji reactions
    fishes.forEach((emojiName) => {
        msg.addReaction(emojiName, '@me');
    });
}
module.exports = [{
    name: 'sillies',
    event: 'messageCreate',
    func: sillies,
}];
