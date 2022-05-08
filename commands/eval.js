const { dev } = require('../config.json');
module.exports = {
    "name": "eval",
    "description": `Cóż, uruchamianie kodu na node.js ${process.version}`,
    async execute(message, args) {
        if (message.author.id !== dev) return;
        const code = args.join(' ');
        let out;
        let errored;
        try {
            out = eval(code);
            errored = false;
        } catch (err) {
            out = err;
            errored = true;
        };
        return message.reply({ embeds: [{
            title: 'EvAL',
            description: errored ? `${out}` : require('util').format(out)
        }]});
    }
};
