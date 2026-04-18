
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits,
} = require('discord.js');

const ID_SUPORTE = 'SEU_ID_SUPORTE';
const ID_DONOS = 'SEU_ID_DONOS';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(`Bot ligado como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.guild) return;

  if (message.content === '!jogos') {
    const embed = new EmbedBuilder()
      .setTitle('🎮 Loja de Jogos | Infinity Keys')
      .setDescription(
        '⚠️ **Aviso Importante:**\n' +
          'A Infinity Keys não possui loja física nem catálogo público no momento.\n' +
          'Os jogos não ficam listados e devem ser solicitados diretamente via ticket.\n\n' +
          '━━━━━━━━━━━━━━━━━━━━━━\n\n' +
          '🛒 **Como funciona:**\n' +
          'O cliente deve abrir um ticket e informar o jogo desejado.\n' +
          'A equipe irá verificar a disponibilidade e fornecer a key.\n\n' +
          'Plataforma disponível:\n' +
          '* Steam (única plataforma)\n\n' +
          '━━━━━━━━━━━━━━━━━━━━━━\n\n' +
          '💰 **Valores dos Jogos:**\n' +
          '* Jogos padrão: R$25,00\n' +
          '* Jogos com DLC: R$34,00\n\n' +
          '━━━━━━━━━━━━━━━━━━━━━━\n\n' +
          '🔥 **Promoções e Packs:**\n' +
          '* Pack 5 jogos: R$30,00\n' +
          '* Pack 10 jogos: R$40,00\n' +
          '* Pack 20 jogos: R$50,00\n\n' +
          'Todos os jogos são da escolha do cliente.\n\n' +
          '━━━━━━━━━━━━━━━━━━━━━━\n\n' +
          '🎉 **Eventos:**\n' +
          'Durante eventos especiais os jogos podem receber descontos exclusivos.\n\n' +
          '━━━━━━━━━━━━━━━━━━━━━━\n\n' +
          '📩 **Como comprar:**\n' +
          'Abra um ticket e informe:\n' +
          '* Nome do jogo'
      )
      .setColor(0x00ff00);

    await message.channel.send({ embeds: [embed] });
    return;
  }

  if (message.content === '!painel') {
    const embed = new EmbedBuilder()
      .setTitle('🛒 Suporte | Infinity Keys')
      .setDescription(
        'Central de atendimento! Abra um ticket para ser atendido.\n\n' +
          '💳 **Formas de pagamento:**\n' +
          '• PIX (único método disponível)\n\n' +
          '━━━━━━━━━━━━━━━━━━━━━━\n\n' +
          '📅 **Horários de atendimento:**\n' +
          'De Segunda a Sexta das 10:00 até as 21:00\n' +
          'Sábado das 10:00 até as 13:00\n\n' +
          '━━━━━━━━━━━━━━━━━━━━━━\n\n' +
          '⚠️ **Aviso:**\n' +
          'Todos os tickets são resetados no fim do dia.\n' +
          'Se seu ticket tiver sido fechado, verifique a transcrição antes de abrir outro.\n\n' +
          '━━━━━━━━━━━━━━━━━━━━━━\n\n' +
          '📩 **Para iniciar:**\n' +
          'Selecione uma opção abaixo para abrir seu ticket.'
      )
      .setColor(0x0099ff);

    const menu = new StringSelectMenuBuilder()
      .setCustomId('ticket_select')
      .setPlaceholder('Escolha a categoria do seu ticket')
      .addOptions([
        {
          label: 'Suporte',
          description: 'Abrir ticket de suporte',
          value: 'Suporte',
        },
        {
          label: 'Dúvidas',
          description: 'Abrir ticket de dúvidas',
          value: 'Dúvidas',
        },
        {
          label: 'Compras',
          description: 'Abrir ticket sobre compras',
          value: 'Compras',
        },
        {
          label: 'Parcerias',
          description: 'Abrir ticket sobre parcerias',
          value: 'Parcerias',
        },
      ]);

    const row = new ActionRowBuilder().addComponents(menu);

    await message.channel.send({ embeds: [embed], components: [row] });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isStringSelectMenu() && interaction.customId === 'ticket_select') {
    if (!interaction.guild) return;

    await interaction.deferReply({ ephemeral: true });

    const category = interaction.values[0];
    const ticketName = `ticket-${interaction.user.username
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')}`;

    const existingChannel = interaction.guild.channels.cache.find(
      (channel) => channel.name === ticketName && channel.type === ChannelType.GuildText
    );

    if (existingChannel) {
      return interaction.editReply({
        content: `Você já possui um ticket aberto: <#${existingChannel.id}>`,
      });
    }

    const everyoneRole = interaction.guild.roles.everyone;

    const overwrites = [
      {
        id: everyoneRole.id,
        deny: [PermissionFlagsBits.ViewChannel],
      },
      {
        id: interaction.user.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ReadMessageHistory,
        ],
      },
    ];

    if (ID_SUPORTE) {
      overwrites.push({
        id: ID_SUPORTE,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ReadMessageHistory,
        ],
      });
    }

    if (ID_DONOS) {
      overwrites.push({
        id: ID_DONOS,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ReadMessageHistory,
        ],
      });
    }

    const ticketChannel = await interaction.guild.channels.create({
      name: ticketName,
      type: ChannelType.GuildText,
      permissionOverwrites: overwrites,
      topic: `Ticket de ${interaction.user.id} - Categoria: ${category}`,
      reason: `Ticket aberto por ${interaction.user.tag} via painel de suporte`,
    });

    const ticketEmbed = new EmbedBuilder()
      .setTitle('Ticket criado')
      .setDescription(
        `Olá ${interaction.user}, este canal foi criado para sua solicitação de **${category}**. ` +
          'Aguarde a equipe de suporte responder aqui.'
      )
      .setColor(0x00ff99)
      .setTimestamp();

    const closeButton = new ButtonBuilder()
      .setCustomId('close_ticket')
      .setLabel('❌ Fechar Ticket')
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder().addComponents(closeButton);

    await ticketChannel.send({ embeds: [ticketEmbed], components: [row] });

    await interaction.editReply({
      content: `Seu ticket foi criado: <#${ticketChannel.id}>`,
    });
  }

  if (interaction.isButton() && interaction.customId === 'close_ticket') {
    if (!interaction.guild || !interaction.channel) return;

    await interaction.deferReply({ ephemeral: true });

    await interaction.editReply({
      content: 'Fechando ticket...',
    });

    setTimeout(async () => {
      try {
        await interaction.channel.delete('Ticket fechado pelo usuário');
      } catch (error) {
        console.error('Erro ao deletar canal:', error);
      }
    }, 3000);
  }
});

client.on('messageCreate', (message) => {
   if (message.author.bot || !message.guild) return;

   console.log("Mensagem recebida:", message.content);

   if (message.content === '!termos') {
     message.reply('FUNCIONOU');
     return;
   }

   if (message.content === '!jogos') {
   }
});

client.login(process.env.TOKEN);
