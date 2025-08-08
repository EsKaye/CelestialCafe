import 'dotenv/config';
import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';
import { scheduleNightlyCouncilReport, sendCouncilReport } from './nightlyReport.js';
import { whisper } from './unityBridge.js';
import { establishHandshake } from './handshake.js';

// Instantiate Discord client with message intents so we can route text to guardians
const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent
] });

// Register slash commands including manual council report trigger
const commands = [
  new SlashCommandBuilder()
    .setName('councilreport')
    .setDescription('Dispatch the council report immediately')
].map(c => c.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

async function registerCommands() {
  await rest.put(
    Routes.applicationGuildCommands(process.env.OWNER_ID!, process.env.GUILD_ID!),
    { body: commands }
  );
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'councilreport') {
    await interaction.reply({ content: 'Summoning council report…', ephemeral: true });
    await sendCouncilReport(client);
  }
});

// Route simple text commands to Unity guardians via the ops bus
client.on('messageCreate', async msg => {
  if (msg.author.bot) return;
  const content = msg.content.toLowerCase();
  if (content.startsWith('!status')) {
    await whisper('Athena', 'status');
  } else if (content.startsWith('!bless')) {
    await whisper('Serafina', 'bless');
  }
});

client.once('ready', () => {
  console.log('Serafina ready');
  scheduleNightlyCouncilReport(client); // still schedule nightly report
  establishHandshake(); // announce presence to sibling repos
});

registerCommands()
  .then(() => client.login(process.env.DISCORD_TOKEN))
  .catch(console.error);
