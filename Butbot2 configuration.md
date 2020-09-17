# Butbot2 configuration

Configuration of the bot is done in the `config.js` file which will need to be renominated from `config.example.js`.

Setting | Type | Description
--|--|--
`token` | Sting | This comes from the [developer portal of Discord](https://discord.com/developers/applications) and allows your bot to authenticate. You get this by selection (or creating) your application, going in the bot section on the left (if not yet done enabling the bot account), and clicking on the "copy" button under the token section. **Make sure to keep this always a secret and never leak it.**
`prefix` | String | This is what you call the bot by and precedes all the commands (ex. `!ping` in this case the prefix is set to `!`).
`owner` | String | This is the id who owns/hosts the bot (AKA you) and will give acces to special commands.
`deadChatStrings` | Array of Strings | This are the strings that the bot will use to compare and find "dead chat messages" which will be deleted if the protection is enabled on the server.
`badWords` | Array of Strings | This are the strings that the bot will use for bad word detection and autodeletion when enabled on the server.
`guilds` | JSON object | This is the list of all the severs the bot manages. Each entry is named by the server id (ex. `'123456789012345678':{settings}`), thus we will name this value as `id` from on.
`guilds.id.immuneRoleId` | String | This is the id of the immune role, whoever had this role will be ignore from bad word and dead chat checking.
`guilds.id.muteRoleId` | String | This is the id of the role that is given to people when they get server muted (AKA blocked from talking for x ammount of time).
`guilds.id.guildId` | String | This is the id of the server and should be identical to the previously discussed id.
`guilds.id.logChannel` | String | This is the id of the log channel.
`guilds.id.logChannels` | JSON object | Settings of the log channels. Can be omitted and everything will go in one place.
`guilds.id.logChannels.joinsLeaves` | String | Id of the channel where the join and leave messages will be logged.
`guilds.id.logChannels.editsDeletes` | String | Id of the channel where the edit and delete of messages will be logged.
`guilds.id.logChannels.modulesLogChannel` | String | Id of the channel where everything else gets logged.
`guilds.id.noDeadChat` | Boolean | This enables the "dead chat messages" detection and removal feature. Requires `deadChatStrings`.
`guilds.id.logEvents` | Boolean | This enables the messages logging feature. Requires `guilds.id.logChannel`.
`guilds.id.remixSuggestions` | JSON object | Configuration of the remix suggestion repost detection.
`guilds.id.remixSuggestions.affectedChannels` | Array of Strings | This are the ids where the remix suggestion repost detection is enabled.
`guilds.id.remixSuggestions.deleteTimer` | Integer | This is for how much time (in seconds) will pass before the message from buttbot will get deleted.
`guilds.id.sillies` | Array of JSON objects | This are perfet matches that the bot will look for in messages to then respond.
`guilds.id.sillies.match` | String | This is the text the bot will look for.
`guilds.id.sillies.response` | String | This is what the bot will answer with when a match is found.
`guilds.id.colorRoles` | JSON object | This are the settings for the color roles.
`guilds.id.colorRoles.roles` | Array of Strings | This are all the roles ids of all the colors, the bot will give them by the number (AKA index in the array) and remove the others if any.
`guilds.id.colorRoles.requires` | String | This is the role required to be able to get the color roles.

This file will be updated as new features are introduced.