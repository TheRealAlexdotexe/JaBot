const mongo = require('../../mongo')
const warnSchema = require('../../schemas/warn-schema')

module.exports = {
    commands: [
    'infractions',
    'wrnhistory',
    'listwarnings',
    'showwarnings',
    'lw',
    'infractionhistory',
    'showinfractionhistory',
    'showinfraction',
    ],
    description: 'Shows how many warns a person has',
    minArgs: 1,
    expectedArgs: "<Target User's @",
    requiredRoles: ['Endermen'],
    callback: async (message, agreements, text) => {
        const target = message.mentions.users.first()
        if (!target) {
            message.reply(':x: | Please specify a target!')
            return
        }

        const guildId = message.guild.id
        const userId = target.id

        await mongo().then(async mongoose => {
            try {
                const results = await warnSchema.findOne({
                    guildId,
                    userId,

                })

                let reply = `Warning History for <@${userId}>:\n\n`

                if (results === null) {
                    message.channel.send(":+1: Clean record!")
                    return
                }

                for (const warning of results.warnings) {
                    const { author, timestamp, reason } = warning

                    reply += `Warned by ${author} on ${new Date(timestamp).toLocaleDateString()} for "${reason}"\n\n`
                }

                message.reply(reply)
            } finally {
                mongoose.connection.close()
            }
        })
    }
}