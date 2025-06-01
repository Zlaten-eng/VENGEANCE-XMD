const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');
const yts = require("yt-search");
const {
  generateWAMessageFromContent,
  generateWAMessageContent,
} = require("@whiskeysockets/baileys");
const config = require("../config");
const commandPrefix = config.PREFIX;

cmd({
    pattern: "menu4",
    react: "✅",
    desc: "Check bot owner.",
    category: "menu",
    filename: __filename
}, async (conn, mek, m, { from, prefix, pushname, q, reply }) => {
    try {

        let teksnya = `*🎡𝑩𝑬𝑵_𝑩𝑶𝑻🎡*

𝗛𝗲𝗹𝗹𝗼 ${pushname}👋🏻

╭━⊱⛲𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢 𝗠𝗘𝗡𝗨⛲⊱━╮
┃🤖 *.ᴀɪᴍᴇɴᴜ*
┃📥 *.ᴅᴏᴡɴʟᴏᴀᴅᴍᴇɴᴜ*
┃🧬 *.ɢʀᴏᴜᴘᴍᴇɴᴜ*
┃🧰 *.ᴛᴏᴏʟsᴍᴇɴᴜ*
┃🔄 *.ᴄᴏɴᴠᴇʀᴛᴍᴇɴᴜ*
┃🔍 *.ꜱᴇᴀʀᴄʜᴍᴇɴᴜ*
┃🕌 *.ǫᴜʀᴀɴᴇᴍɴᴜ*
┃📚 *.sᴛᴜᴅʏᴍᴇɴᴜ*
┃🕵️‍♂️ *.sᴛᴀʟkᴍᴇɴᴜ*
┃👾 *.ʙᴜɢᴍᴇɴᴜ*
┃🎮 *.ɢᴀᴍᴇꜱᴍᴇɴᴜ*
┃💰 *.ᴄʀʏᴘᴛᴏᴍᴇɴᴜ*
┃🎉 *.ғᴜɴᴍᴇɴᴜ*
┃🔞 *.ɴsғᴡᴍᴇɴᴜ*
┃🪄 *.ᴘʜᴏᴛᴏᴏxʏᴍᴇɴᴜ*
┃🖼️ *.ᴇᴘʜᴏᴛᴏᴍᴇɴᴜ*
┃🎥 *.ᴀɴɪᴍᴇᴍᴇɴᴜ*
┃🛡️ *.ᴏᴡɴᴇʀᴍᴇɴᴜ*
┃⚙️ *.sʏsᴛᴇᴍᴍᴇɴᴜ*
┃📜 *.ᴀʟʟᴍᴇɴᴜ*
╰━━━━━━━━━━━━━━━━━━━━╯`;

    let fatter = `> 🎗️ʜᴇʀᴇ ɪs ʏᴏᴜʀ ᴍᴇɴᴜ🎗️`;
    const buttonMenu = {
      title: "🔑 Select menu type",
      rows: [
        { title: "DOWNLOAD MENU", description: "Download commands", id: `.dlmenu` },
        { title: "SEARCH MENU", description: "Search commands", id: `${commandPrefix}searchmenu` },
        { title: "CONVERT MENU", description: "Convert commands", id: `${commandPrefix}convertmenu` },
        { title: "MAIN MENU", description: "Convert commands", id: `${commandPrefix}mainmenu` },
        { title: "GROUP MENU", description: "Group commands", id: `${commandPrefix}groupmenu` },
        { title: "LOGO MENU", description: "Logo commands", id: `${commandPrefix}logomenu` },
        { title: "BUG MENU", description: "Bug commands", id: `${commandPrefix}bugmenu` },
        { title: "MOVIE MENU", description: "Movie commands", id: `${commandPrefix}moviemenu` },
        { title: "TOOLS MENU", description: "Tools commands", id: `${commandPrefix}toolsmenu` }
      ]
    };

    const buttonOptions = {
      title: "Click Here⎙",
      sections: [buttonMenu]
    };

    const buttonImage = { url: config.MENU_IMAGE_URL };
    const aliveButton = { displayText: "ALIVE" };
    const pingButton = { displayText: "PING" };

    const buttons = [
      { buttonId: `${commandPrefix}alive`, buttonText: aliveButton },
      { buttonId: `${commandPrefix}ping`, buttonText: pingButton },
      {
        buttonId: "action",
        buttonText: { displayText: "ini pesan interactiveMeta" },
        type: 4,
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify(buttonOptions)
        }
      }
    ];

      const messageOptions = {
        image: { url: "https://files.catbox.moe/ktqas9.jpg" },
        caption: teksnya,
        footer: fatter,
        buttons: buttons,
        headerType: 1,
        viewOnce: true
      };
      await conn.sendMessage(from, messageOptions, { quoted: mek });
      
      
      
        

    } catch (e) {
        console.error(e);
        await reply("An error occurred. Please try again.");
    }
});


