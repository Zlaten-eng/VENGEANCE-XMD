const fs = require("fs");
const config = require("../config");
const { cmd, commands } = require("../command");
const path = require('path');
const axios = require("axios");


// 💡 اینو بالا فایل بذار
function getNewsletterContext(senderJid) {
    return {
        mentionedJid: [senderJid],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363400583993139@newsletter',
            newsletterName: "HACKLINK TECH",
            serverMessageId: 143
        }
    };
}

// 📦 دستور cmd به‌روز شده
cmd({
    pattern: "privacy",
    alias: ["privacymenu"],
    desc: "Privacy settings menu",
    category: "privacy",
    react: "🔐",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let privacyMenu = `╭━━〔 *Privacy Settings* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• blocklist - View blocked users
┃◈┃• getbio - Get user's bio
┃◈┃• setppall - Set profile pic privacy
┃◈┃• setonline - Set online privacy
┃◈┃• setpp - Change bot's profile pic
┃◈┃• setmyname - Change bot's name
┃◈┃• updatebio - Change bot's bio
┃◈┃• groupsprivacy - Set group add privacy
┃◈┃• getprivacy - View current privacy settings
┃◈┃• getpp - Get user's profile picture
┃◈┃
┃◈┃*Options for privacy commands:*
┃◈┃• all - Everyone
┃◈┃• contacts - My contacts only
┃◈┃• contact_blacklist - Contacts except blocked
┃◈┃• none - Nobody
┃◈┃• match_last_seen - Match last seen
┃◈└───────────┈⊷
╰──────────────┈⊷
*Note:* Most commands are owner-only`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/4etjoq.jpg` },
                caption: privacyMenu,
                contextInfo: getNewsletterContext(m.sender)
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});


cmd({
    pattern: "blocklist",
    desc: "View the list of blocked users.",
    category: "privacy",
    react: "📋",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 You are not the owner!*");

    try {
        const blockedUsers = await conn.fetchBlocklist();

        let msgText = '';
        if (blockedUsers.length === 0) {
            msgText = "📋 Your block list is empty.";
        } else {
            const list = blockedUsers
                .map((user, i) => `🚧 BLOCKED ${user.split('@')[0]}`)
                .join('\n');
            const count = blockedUsers.length;
            msgText = `📋 Blocked Users (${count}):\n\n${list}`;
        }

        await conn.sendMessage(
            from,
            {
                text: msgText,
                contextInfo: getNewsletterContext(m.sender)
            },
            { quoted: mek }
        );
    } catch (err) {
        console.error(err);
        reply(`❌ Failed to fetch block list: ${err.message}`);
    }
});

cmd({
    pattern: "getbio",
    desc: "Displays the user's bio.",
    category: "privacy",
    filename: __filename,
}, async (conn, mek, m, { quoted, reply }) => {
    try {
        let jid;

        if (quoted) {
            jid = quoted.sender;
        } else {
            return reply("⛔ Please reply to someone's message to fetch their bio.");
        }

        const about = await conn.fetchStatus?.(jid);

        if (!about || !about.status) {
            return await conn.sendMessage(
                m.chat,
                {
                    text: "❌ No bio found.",
                    contextInfo: getNewsletterContext(m.sender)
                },
                { quoted: mek }
            );
        }

        return await conn.sendMessage(
            m.chat,
            {
                text: `📄 Bio:\n\n${about.status}`,
                contextInfo: getNewsletterContext(m.sender)
            },
            { quoted: mek }
        );

    } catch (error) {
        console.error("Error in getbio command:", error);
        await conn.sendMessage(
            m.chat,
            {
                text: "❌ Error fetching bio.",
                contextInfo: getNewsletterContext(m.sender)
            },
            { quoted: mek }
        );
    }
});


cmd({
    pattern: "setppall*",
    desc: "Update Profile Picture Privacy",
    category: "privacy",
    react: "🔐",
    filename: __filename
}, 
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) {
        return await conn.sendMessage(
            from,
            {
                text: "❌ You are not the owner!",
                contextInfo: getNewsletterContext(m.sender)
            },
            { quoted: mek }
        );
    }

    try {
        const value = args[0] || 'all';
        const validValues = ['all', 'contacts', 'contact_blacklist', 'none'];

        if (!validValues.includes(value)) {
            return await conn.sendMessage(
                from,
                {
                    text: "❌ Invalid option.\nValid options: *all*, *contacts*, *contact_blacklist*, *none*.",
                    contextInfo: getNewsletterContext(m.sender)
                },
                { quoted: mek }
            );
        }

        await conn.updateProfilePicturePrivacy(value);
        await conn.sendMessage(
            from,
            {
                text: `✅ Profile picture privacy updated to: *${value}*`,
                contextInfo: getNewsletterContext(m.sender)
            },
            { quoted: mek }
        );
    } catch (e) {
        await conn.sendMessage(
            from,
            {
                text: `❌ An error occurred.\n\n_Error:_ ${e.message}`,
                contextInfo: getNewsletterContext(m.sender)
            },
            { quoted: mek }
        );
    }
});

cmd({
    pattern: "setonline",
    desc: "Update Online Privacy",
    category: "privacy",
    react: "🔐",
    filename: __filename
}, 
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) {
        return await conn.sendMessage(
            from,
            {
                text: "❌ You are not the owner!",
                contextInfo: getNewsletterContext(m.sender)
            },
            { quoted: mek }
        );
    }

    try {
        const value = args[0] || 'all';
        const validValues = ['all', 'match_last_seen'];

        if (!validValues.includes(value)) {
            return await conn.sendMessage(
                from,
                {
                    text: "❌ Invalid option.\nValid options: *all*, *match_last_seen*.",
                    contextInfo: getNewsletterContext(m.sender)
                },
                { quoted: mek }
            );
        }

        await conn.updateOnlinePrivacy(value);
        await conn.sendMessage(
            from,
            {
                text: `✅ Online privacy updated to: *${value}*`,
                contextInfo: getNewsletterContext(m.sender)
            },
            { quoted: mek }
        );
    } catch (e) {
        await conn.sendMessage(
            from,
            {
                text: `❌ An error occurred.\n\n_Error:_ ${e.message}`,
                contextInfo: getNewsletterContext(m.sender)
            },
            { quoted: mek }
        );
    }
});

cmd({
    pattern: "setpp",
    desc: "Set bot profile picture.",
    category: "privacy",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted || !quoted.message.imageMessage) return reply("❌ Please reply to an image.");
    try {
        const stream = await downloadContentFromMessage(quoted.message.imageMessage, 'image');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        const mediaPath = path.join(__dirname, `${Date.now()}.jpg`);
        fs.writeFileSync(mediaPath, buffer);

        // Update profile picture with the saved file
        await conn.updateProfilePicture(conn.user.jid, { url: `file://${mediaPath}` });
        reply("🖼️ Profile picture updated successfully!");
    } catch (error) {
        console.error("Error updating profile picture:", error);
        reply(`❌ Error updating profile picture: ${error.message}`);
    }
});


