// JaBotDB
const colors = require('colors')
const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
const antiAd = require('./anti-ad')
const config = require('./config.json')
const loadCommands = require('./commands/load-commands')
const mongoose = require('mongoose')
const mongo = require('./mongo')

client.on('ready', async () => {
  console.log('Success A'.green)
  await mongo().then(mongoose => {
    try {
      console.log('Success B'.green)
    } finally {
      mongoose.connection.close
    }
  })

  antiAd(client)
  loadCommands(client)
})

client.login(config.token)