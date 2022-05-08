module.exports = {
    "name": "with",
    "description": "Wyciągnij pieniądze z banku",
    async execute(message, args) {
        const bankcurr = globalThis.redis.data[`${message.author.id}_bank`];
        if (bankcurr === 0 || typeof bankcurr !== 'number') return message.reply({
            embeds: [
                {
                    title: 'Błąd',
                    description: 'Emm... Developer zepsuł databazę, albo zepsuł automatyczne dodawanie do Twojego profilu wartości banku, alboo po prostu nie masz pieniędzy.'
                }
            ]
        });
        let a;
        const b = parseInt(args[0]);
        if (args[0] === 'all' || args[0] === 'max') {
            a = bankcurr
        } else if (!isNaN(b) && typeof b === 'number') {
            a = b;
        } else {
            return message.reply({
                embeds: [
                    {
                        title: 'Błąd',
                        description: 'Jakby, nie wiem ile mam Ci wypłacić'
                    }
                ]
            });
        };
        if (Math.abs(bankcurr) !== bankcurr) return message.reply('N i e .');
        const _b = globalThis.redis.data[`${message.author.id}_cash`] += bankcurr;
        const _a = globalThis.redis.data[`${message.author.id}_bank`] -= bankcurr;
        return message.reply({
            embeds: [
                {
                    title: 'OK',
                    description: `Wypłacono ${_b} z banku pomyślnie.`
                }
            ]
        });
    }
};