cmd({
    pattern: "updatebio",
    react: "🥏",
    desc: "Change the Bot number Bio.",
    category: "privacy",
    use: '.updatebio',
    filename: __filename
},
async (conn, mek, m, { from, q, isOwner, reply }) => {
    try {
        if (!isOwner) {
            return await conn.sendMessage(
                from,
                {
                    text: '🚫 *You must be an Owner to use this command*',
                    contextInfo: getNewsletterContext(m.sender)
                },
                { quoted: mek }
            );
        }

        if (!q) {
            return await conn.sendMessage(
                from,
                {
                    text: '❓ *Please provide the new bio text*',
                    contextInfo: getNewsletterContext(m.sender)
                },
                { quoted: mek }
            );
        }

        if (q.length > 139) {
            return await conn.sendMessage(
                from,
                {
                    text: '❗ *Sorry! Character limit exceeded (max 139 characters)*',
                    contextInfo: getNewsletterContext(m.sender)
                },
                { quoted: mek }
            );
        }

        await conn.updateProfileStatus(q);

        await conn.sendMessage(
            from,
            {
                text: "✔️ *New bio set successfully!*",
                contextInfo: getNewsletterContext(m.sender)
            },
            { quoted: mek }
        );
    } catch (e) {
        console.error("UpdateBio Error:", e);
        await conn.sendMessage(
            from,
            {
                text: `🚫 *An error occurred!*\n\n_Error:_ ${e.message}`,
                contextInfo: getNewsletterContext(m.sender)
            },
            { quoted: mek }
        );
    }
});


