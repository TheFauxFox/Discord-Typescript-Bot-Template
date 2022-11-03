import { CommandInteraction, Client } from 'discord.js';
import { ICommand } from '../interfaces/ICommand';

export default {
    name: 'ping',
    description: 'Pong!',
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = `Pong!\nTook: ${
            Date.now() - interaction.createdTimestamp
        }ms`;

        await interaction.followUp({
            ephemeral: true,
            content,
        });
    },
} as ICommand;
