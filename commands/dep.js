module.exports = {
    "name": "dep",
    "description": "do banku",
    async execute(message, args) {
        const curr = globalThis.redis.data[`${message.author.id}_cash`];
        if (curr === 0 || typeof curr !== 'number') return message.reply({
            embeds: [
                {
                    title: 'Błąd',
                    description: 'Nie ma szans...'
                }
            ]
        });
        let z;
        const x = parseInt(args[0]);
        if (typeof x === 'number' && !isNaN(x)) {
            z = x;
        } else if (args[0] === 'max' || args[0] === 'all') {
            z = curr;
        } else {
            return message.reply({
                embeds: [
                    {
                        title: 'Błąd',
                        description: 'No, ile mam ci wsadzić do banku?'
                    }
                ]
            });
        };
        if (Math.abs(z) !== z) return message.reply({
            embeds: [
                {
                    title: 'Błąd',
                    description: 'Co.. Próbujesz.. Zrobić??'
                }
            ]
        });
        if (globalThis.redis.data[`${message.author.id}_cash`] - z < 0) z = curr;
        const _a = globalThis.redis.data[`${message.author.id}_bank`] += z;
        const _b = globalThis.redis.data[`${message.author.id}_cash`] -= z;
        globalThis.redis.sync = true;
        return message.reply({
            embeds: [
                {
                    title: 'OK',
                    description: `${_a} hajsu poleciało do banku.`
                }
            ]
        });
    }
};
