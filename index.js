const { Client, Collection } = require('discord.js');
const { prefix, intents } = require('./config.json');
const fs = require('fs');
const Redis = require('ioredis');
require('dotenv').config();

const client = new Client({ intents });
client.commands = new Collection();
const redis = new Redis({
    host: process.env.host,
    port: parseInt(process.env.port),
    db: parseInt(process.env.db),
    password: process.env.password
});

globalThis.reload = async () => {
    const cmdDir = fs.readdirSync('./commands').filter((a) => a.endsWith('.js'));
    for (let i = 0; i < cmdDir.length; i += 1) {
        const cmd = require(`./commands/${cmdDir[i]}`);
        delete require.cache[require.resolve(`./commands/${cmdDir[i]}`)];
        if (typeof cmd?.name !== 'string') continue;
        if (typeof cmd?.description !== 'string') continue;
        if (typeof cmd?.execute !== 'function') continue;
        client.commands.set(cmd.name, cmd);
    }
};
globalThis.reload();

redis.on('ready', async () => {
    globalThis.redis = {};
    globalThis.redis.sync = true;
    const data = await redis.get('swagchan');
    let a;
    try {
        a = JSON.parse(data);
    } catch (err) {
        console.error(err);
        a = {};
    };
    globalThis.redis.sync = false;
    globalThis.redis.data = a;
    setInterval(async () => {
        await redis.set('swagchan', JSON.stringify(globalThis.redis.data));
    }, 300);
});

client.once('ready', async () => {
    process.stderr.write('Bot is online\n');
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    /* te gmi to zabezpieczenie jak coś */
    const args = message.content.slice(prefix.length).trim().split(/ +/gmi);
    const cmd = client.commands.get(args[0]);
    ['_bank', '_cash'].forEach((c) => {
        if (typeof globalThis.redis.data[`${message.author.id}${c}`] !== 'number') {
            globalThis.redis.data[`${message.author.id}${c}`] = 0;
        };
    });
    try {
        await cmd.execute(message, args.slice(1));
    } catch (err) {
        process.stderr.write(require('util').format(err)+'\n');
        return message.reply(`Wystąpił błąd: ${err}`);
    }
});

client.login(process.env.token);
