const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!bUser) return message.channel.send("Can't Find That User.");
let bReason = args.join(" ").slice(22);
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Can't do that my guy!");
if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

let banEmbed = new Discord.RichEmbed()
.setDescription("~Ban~")
.setColor("#e56b00")
.addField("Banned User", `${bUser} with ID ${bUser.id}`)
.addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
.addField("Banned In", message.channel)
.addField("Time", message.createdAt)
.addField("Reason", bReason);

let incidentschannel = message.guild.channels.find(`name`, "incidents");
if(!incidentschannel) return message.channel.send("Can't find incidents channel");

message.guild.member(bUser).ban(bReason);
incidentschannel.send(banEmbed);
}

module.exports.help = {
    name: "ban"
}






