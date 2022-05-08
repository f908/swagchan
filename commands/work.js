module.exports = {
    "name": "work",
    "description": "Pracuj, leniu!",
    async execute(message, args) {
        if (typeof globalThis.redis.data[`${message.author.id}_work_timeout`] !== 'number') {
            globalThis.redis.data[`${message.author.id}_work_timeout`] = 0;
        };
        if (Date.now()<globalThis.redis.data[`${message.author.id}_work_timeout`]) {
            return message.reply({
                embeds: [
                    {
                        title: 'Coś nie za szybko?',
                        description: `Zostało ci jeszcze ${require('pretty-ms')(globalThis.redis.data[`${message.author.id}_work_timeout`]-Date.now())}, nie za szybko?`
                    }
                ]
            });
        };
        globalThis.redis.data[`${message.author.id}_work_timeout`] = Date.now()+60000;
        return message.reply({
            embeds: [
                {
                    title: 'OK',
                    description: `Super! Zarobiłeś 1000 hajsu. Teraz masz ${globalThis.redis.data[`${message.author.id}_cash`] += 1000} hajsu.`
                }
            ]
        });
    }
};
