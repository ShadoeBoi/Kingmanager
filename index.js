const botconfig = require("./botconfig.json");
const tokenfile = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");
let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 5;


fs.readdir("./commands", (err, files) => {

    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

});



bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`)
    bot.user.setGame("Alpha Release! Being Worked On!");
});

bot.on("guildMemberAdd", async member => {
    console.log(`${member.id} joined the server.`);

    let welcomechannel = member.guild.channels.find(`name`, "🌹friendly-main-chat");
    welcomechannel.send(`LOOK OUT! ${member} has joined the kingdom!`);

});

bot.on("guildMemberRemove", async member => {

    console.log(`${member.id} joined the server.`);

    let welcomechannel = member.guild.channels.find(`name`, "🌹friendly-main-chat");
    welcomechannel.send(`WOW! ${member} has left the kingdom! What a poopoo!`);

});

bot.on("channelCreate", async channel => {

    console.log(`${channel.name} has been created.`);

    let sChannel = channel.guild.channels.find(`name`, "🌹friendly-main-chat");
    sChannel.send(`${channel} has been created`);
});

bot.on("channelDelete", async channel => {

    console.log(`${channel.name} has been deleted.`);

    let sChannel = channel.guild.channels.find(`name`, "🌹friendly-main-chat");
    sChannel.send(`${channel} has been deleted`);
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    if(!coins[message.author.id]){
        coins[message.author.id] = {
            coins: 0
        };
    }

    let coinAmt = Math.floor(Math.random() * 35) + 5;
    let baseAmt = Math.floor(Math.random() * 35) + 5;
    console.log(`${coinAmt} ; ${baseAmt}`);

    if(coinAmt === baseAmt){
        coins[message.author.id] = {
            coins: coins[message.author.id].coins + coinAmt
        };
        fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
            if (err) console.log(err)
        });
        let coinEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor("#0000FF")
        .addField("💸", `${coinAmt} coins added!`);

        message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
        }

        let xpAdd = Math.floor(Math.random() * 7) + 8;
        console.log(xpAdd);

        if(!xp[message.author.id]){
            xp[message.author.id] = {
                xp: 0,
                level: 1
            };
        }

        
        let curxp = xp[message.author.id].xp;
        let curlvl = xp[message.author.id].level;
        let nxtLvl = xp[message.author.id].level * 300;
        xp[message.author.id].xp =  curxp + xpAdd;
        if(nxtLvl <= xp[message.author.id].xp){
            xp[message.author.id].level = curlvl + 1;
            let lvlup = new Discord.RichEmbed()
            .setTitle("Level Up!")
            .setColor(purple)
            .addField("New Level", curlvl + 1);

            message.channel.send(lvlup).then(msg => {msg.delete(5000)});
        }

        fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
            if(err) console.log(err)
        });
    let prefix = botconfig.prefix;
    if(!message.content.startsWith(prefix)) return;
    if(cooldown.has(message.author.id)){
        message.delete();
        return message.reply("You have to wait 5 seconds between commands pal")
    }
    if(!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")){
        cooldown.add(message.author.id);
    }

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, cdseconds * 1000)

});

client.login(process.env.BOT_TOKEN);
