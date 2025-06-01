const axios = require("axios");
const fs = require("fs");
const os = require("os");
const path = require("path");
const FormData = require("form-data");
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const config = require('../config');
const yts = require("yt-search");
const {
  generateWAMessageFromContent,
  generateWAMessageContent,
} = require("@whiskeysockets/baileys");
const commandPrefix = config.PREFIX;



/*
cmd({
    pattern: "menu",
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
        image: { url: "https://files.catbox.moe/6vrc2s.jpg" },
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
*/

cmd({
    pattern: "menu",
    alias: ["help", "commands"],
    desc: "Show all menu categories",
    category: "menu",
    react: "⏳",
    filename: __filename
},
async (conn, mek, m, { from, pushname: _0x1279c5, reply }) => {
    try {
        const os = require("os");
        const uptime = process.uptime();
        const totalMem = os.totalmem() / (1024 ** 3);
        const freeMem = os.freemem() / (1024 ** 3);
        const usedMem = totalMem - freeMem;

        const version = "𝟐.𝟎.𝟎";
        const plugins = commands.length;
        const now = new Date();
        const time = now.toLocaleTimeString("en-US", { hour12: true, timeZone: "Asia/Kabul" });
        const date = now.toLocaleDateString("en-CA", { timeZone: "Asia/Kabul" });

        const days = Math.floor(uptime / (3600 * 24));
        const hours = Math.floor((uptime % (3600 * 24)) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        const uptimeStr = `${days}𝐝 ${hours}𝐡 ${minutes}𝐦 ${seconds}𝐬`;

        let menuText = `╭══〘〘 *VENGEANCE-XMD* 〙〙═⊷
┃❍ *Mᴏᴅᴇ:* ${config.MODE}
┃❍ *Pʀᴇғɪx:* [ ${commandPrefix} ]
┃❍ *Usᴇʀ:* ${_0x1279c5 || "User"}
┃❍ *Pʟᴜɢɪɴs:* ${plugins}
┃❍ *Vᴇʀsɪᴏɴ:* ${version}
┃❍ *Uᴘᴛɪᴍᴇ:* ${uptimeStr}
┃❍ *Tɪᴍᴇ Nᴏᴡ:* ${time}
┃❍ *Dᴀᴛᴇ Tᴏᴅᴀʏ:* ${date}
┃❍ *Tɪᴍᴇ Zᴏɴᴇ:* Asia/kabul
┃❍ *Sᴇʀᴠᴇʀ Rᴀᴍ:* ${usedMem.toFixed(2)} GB / ${totalMem.toFixed(2)} GB
╰═════════════════⊷\n\n`;

        // حذف دسته‌های menu و nothing
        const filteredCommands = commands.filter(cmd =>
            cmd.category !== "menu" && cmd.category !== "nothing"
        );

        const categories = [...new Set(filteredCommands.map(cmd => cmd.category))];

        for (const category of categories) {
            const cmdsInCat = filteredCommands.filter(cmd => cmd.category === category);
            if (cmdsInCat.length === 0) continue;

            menuText += `╭━━━━❮ *${category.toUpperCase()}* ❯━⊷\n`;
            cmdsInCat.forEach(cmd => {
                menuText += `┃◇ .${cmd.pattern}\n`;
            });
            menuText += `╰━━━━━━━━━━━━━━━━━⊷\n\n`;
        }

        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/vg9llc.jpg` },
            caption: menuText.trim()
        }, { quoted: mek });

        await conn.sendMessage(from, {
            react: { text: "✅", key: m.key }
        });

    } catch (e) {
        console.error(e);
        reply("Error while generating menu:\n" + e.toString());
    }
});



cmd({
    pattern: "ownermenu",
    desc: "menu the bot",
    category: "menu",
    react: "🔰",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // فیلتر کردن دستورات با category "owner"
        const ownerCommands = commands.filter(cmd => cmd.category === "owner");

        // ساخت منو با دستورات فیلتر شده
        let dec = `╭━━〔 *Owner Menu* 〕━━┈⊷\n`;
        ownerCommands.forEach(cmd => {
            dec += `┃◈┃• ${cmd.pattern}\n`;
        });
        dec += `╰──────────────┈⊷\n> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/vg9llc.jpg` },
                caption: dec,
            },
            { quoted: mek }
        );
        
        await conn.sendMessage(from, {
      react: { text: "✅", key: m.key }
    });
    
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


cmd({
    pattern: "downloadmenu",
    alias: ["dlmenu", "downmenu"],
    desc: "dl menu the bot",
    category: "menu",
    react: "🔰",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // فیلتر کردن دستورات با category "owner"
        const ownerCommands = commands.filter(cmd => cmd.category === "downloader");

        // ساخت منو با دستورات فیلتر شده
        let dec = `╭━━〔 *Downloader Menu* 〕━━┈⊷\n`;
        ownerCommands.forEach(cmd => {
            dec += `┃◈┃• ${cmd.pattern}\n`;
        });
        dec += `╰──────────────┈⊷\n> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/vg9llc.jpg` },
                caption: dec,
            },
            { quoted: mek }
        );
        
        await conn.sendMessage(from, {
      react: { text: "✅", key: m.key }
    });
    
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


cmd({
    pattern: "groupmenu",
    alias: ["grpmenu", "grmenu"],
    desc: "group menu the bot",
    category: "menu",
    react: "🔰",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // فیلتر کردن دستورات با category "owner"
        const ownerCommands = commands.filter(cmd => cmd.category === "group");

        // ساخت منو با دستورات فیلتر شده
        let dec = `╭━━〔 *Group Menu* 〕━━┈⊷\n`;
        ownerCommands.forEach(cmd => {
            dec += `┃◈┃• ${cmd.pattern}\n`;
        });
        dec += `╰──────────────┈⊷\n> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/vg9llc.jpg` },
                caption: dec,
            },
            { quoted: mek }
        );
        
        await conn.sendMessage(from, {
      react: { text: "✅", key: m.key }
    });
    
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


cmd({
    pattern: "systemmenu",
    alias: ["sysmenu", "stmenu"],
    desc: "system menu the bot",
    category: "menu",
    react: "🔰",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // فیلتر کردن دستورات با category "owner"
        const ownerCommands = commands.filter(cmd => cmd.category === "system");

        // ساخت منو با دستورات فیلتر شده
        let dec = `╭━━〔 *System Menu* 〕━━┈⊷\n`;
        ownerCommands.forEach(cmd => {
            dec += `┃◈┃• ${cmd.pattern}\n`;
        });
        dec += `╰──────────────┈⊷\n> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/vg9llc.jpg` },
                caption: dec,
            },
            { quoted: mek }
        );
        
        await conn.sendMessage(from, {
      react: { text: "✅", key: m.key }
    });
    
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});







