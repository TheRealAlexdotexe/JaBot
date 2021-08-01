const economy = require('../../economy')

module.exports = {
  commands: ['balance', 'bal'],
  description: 'Shows balance',
  maxArgs: 1,
  expectedArgs: "[Target user's @]",
  callback: async (message) => {
    const target = message.mentions.users.first() || message.author
    const targetId = target.id

    const guildId = message.guild.id
    const userId = target.id

    const coins = await economy.getCoins(guildId, userId)

    message.reply(`That user has ${coins} coins!`)
  },
}