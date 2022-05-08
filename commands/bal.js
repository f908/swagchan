module.exports = {
    "name": "bal",
    "description": "Ile masz hajsu?",
    async execute(message) {
        return message.reply({
            embeds: [
                {
                    title: 'Balans',
                    description: `${globalThis.redis.data[`${message.author.id}_cash`]} w ręce\n${globalThis.redis.data[`${message.author.id}_bank`]} w banku`,
                    color: 'ff0000'
                }
            ]
        });
    }
};
