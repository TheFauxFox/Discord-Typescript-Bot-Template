import { Client, IntentsBitField, Partials } from 'discord.js';
import { config } from 'dotenv';
import { Listeners } from './factory/ListenerFactory';

config();

console.log('Bot is starting...');

const client = new Client({
    intents: [
        // IntentsBitField.Flags.GuildMembers,
        // IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildBans,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildWebhooks,
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.User,
    ],
});

Listeners.register(client);

client.login(process.env.DISCORDTOKEN);
