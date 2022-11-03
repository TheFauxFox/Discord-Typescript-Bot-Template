import { Client } from 'discord.js';
import { readdir } from 'fs/promises';

class ListenerFactory {
    async register(client: Client) {
        readdir(`${__dirname}/../listeners/`).then((files) => {
            files.forEach((file) => {
                if (file.endsWith('.ts')) {
                    import(`${__dirname}/../listeners/${file}`).then(
                        (listener) => {
                            listener.default(client);
                        }
                    );
                }
            });
        });
    }
}

export const Listeners = new ListenerFactory();
