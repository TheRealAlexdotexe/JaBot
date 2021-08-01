const channelId ='817498192740089877'
const backTick = '`'
const triBackTick = '```'
const Discord = require('discord.js')
const em1 = '✅'
const em2 = '❌'

module.exports = {
    category: 'Misc',
    description: 'Creates a suggestion in the #suggestions channel',
    commands: ['suggestion', 'suggest', 'sug'],
    minArgs: 1,
    expectedArgs: '<message>',
    callback: (message, arguments, text) => {
        const { guild, member } = message

        const channel = guild.channels.cache.get(channelId)
        const embed = new Discord.MessageEmbed()
        .setDescription(`**Suggestion Created By *<@${message.author.id}>!***`)
        .setThumbnail(message.author.avatarURL())
        .addField(':white_check_mark: or :x:', `${triBackTick}${text}${triBackTick}`)
        .setTimestamp()
        channel.send(embed).then((message) => {
            message.react(`${em1}`)
            message.react(`${em2}`)
        })
        
    }
}

