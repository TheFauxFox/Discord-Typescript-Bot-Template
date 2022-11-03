import { ICommand } from '../interfaces/ICommand';
import { ApplicationCommandType, Client } from 'discord.js';
import { readdir } from 'fs/promises';

class CommandFactory {
    commands: ICommand[];

    constructor() {
        this.commands = [];
    }

    async register(client: Client) {
        client.guilds.cache.forEach(async (guild) => {
            await guild.commands.set([]);
            await client.application?.commands.set([]);
            const cmdFiles = await readdir(`${__dirname}/../commands/`);
            for (let i = 0; i < cmdFiles.length; i++) {
                const file = cmdFiles[i];
                if (file.endsWith('.ts')) {
                    const cmd: { default: ICommand } = await import(
                        `${__dirname}/../commands/${file}`
                    );
                    cmd.default.type = ApplicationCommandType.ChatInput;
                    cmd.default.dmPermission = false;
                    this.commands.push(cmd.default);
                }
            }
            await guild.commands.set(this.commands);
        });
    }

    find(name: string) {
        return this.commands.find((c) => c.name === name);
    }
}

export const Commands = new CommandFactory();