cmd({
  'pattern': "menu3",
  'alias': [],
  'react': '📜',
  'desc': "Display the main menu",
  'category': "menu",
  'filename': __filename,
}, async (_0x2d5080, _0x1a71cf, _0x56f5c6, {
  from: _0x289080,
  quoted: _0x3ef4cf,
  body: _0x1b04e4,
  isCmd: _0x1eed9f,
  command: _0x14aa3d,
  args: _0x104c1c,
  q: _0x4905ab,
  isGroup: _0x5313d0,
  sender: _0x4796d0,
  senderNumber: _0x3a68fa,
  pushname: _0x1279c5,
  reply: _0x10d146
}) => {
  try {
    const thumbnailUrl = "https://files.catbox.moe/609one.jpg"; // لینک تصویر منو
    const menuText = `*🎡𝑩𝑬𝑵_𝑩𝑶𝑻🎡*\n\n*Hello ${_0x1279c5 || "User"}* 👋🏻\n\n*> 🎗️ʜᴇʀᴇ ɪs ʏᴏᴜʀ ᴍᴇɴᴜ🎗️*`;

    const imageMessage = await generateWAMessageContent(
      { image: { url: thumbnailUrl } },
      { upload: _0x2d5080.waUploadToServer }
    );

    let card = {
      header: {
        imageMessage: imageMessage.imageMessage,
        hasMediaAttachment: true,
      },
      body: { text: menuText },
      nativeFlowMessage: {
        buttons: [
          { name: "quick_reply", buttonParamsJson: `{"display_text":"All Quran Menu","id": ".quranmenu"}` },
          { name: "quick_reply", buttonParamsJson: `{"display_text":"Owner Menu","id": ".ownermenu"}` },
          { name: "quick_reply", buttonParamsJson: `{"display_text":"Download Menu","id": ".dlmenu"}` },
          { name: "quick_reply", buttonParamsJson: `{"display_text":"Groups Menu","id": ".groupmenu"}` },
          { name: "quick_reply", buttonParamsJson: `{"display_text":"Info Menu","id": ".infomenu"}` },
          { name: "quick_reply", buttonParamsJson: `{"display_text":"Random Menu","id": ".randommenu"}` },
          { name: "quick_reply", buttonParamsJson: `{"display_text":"Convert Menu","id": ".convertmenu"}` },
          { name: "quick_reply", buttonParamsJson: `{"display_text":"Ai-cmd Menu","id": ".aimenu"}` },
          { name: "quick_reply", buttonParamsJson: `{"display_text":"Walppapers Menu","id": ". walppapermenu"}` },
          { name: "quick_reply", buttonParamsJson: `{"display_text":"Other Menu","id": ".othermenu"}` },
        ],
      },
    };

    const messageContent = generateWAMessageFromContent(
      _0x56f5c6.chat,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: { text: "*`( MENU OPTIONS )`*" },
              carouselMessage: {
                cards: [card],
                messageVersion: 0x1,
              },
            },
          },
        },
      },
      {}
    );

    await _0x2d5080.relayMessage(
      _0x56f5c6.chat,
      messageContent.message,
      { messageId: messageContent.key.id }
    );
  } catch (error) {
    console.error(error);
    _0x10d146(`Error: ${error.message}`);
  }
});
