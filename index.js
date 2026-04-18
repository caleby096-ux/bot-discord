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

const ID_SUPORTE = '1494504276184142025';
const ID_DONOS = '1494502326759854161';

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
          '* Jogos padrão: R$20,00\n' +
          '* Jogos com DLC: R$30,00\n\n' +
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

  if (message.content === '!termos') {
    const embed = new EmbedBuilder()
      .setTitle('📜 Termos de Compra | Infinity Keys')
      .setDescription(
        '📌 **Introdução da loja**\n' +
          'Bem-vindo à **Infinity Keys**, sua loja de confiança para compras digitais com foco em segurança, rapidez e praticidade.\n' +
          'Abaixo estão os termos que regem todas as transações realizadas.\n\n' +
          '━━━━━━━━━━━━━━━━━━━━━━\n\n' +
          '🎮 **Sobre a Infinity Keys**\n' +
          'A Infinity Keys é uma loja digital especializada na venda de jogos para PC (Steam), oferecendo entrega rápida e suporte ao cliente.\n\n' +
          'Trabalhamos com envio automatizado e atendimento via ticket para garantir a melhor experiência.\n\n' +
          '━━━━━━━━━━━━━━━━━━━━━━\n\n' +
          '🛒 **Como funciona a compra**\n\n' +
          '1. Abra um ticket e informe o jogo desejado\n' +
          '2. Realize o pagamento via PIX\n' +
          '3. Aguarde a confirmação\n' +
          '4. Receba sua key com instruções de ativação\n\n' +
          '━━━━━━━━━━━━━━━━━━━━━━\n\n' +
          '🔐 **Ativação e Segurança**\n' +
          '• Todas as keys são enviadas com instruções claras\n' +
          '• Recomendamos seguir corretamente o passo a passo\n' +
          '• Não compartilhe seus dados com terceiros\n' +
          '• Em caso de problema, será necessário comprovação (como gravação do processo)\n\n' +
          '━━━━━━━━━━━━━━━━━━━━━━\n\n' +
          '📌 **Disposições Gerais**\n' +
          '• Todos os produtos são digitais (não há entrega física)\n' +
          '• Após a entrega, não garantimos reembolso, salvo exceções analisadas pela equipe\n' +
          '• Ao comprar, você concorda com todos os termos da Infinity Keys\n\n' +
          '━━━━━━━━━━━━━━━━━━━━━━\n\n' +
          '📩 **Suporte**\n' +
          'Em caso de dúvidas ou problemas, abra um ticket e nossa equipe irá te ajudar.'
      )
      .setColor(0x8a2be2);

    await message.channel.send({ embeds: [embed] });
    return;
  }

  if (message.content === '!denuvo') {
    const embed = new EmbedBuilder()
      .setTitle('🔓 Remoção de Denuvo | Infinity Keys')
      .setDescription(
        '# Remoção do DENUVO automática / manualmente 24h\n\n' +
          '**Jogos disponíveis:**\n\n' +
          '*Resident Evil Requiem*\n' +
          '*Crimson Desert*\n' +
          '*Stellar Blade*\n' +
          '*Street Fighters 6*\n' +
          '*Digimon Story Time Stranger*\n' +
          '*Code Vein 2*\n' +
          '*Hogwarts Legacy*\n' +
          '*Mortal Kombat 1*\n' +
          '*Borderlands 4*\n' +
          '*F1 25*\n' +
          '*NBA 2K26*\n' +
          '*The First Berzerker Khazan*\n' +
          '*DRAGON BALL FighterZ*\n\n' +
          'Esses jogos acima podem já ir sem Denuvo normalmente, caso apareça o Denuvo, conseguimos resolver a qualquer momento, basta nos chamar. Jogos que não estão nessa lista, só conseguimos remover o Denuvo em um horário específico, das 21:30 até as 12:30 do outro dia.'
      )
      .setColor(0xff4500);

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
          'O ticket só será fechado caso o cliente tenha efetuado a compra e recebido a key, ou o cliente tenha criado o ticket e não efetuado o pagamento mas se manter ausente.\n\n' +
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

    try {
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
    } catch (error) {
      console.error('Erro ao criar ticket:', error);
      await interaction.editReply({
        content: 'Erro ao criar ticket. Verifique as permissões do bot.',
      });
    }
  }

  if (interaction.isButton() && interaction.customId === 'close_ticket') {
    if (!interaction.guild || !interaction.channel) return;

    // Verificar se o usuário tem permissão (Suporte ou Dono)
    const hasPermission = interaction.member.roles.cache.has(ID_SUPORTE) || interaction.member.roles.cache.has(ID_DONOS);

    if (!hasPermission) {
      await interaction.deferReply({ ephemeral: true });
      return interaction.editReply({
        content: '❌ Você não tem permissão para fechar este ticket.',
      });
    }

    await interaction.deferReply({ ephemeral: true });

    await interaction.editReply({
      content: 'Fechando ticket...',
    });

    setTimeout(async () => {
      try {
        await interaction.channel.delete('Ticket fechado pela equipe');
      } catch (error) {
        console.error('Erro ao deletar canal:', error);
      }
    }, 3000);
  }
});

client.login(process.env.TOKEN);
