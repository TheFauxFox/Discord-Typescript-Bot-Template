import { Client } from 'discord.js';
import { Commands } from '../factory/CommandFactory';

export default (client: Client): void => {
    client.on('ready', async () => {
        if (!client.user || !client.application) {
            return;
        }

        await Commands.register(client);

        console.log(`${client.user.username} is online`);
    });
};
