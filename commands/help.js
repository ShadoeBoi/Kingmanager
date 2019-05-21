const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.name)
    .addField("Commands:")
    .addField("f!help: the command you are doing right now :)")
    .addField("f!report: you can report a player that is disobeying the rules and gets the attention of a staff to help you")
    .addField("f!doggo: Generates a random picture of a dog")
    .addField("f!tempmute(Moderator): tempmutes the user you choose for the period of time you choose.")
    .addField("f!kick(Moderator): kicks the player you choose and logs it")
    .addField("f!ban(Moderator): bans the user you choose")
    .addField("f!coins: shows you have many coins you have, you have a 1/40 chance of recieving them by chatting")
    .addField("f!pay: lets you pay coins to the user you want")
    .addField("f!level: shows what level you are, you gain levels and xp by chatting.")
    .addField("f!warn(Moderator): warns a user. 2 warnings: tempmute, 4 warnings: ban")
    .addField("f!warnings(Moderators): shows how many warnings a user has")
    .addField("Note: please have a incidents channel and a reports channel. More commands are comming soon since the bot is in beta!");

    message.channel.send(botembed);
}

module.exports.help = {
  name:"serverinfo"
}