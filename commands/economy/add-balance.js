const economy = require('../../economy')
const Discord = require('discord.js')

module.exports = {
    commands: ['addbalance', 'addbal', 'ab'],
    description: 'Adds balance out of thin air (Testing Purposes Only)',
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: ["<The target's @> <coin amount>"],
    permissionError: ':x: | You must be an administrator to execute this command. (Testing Purposes Only)',
    permissions: ['ADMINISTRATOR'],
    callback: async (message, arguments) => {
        const mention = message.mentions.users.first()

        if (!mention) {
            message.reply(':x: | Please specify a user!')
            return
        }

        const coins = arguments[1]
        if(isNaN(coins)) {
            message.reply(':x: | :nerd: Thats not a number silly!')
            return
        }

        const guildId = message.guild.id
        const userId = mention.id

        const newCoins = await economy.addCoins(guildId, userId, coins)

        const triBackTick = '```'
        const replyEmbed = new Discord.MessageEmbed()
        .setColor("#009206")
        .setDescription(`Successfully added ${coins} to <@${userId}>'s wallet!`)
        .addField('Balance:', `${triBackTick}\nOld Balance: ${newCoins - coins}\nNew Balance: ${newCoins}\n${triBackTick}`)

        message.reply(replyEmbed)
    }
}