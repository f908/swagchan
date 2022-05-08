const minimist = require('minimist');

module.exports = {
    "name": "help",
    "description": "Cóż...",
    async execute(message, args) {
        const argv = minimist(args);
        const currentCmd = argv.c || argv.k || argv.command || argv.komenda || null;
        if (currentCmd) {
            const cemd = message.client.commands.get(currentCmd);
            if (!cemd) {
                return message.reply({
                    embeds: [
                        {
                            title: currentCmd,
                            description: 'Komenda nie znaleziona'
                        }
                    ]
                });
            };
            return message.reply({
                embeds: [
                    {
                        title: `${cemd.name}`,
                        description: `${cemd.description}`
                    }
                ]
            });
        };
        let cmds = ``;
        message.client.commands.forEach((cmd) => {
            cmds = `${cmds}\n${cmd.name} - ${cmd.description}`
        });
        return message.reply({ 
            embeds: [
                {
                    title: 'Komenda help...',
                    description: cmds,
                    thumbnail: {
                        url: 'https://cdn.discordapp.com/emojis/840125043764625418.png?size=4096'
                    },
                    url: 'https://gitea.caracalmail.pl/swagcat/swagchan',
                    image: {
                        url: 'https://cdn.discordapp.com/emojis/840125043764625418.png?size=4096'
                    },
                    footer: {
                        text: 'Okej!',
                        icon_url: 'https://cdn.discordapp.com/emojis/840125043764625418.png?size=4096'
                    }
                }
            ]
         });
    }
};
