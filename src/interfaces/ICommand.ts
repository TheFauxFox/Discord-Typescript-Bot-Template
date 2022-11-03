import {
    ApplicationCommandOptionData,
    PermissionResolvable,
    CommandInteraction,
    ChatInputApplicationCommandData,
    Client,
} from 'discord.js';

export interface ICommand extends ChatInputApplicationCommandData {
    name: string;
    description: string;
    options?: ApplicationCommandOptionData[];
    permissions?: PermissionResolvable[];
    run: (client: Client, interaction: CommandInteraction) => void;
}
