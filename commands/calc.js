const minimist = require('minimist');

module.exports = {
    "name": "calc",
    "description": "2+2=4, hmm? Używasz tego tak samo jak komend na linii poleceń linuxa",
    async execute(message, args) {
        const argv = minimist(args);
        const help = argv.h || argv.help || true;
        const m = argv.m || argv.method || '';
        const first = argv.f || argv.first || null;
        const second = argv.s || argv.second || null;
        let docat = true;
        if (typeof m !== 'string') {
            docat = false;
        };
        if (typeof first !== 'number') {
            docat = false;
        };
        if (typeof second !== 'number') {
            docat = false;
        };
        switch (m.toLowerCase()) {
            case 'dodaj':
            case 'dodawanie':
                return message.reply({
                    embeds: [
                        {
                            title: 'Dodawanie',
                            description: `${first}+${second}=${first+second}`
                        }
                    ]
                });
                break;
            case 'odejmij':
            case 'odejmowanie':
                return message.reply({
                    embeds: [
                        {
                            title: 'Odejmowanie',
                            description: `${first}-${second}=${first-second}`
                        }
                    ]
                });
                break;
            case 'mnóż':
            case 'pomnóż':
            case 'mnożenie':
                return message.reply({
                    embeds: [
                        {
                            title: 'Mnożenie',
                            description: `${first}*${second}=${first*second}`
                        }
                    ]
                });
                break;
            case 'dziel':
            case 'podziel':
            case 'dzielenie':
                return message.reply({
                    embeds: [
                        {
                            title: 'Dzielenie',
                            description: `${first}/${second}=${first/second}`
                        }
                    ]
                });
                break;
            case 'potęguj':
            case 'potęgi':
                return message.reply({
                    embeds: [
                        {
                            title: 'Potęgowanie',
                            description: `${first}^${second}=${Math.pow(first, second)}`
                        }
                    ]
                });
                break;
            default:
                break;
        }
        if (help) {
            return message.reply(`Komenda do obliczeń (super chruper tbh)\n-h --help => pomoc\n-m --method metoda (dodawanie/odejmowanie/mnożenie/dzielenie)\n-f --first => Pierwsza cyfra\n-s --second => Druga cyfra\nSkontaktuj się z contact@caracalmail.pl o ważne rzeczy, m. in. exploity bądź bugi. Proszę zachowaj bycie formalnym podczas pisania.`);
        };
    }
};