cmd({
    pattern: "groupsprivacy",
    desc: "Update Group Add Privacy",
    category: "privacy",
    react: "🔐",
    filename: __filename
}, 
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) {
        return await conn.sendMessage(
            from,
            {
                text: "❌ *You are not the owner!*",
                contextInfo: getNewsletterContext(m.sender)
            },
            { quoted: mek }
        );
    }

    try {
        const value = args[0] || 'all';
        const validValues = ['all', 'contacts', 'contact_blacklist', 'none'];

        if (!validValues.includes(value)) {
            return await conn.sendMessage(
                from,
                {
                    text: "❌ *Invalid option.*\nValid options: `all`, `contacts`, `contact_blacklist`, `none`",
                    contextInfo: getNewsletterContext(m.sender)
                },
                { quoted: mek }
            );
        }

        await conn.updateGroupsAddPrivacy(value);

        await conn.sendMessage(
            from,
            {
                text: `✅ *Group add privacy updated to:* \`${value}\``,
                contextInfo: getNewsletterContext(m.sender)
            },
            { quoted: mek }
        );

    } catch (e) {
        await conn.sendMessage(
            from,
            {
                text: `🚫 *An error occurred while processing your request.*\n\n_Error:_ ${e.message}`,
                contextInfo: getNewsletterContext(m.sender)
            },
            { quoted: mek }
        );
    }
});

cmd({
    pattern: "getprivacy",
    desc: "Get the bot Number Privacy Setting Updates.",
    category: "privacy",
    use: '.getprivacy',
    filename: __filename
},
async (conn, mek, m, { from, l, isOwner, reply }) => {
    if (!isOwner) {
        return await conn.sendMessage(
            from,
            {
                text: '🚫 *You must be an Owner to use this command*',
                contextInfo: getNewsletterContext(m.sender)
            },
            { quoted: mek }
        );
    }

    try {
        const duka = await conn.fetchPrivacySettings?.(true);
        if (!duka) {
            return await conn.sendMessage(
                from,
                {
                    text: '🚫 *Failed to fetch privacy settings*',
                    contextInfo: getNewsletterContext(m.sender)
                },
                { quoted: mek }
            );
        }

        let puka = `
╭───「 𝙿𝚁𝙸𝚅𝙰𝙲𝚈 」───◆  
│ ∘ 𝚁𝚎𝚊𝚍 𝚁𝚎𝚌𝚎𝚒𝚙𝚝: ${duka.readreceipts}  
│ ∘ 𝙿𝚛𝚘𝚏𝚒𝚕𝚎 𝙿𝚒𝚌𝚝𝚞𝚛𝚎: ${duka.profile}  
│ ∘ 𝚂𝚝𝚊𝚝𝚞𝚜: ${duka.status}  
│ ∘ 𝙾𝚗𝚕𝚒𝚗𝚎: ${duka.online}  
│ ∘ 𝙻𝚊𝚜𝚝 𝚂𝚎𝚎𝚗: ${duka.last}  
│ ∘ 𝙶𝚛𝚘𝚞𝚙 𝙿𝚛𝚒𝚟𝚊𝚌𝚢: ${duka.groupadd}  
│ ∘ 𝙲𝚊𝚕𝚕 𝙿𝚛𝚒𝚟𝚊𝚌𝚢: ${duka.calladd}  
╰────────────────────`;

        await conn.sendMessage(
            from,
            {
                text: puka,
                contextInfo: getNewsletterContext(m.sender)
            },
            { quoted: mek }
        );

    } catch (e) {
        await conn.sendMessage(
            from,
            {
                text: `🚫 *An error occurred!*\n\n${e}`,
                contextInfo: getNewsletterContext(m.sender)
            },
            { quoted: mek }
        );
        l(e);
    }
});

cmd({
    pattern: "getpp",
    desc: "Fetch the profile picture of a replied or mentioned user.",
    category: "privacy",
    react: "🖼️",
    filename: __filename,
},
async (conn, mek, m, { quoted, mentionedJid, reply }) => {
    try {
        // Check if user is tagged or replied to
        if (!quoted && (!mentionedJid || mentionedJid.length === 0)) {
            return reply("⚠️ Please reply to a user's message or mention a user.");
        }

        // Get target JID
        const targetJid = quoted?.sender || mentionedJid[0];
        const picUrl = await conn.profilePictureUrl(targetJid, 'image').catch(() => null);

        if (!picUrl) {
            return reply("❌ Couldn't fetch profile picture. The user may not have one or privacy settings restrict access.");
        }

        await conn.sendMessage(m.chat, {
            image: { url: picUrl },
            caption: `🖼️ Profile picture of @${targetJid.split('@')[0]}`,
            mentions: [targetJid],
            contextInfo: getNewsletterContext(m.sender)
        }, { quoted: mek });

    } catch (e) {
        console.error("getpp error:", e);
        reply("❌ Error fetching profile picture. Please try again later.");
    }
});
