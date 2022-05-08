const secRandom = require('random-number-csprng');

module.exports = {
    "name": "rob",
    "description": "Baw się w złodzieja w legalny sposób na przyjaciela, który ma... lekko za dużo pieniędzy...",
    async execute(message, args) {
        if (message.mentions.users.size === 0 || message.mentions.users.size !== 1) return message.reply({
            embeds: [
                {
                    title: 'Błąd',
                    description: 'Podaj jeden argument (wzmiankę/ping) na użytkownika którego chcesz obrabować.'
                }
            ]
        });
        const currentUser = message.mentions.users.first().id;
        const whatcat = globalThis.redis.data[`${message.author.id}_cash`];
        const whatcat2 = globalThis.redis.data[`${currentUser}_cash`];
        if (typeof whatcat2)
        if (whatcat < 500) return message.reply({
            embeds: [
                {
                    title: 'Błąd',
                    description: 'Masz za mało pieniędzy, potrzebujesz 500 pieniędzy w **PORTFELU**'
                }
            ]
        });
        if (whatcat2 < 500) return message.reply({
            embeds: [
                {
                    title: 'Błąd',
                    description: 'Osoba, którą chciałeś/aś obrabować ma za mało pieniędzy (mniej niż 500)'
                }
            ]
        });
        const rnd = await secRandom(0, 100);
        const user = message.mentions.users.size;
        // 20% szansy, że dasz radę, 80% na missa.
        if (rnd >= 20) {
            const __wtf = await secRandom(1, 50);
            const _wtf = __wtf/100;
            const _a = globalThis.redis.data[`${message.author.id}_cash`] += Math.floor(whatcat2*_wtf);
            globalThis.redis.data[`${currentUser}_cash`] -= Math.floor(whatcat2*_wtf);
            return message.reply({
                embeds: [
                    {
                        title: 'Obrabowałeś/aś tą osobę pomyślnie!',
                        description: `Gratulacje! Teraz masz ${_a} pieniędzy!`
                    }
                ]
            });
        } else {
            const __wtf = await secRandom(1, 50);
            const _wtf = __wtf/100;
            const wtf = whatcat*_wtf;
            globalThis.redis.data[`${currentUser}_cash`] += Math.floor(wtf);
            globalThis.redis.data[`${message.author.id}_cash`] -= Math.floor(wtf);
            return message.reply({
                embeds: [
                    {
                        title: 'O nie!',
                        description: 'Gratulacje! Straciłeś/aś hajsiwo. Co ty robisz ze swoim życiem?'
                    }
                ]
            });
        }
    }
};
