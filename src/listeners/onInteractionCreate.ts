import { Client, Interaction } from 'discord.js';
import { Commands } from '../factory/CommandFactory';

export default (client: Client): void => {
    client.on('interactionCreate', async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            const slashCommand = Commands.find(interaction.commandName);
            if (!slashCommand) {
                interaction.reply({
                    content: 'Command not found',
                });
                return;
            }

            await interaction.deferReply({ ephemeral: slashCommand.ephemeral });

            slashCommand.run(client, interaction);
        }
    });
};
