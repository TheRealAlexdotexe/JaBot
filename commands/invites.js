module.exports = {
    category: 'Economy',
    description: 'Shows how many people each person invited!',
    commands: ['invites', 'invite', 'ivte'],
    callback: (message) => {
      const { guild } = message
  
      guild.fetchInvites().then((invites) => {
        const inviteCounter = {}
  
        invites.forEach((invite) => {
          const { uses, inviter } = invite
          const { username, discriminator } = inviter
  
          const name = `${username}#${discriminator}`
  
          inviteCounter[name] = (inviteCounter[name] || 0) + uses
        })
  
        let replyText = '**Invites:**\n'
  
        const sortedInvites = Object.keys(inviteCounter).sort(
          (a, b) => inviteCounter[b] - inviteCounter[a]
        )
  
        console.log(sortedInvites)
        
        const backtick = "`"

        for (const invite of sortedInvites) {
          const count = inviteCounter[invite]
          replyText += `${backtick}${invite} has invited ${count} member(s)!${backtick}\n`
        }
  
        message.reply(replyText)
      })
    },
  }