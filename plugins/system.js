const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const config = require('../config');
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const os = require("os");
const FormData = require("form-data");
const fetch = require('node-fetch');
const AdmZip = require('adm-zip'); // استفاده از adm-zip
const { exec } = require('child_process');


cmd({
    pattern: "getsession",
    use: '.getsession',
    desc: "Check bot's response time.",
    category: "system",
    react: "⚡",
    filename: __filename
}, async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const start = new Date().getTime();

        const reactionEmojis = ['🔥', '⚡', '🚀', '💨', '🎯', '🎉', '🌟', '💥', '🕐', '🔹'];
        const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '🌀', '🔱', '🛡️', '✨'];

        const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

        // Ensure reaction and text emojis are different
        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        // Send reaction using conn.sendMessage()
        await conn.sendMessage(from, {
            react: { text: textEmoji, key: mek.key }
        });

        const end = new Date().getTime();
        const responseTime = (end - start) / 1000;
        const uptime = runtime(process.uptime());
        const startTime = new Date(Date.now() - process.uptime() * 1000);
        
        const text = `${config.SESSION_ID}\n\n\n> Response Time: ${responseTime} seconds\n> Uptime: ${uptime}`;

        // ارسال تصویر همراه با متن
        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/6vrc2s.jpg" },  // آدرس تصویر دلخواه خود را وارد کنید
            caption: text
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});


cmd({
    pattern: "bot",
    use: '.bot',
    desc: "Check bot's response time.",
    category: "system",
    react: "⚡",
    filename: __filename
}, async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const start = new Date().getTime();

        const reactionEmojis = ['🔥', '⚡', '🚀', '💨', '🎯', '🎉', '🌟', '💥', '🕐', '🔹'];
        const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '🌀', '🔱', '🛡️', '✨'];

        const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

        // Ensure reaction and text emojis are different
        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        // Send reaction using conn.sendMessage()
        await conn.sendMessage(from, {
            react: { text: textEmoji, key: mek.key }
        });

        const end = new Date().getTime();
        const responseTime = (end - start) / 1000;
        const uptime = runtime(process.uptime());
        const startTime = new Date(Date.now() - process.uptime() * 1000);
        
        const text = `*BEN BOT DEPLOY Available 🌝💗*\n
🚀 *Fast & Secure Bot Deployment!*\n
*Plans:*\n
*2$ Only* — 30 Days Warranty — Heroku\n
*5$ Only* — 60 Days Warranty — Heroku\n
*10$ Only* — 3 Months Warranty — Heroku\n
> *Contact Now:* wa.me/93744215959?text=Hi%2C%20I'm%20interested%20in%20buying%20a%20bot%20deployment%20plan\n
*Payment Methods:*\n
- Binance ✔️\n
- Mobile Top-up ✔️\n
*24/7 Support | Easy Setup | Trusted Service*`;

        // ارسال تصویر همراه با متن
        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/6vrc2s.jpg" },  // آدرس تصویر دلخواه خود را وارد کنید
            caption: text
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in bot  command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});

cmd({
  pattern: "listfile",
  alias: ["ls", "dir"],
  desc: "List files in a directory",
  category: "system",
  react: "📂",
  filename: __filename
}, async (client, message, args, { reply }) => {
  try {
    let targetPath = './'; // مسیر پیش‌فرض به پوشه جاری

    // اگر آرگومان وجود داشته باشد
    if (args.length >= 1) {
      // مسیر دقیق دایرکتوری را مشخص می‌کنیم
      targetPath = path.join('./', args[0]);
    }

    // چک می‌کنیم که دایرکتوری مورد نظر وجود دارد
    if (!fs.existsSync(targetPath)) {
      return reply(`⚠️ The directory "${targetPath}" does not exist.`);
    }

    // محاسبه اندازه دایرکتوری
    const getDirectorySize = (dirPath) => {
      let totalSize = 0;
      const files = fs.readdirSync(dirPath);

      files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
          totalSize += getDirectorySize(filePath); // در صورتی که پوشه باشد، اندازه‌اش را به کل اضافه می‌کنیم
        } else {
          totalSize += stats.size; // اگر فایل باشد، اندازه‌اش را به کل اضافه می‌کنیم
        }
      });

      return totalSize;
    };

    const totalSize = getDirectorySize(targetPath);
    const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2); // تبدیل به مگابایت

    // لیست کردن فایل‌ها در دایرکتوری
    const files = fs.readdirSync(targetPath);

    if (files.length === 0) {
      return reply(`📂 No files found in the directory: "${targetPath}"`);
    }

    // آماده کردن لیست فایل‌ها
    const fileList = files.map((file, index) => `${index + 1}. ${file}`).join('\n');

    const status = `
📂 *Files in directory:* ${targetPath}
*╭═════════════════⊷*
${fileList}
*╰═════════════════⊷*

📊 *Total Size:* ${sizeInMB} MB

For get gitfile ${targetPath}
    `;

    // ارسال پیام با لیست فایل‌ها و اندازه دایرکتوری
    await client.sendMessage(message.chat, {
      image: { url: "https://files.catbox.moe/6vrc2s.jpg" },  // تصویر به‌عنوان پیش‌فرض
      caption: status.trim(),
    }, { quoted: message });

  } catch (err) {
    console.error("Listfile Command Error:", err);
    await reply(`❌ Error: ${err.message || err}`);
  }
});

cmd({
  on: "body" // یعنی هر متنی بررسی شود
}, async (conn, mek, m, { from, body }) => {
  if (body !== "PING" || !mek.quoted) return; // فقط وقتی دقیقا "PING" و ریپلای شده

  try {
    const start = Date.now();

    await conn.sendMessage(from, {
      react: { text: "⚡", key: mek.key }
    });

    const end = Date.now();
    const responseTime = end - start;

    await conn.sendMessage(from, {
      text: `> *BEN-BOT SPEED: ${responseTime}ms ⚡*`
    }, { quoted: mek });

  } catch (e) {
    console.error("PING error:", e);
    await conn.sendMessage(from, {
      text: `❌ Error:\n${e.message}`
    }, { quoted: mek });
  }
});


cmd({
    pattern: "ping",
    alias: ["speed","pong"],use: '.ping',
    desc: "Check bot's response time.",
    category: "system",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const start = new Date().getTime();

        const reactionEmojis = ['🔥', '⚡', '🚀', '💨', '🎯', '🎉', '🌟', '💥', '🕐', '🔹'];
        const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '🌀', '🔱', '🛡️', '✨'];

        const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

        // Ensure reaction and text emojis are different
        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        // Send reaction using conn.sendMessage()
        await conn.sendMessage(from, {
            react: { text: textEmoji, key: mek.key }
        });

        const end = new Date().getTime();
        const responseTime = (end - start) / 1000;

        const text = `> *BEN-BOT SPEED: ${responseTime.toFixed(2)}ms ${reactionEmoji}*`;

        await conn.sendMessage(from, {
            text}, { quoted: mek });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});

// ping2 

cmd({
    pattern: "ping2",
    desc: "Check bot's response time.",
    category: "system",
    react: "🍂",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const startTime = Date.now()
        const message = await conn.sendMessage(from, { text: '*PINGING...*' })
        const endTime = Date.now()
        const ping = endTime - startTime
        await conn.sendMessage(from, { text: `*BEN-BOT SPEED : ${ping}ms*` }, { quoted: message })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
});


function formatRemainingTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let days = Math.floor(totalSeconds / (3600 * 24));
  let hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  return `*┃❍ ${days} Day(s)*\n*┃❍ ${hours} Hour(s)*\n*┃❍ ${minutes} Minute(s)*\n*┃❍ ${seconds} Second(s)*`;
}

cmd({
  pattern: "alive",
  alias: ["alive2", "zindaa", "heee"],
  react: "⏳",
  desc: "Show bot alive status and uptime",
  category: "system",
  filename: __filename
}, async (client, message, args, { reply }) => {
  try {
    const start = Date.now();
    const uptimeMs = process.uptime() * 1000;
    const uptimeFormatted = formatRemainingTime(uptimeMs);

    const status = `
*BEN BOT IS RUNNING!!*
*BOT UPTIME INFO:*
*╭═════════════════⊷*
${uptimeFormatted}
*╰═════════════════⊷*
    `;

    await client.sendMessage(message.chat, {
      image: { url: "https://files.catbox.moe/6vrc2s.jpg" },
      caption: status.trim(),
    }, { quoted: message });
        
  } catch (err) {
    console.error("Alive Command Error:", err);
    await reply(`❌ Error: ${err.message || err}`);
  }
});

cmd({
  pattern: "repo",
  alias: ["sc", "source", "script"],
  react: "📁",
  desc: "See GitHub information",
  category: "system",
  filename: __filename
}, async (client, message, args, { reply }) => {
  const githubRepoURL = 'https://github.com/NOTHING-MD420/project-test';

  try {
    const res = await fetch('https://api.github.com/repos/NOTHING-MD420/project-test');
    if (!res.ok) throw new Error(`GitHub API Error: ${res.status}`);
    const repoData = await res.json();

    const style1 = `Hey there👋,
You are chatting with *BEN BOT,* A powerful WhatsApp bot created by *Nothing Tech,*
Packed with smart features to elevate your WhatsApp experience like never before!

*ʀᴇᴘᴏ ʟɪɴᴋ:* ${githubRepoURL}

*❲❒❳ ɴᴀᴍᴇ:* ${repoData.name || "BEN-BOT"}
*❲❒❳ sᴛᴀʀs:* ${repoData.stargazers_count}
*❲❒❳ ғᴏʀᴋs:* ${repoData.forks_count}
*❲❒❳ ᴄʀᴇᴀᴛᴇᴅ ᴏɴ:* ${new Date(repoData.created_at).toLocaleDateString()}
*❲❒❳ ʟᴀsᴛ ᴜᴘᴅᴀᴛᴇᴅ:* ${new Date(repoData.updated_at).toLocaleDateString()}
*❲❒❳ ᴏᴡɴᴇʀ:* ${repoData.owner?.login || "Nothing Tech"}`;

    await client.sendMessage(message.chat, {
      image: { url: "https://files.catbox.moe/6vrc2s.jpg" },
      caption: style1
    }, { quoted: message });

  } catch (err) {
    console.error("Repo Error:", err);
    await reply(`❌ Failed to fetch repo info:\n${err.message}`);
  }
});

cmd({
    pattern: "gitfile",
    alias: ["gf", "sourcefile"],
    desc: "Send any file or folder (or all files) from root or subdirectories, zip if folder",
    category: "system",
    react: "📁",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, isOwner }) => {
    try {
        if (!isOwner) return reply("❌ You are not allowed to use this command.");
        
        if (args[0] === 'all') {
            // اگر "all" باشد، همه فایل‌ها و پوشه‌ها را zip می‌کند
            const zip = new AdmZip();
            zip.addLocalFolder(__dirname);  // اضافه کردن همه فایل‌ها و پوشه‌ها در پوشه فعلی

            const zipPath = path.join(__dirname, 'all_files.zip');
            zip.writeZip(zipPath);

            await conn.sendMessage(from, {
                document: fs.readFileSync(zipPath),
                mimetype: 'application/zip',
                fileName: 'all_files.zip'
            }, { quoted: mek });

            fs.unlinkSync(zipPath); // حذف فایل zip پس از ارسال
            return;
        }

        if (!args[0]) return reply("❌ Provide a filename or folder name.\nExample: `.gitfile index.js` or `.gitfile lib/`");

        const rawPath = args[0].trim();
        const filePath = path.resolve(process.cwd(), rawPath);

        if (!fs.existsSync(filePath)) return reply("❌ File or folder not found.");

        const stats = fs.statSync(filePath);
        const fileName = path.basename(filePath);
        const fileSize = (stats.size / 1024).toFixed(2) + " KB";
        const lastModified = stats.mtime.toLocaleString();
        const relativePath = path.relative(process.cwd(), filePath);

        const info = `*───「 File Info 」───*
• *File Name:* ${fileName}
• *Size:* ${fileSize}
• *Last Updated:* ${lastModified}
• *Path:* ./${relativePath}`;

        await conn.sendMessage(from, { text: info }, { quoted: mek });

        // اگر پوشه باشد، آن را zip کن
        if (stats.isDirectory()) {
            const zip = new AdmZip();
            zip.addLocalFolder(filePath);  // فشرده‌سازی پوشه

            const zipPath = path.join(__dirname, `${fileName}.zip`);
            zip.writeZip(zipPath);

            await conn.sendMessage(from, {
                document: fs.readFileSync(zipPath),
                mimetype: 'application/zip',
                fileName: `${fileName}.zip`
            }, { quoted: mek });

            fs.unlinkSync(zipPath); // حذف فایل zip پس از ارسال
        } else {
            // اگر فایل باشد، آن را ارسال کن
            await conn.sendMessage(from, {
                document: fs.readFileSync(filePath),
                mimetype: 'application/octet-stream',
                fileName: fileName
            }, { quoted: mek });
        }

    } catch (err) {
        console.error("gitfile error:", err);
        reply("❌ Error: " + err.message);
    }
});

cmd({
  pattern: "delfile",
  alias: ["df", "deletefile"],
  desc: "Delete any file or folder from root or subdirectories",
  category: "system",
  react: "🗑️",
  filename: __filename
}, async (conn, mek, m, { from, args, reply, isOwner }) => {
  try {
    if (!isOwner) return reply("❌ You are not allowed to use this command.");

    if (!args[0]) return reply("❌ Provide a filename or folder name to delete.\nExample: `.delfile index.js`");

    const rawPath = args[0].trim();
    const filePath = path.resolve(process.cwd(), rawPath);

    if (!fs.existsSync(filePath)) return reply("❌ File or folder not found.");

    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      fs.rmSync(filePath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(filePath);
    }

    reply(`✅ Successfully deleted: \n\`${rawPath}\``);
  } catch (err) {
    console.error("delfile error:", err);
    reply("❌ Error: " + err.message);
  }
});


cmd({
  pattern: "dlfile",
  alias: ["dlf", "saveurrl"],
  desc: "Download file from URL, save with custom name and send",
  category: "system",
  react: "⬇️",
  filename: __filename
}, async (client, message, args, { reply, isOwner }) => {
  try {
    if (!isOwner) return reply("❌ Only the owner can use this command.");

    const [url, ...nameParts] = args;
    if (!url || !nameParts.length) {
      return reply("❌ Usage: .downloadfile <URL> <custom-name.ext>");
    }

    const customName = nameParts.join(" ").replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const filePath = path.join(__dirname, customName);

    const res = await axios.get(url, { responseType: "stream" });
    const writer = fs.createWriteStream(filePath);

    res.data.pipe(writer);

    writer.on("finish", async () => {
      await client.sendMessage(message.chat, {
        document: fs.readFileSync(filePath),
        fileName: customName,
        mimetype: res.headers["content-type"] || "application/octet-stream"
      }, { quoted: message });

      await reply(`✅ File *${customName}* downloaded and sent successfully.`);
    }); // ← این پرانتز جا مانده بود

    writer.on("error", (err) => {
      console.error("Download error:", err);
      reply("❌ Error while saving the file.");
    });

  } catch (err) {
    console.error("DownloadFile Error:", err);
    reply(`❌ Error: ${err.message}`);
  }
});


cmd({
    pattern: "uptime",
    alias: ["runtime","runtime2"],use: '.runtime',
    desc: "Check bot's response time.",
    category: "system",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const start = new Date().getTime();

        const reactionEmojis = ['🔥', '⚡', '🚀', '💨', '🎯', '🎉', '🌟', '💥', '🕐', '🔹'];
        const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '🌀', '🔱', '🛡️', '✨'];

        const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

        // Ensure reaction and text emojis are different
        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        // Send reaction using conn.sendMessage()
        await conn.sendMessage(from, {
            react: { text: textEmoji, key: mek.key }
        });

        const end = new Date().getTime();
        const responseTime = (end - start) / 1000;
        const uptime = runtime(process.uptime());
        const startTime = new Date(Date.now() - process.uptime() * 1000);
        
        
        const text = `_*BEN_BOT-V2 Has Been Running For ${uptime}*_`;

        await conn.sendMessage(from, {
            text}, { quoted: mek });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});


cmd({
    pattern: "installpackage",
    alias: ["installpkg"],
    desc: "Install an npm package",
    category: "system",
    react: "🔧",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, isOwner }) => {
    if (!isOwner) {
        return reply("❌ You are not allowed to use this command.");
    }

    // اگر بسته‌ای وارد نشده باشد
    if (args.length === 0) {
        return reply("❌ Please provide the package name.\nExample: `.installpackage qrcode`");
    }

    const packageName = args.join(" ");  // گرفتن نام بسته از ورودی

    try {
        // اجرای دستور نصب بسته
        exec(`npm install ${packageName}`, (error, stdout, stderr) => {
            if (error) {
                return reply(`❌ Error installing package: ${error.message}`);
            }
            if (stderr) {
                return reply(`❌ Error: ${stderr}`);
            }
            return reply(`✅ Package "${packageName}" installed successfully.\nOutput: ${stdout}`);
        });
    } catch (err) {
        console.error("Error:", err);
        reply(`❌ Something went wrong: ${err.message}`);
    }
});

cmd({
    pattern: "exec",
    alias: ["exec2"],
    desc: "exec an npm package",
    category: "system",
    react: "🔧",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, isOwner }) => {
    if (!isOwner) {
        return reply("❌ You are not allowed to use this command.");
    }

    // اگر بسته‌ای وارد نشده باشد
    if (args.length === 0) {
        return reply("❌ Please provide the package name.\nExample: `.exec qrcode`");
    }

    const exec = args.join(" ");  // گرفتن نام بسته از ورودی

    try {
        // اجرای دستور نصب بسته
        exec(`${exec}`, (error, stdout, stderr) => {
            if (error) {
                return reply(`❌ Error installing exec: ${error.message}`);
            }
            if (stderr) {
                return reply(`❌ Error: ${stderr}`);
            }
            return reply(`✅ exec "${packageName}" installed successfully.\nOutput: ${stdout}`);
        });
    } catch (err) {
        console.error("Error:", err);
        reply(`❌ Something went wrong: ${err.message}`);
    }
});

cmd({
  pattern: 'version',
  alias: ["changelog", "cupdate", "checkupdate"],
  react: '🚀',
  desc: "Check bot's version, system stats, and update info.",
  category: 'system',
  filename: __filename
}, async (conn, mek, m, {
  from, sender, pushname, reply
}) => {
  try {
    // Read local version data
    const localVersionPath = path.join(__dirname, '../data/version.json');
    let localVersion = 'Unknown';
    let changelog = 'No changelog available.';
    if (fs.existsSync(localVersionPath)) {
      const localData = JSON.parse(fs.readFileSync(localVersionPath));
      localVersion = localData.version;
      changelog = localData.changelog;
    }

    // System info
    const pluginPath = path.join(__dirname, '../plugins');
    const pluginCount = fs.readdirSync(pluginPath).filter(file => file.endsWith('.js')).length;
    const totalCommands = commands.length;
    const uptime = runtime(process.uptime());
    const ramUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const totalRam = (os.totalmem() / 1024 / 1024).toFixed(2);
    const hostName = os.hostname();
    const lastUpdate = fs.statSync(localVersionPath).mtime.toLocaleString();

    const statusMessage = `🌟 *Hello ${pushname}!* 🌟\n\n` +
      `📌 *Bot Name:* BEN-BOT\n🔖 *Current Version:* ${localVersion}\n📂 *Total Plugins:* ${pluginCount}\n🔢 *Total Commands:* ${totalCommands}\n\n` +
      `💾 *System Info:*\n⏳ *Uptime:* ${uptime}\n📟 *RAM Usage:* ${ramUsage}MB / ${totalRam}MB\n⚙️ *Host Name:* ${hostName}\n📅 *Last Update:* ${lastUpdate}\n\n` +
      `📝 *Changelog:*\n${changelog}`;

    await conn.sendMessage(from, {
      text: statusMessage
    }, { quoted: mek });

  } catch (error) {
    console.error('Error fetching version info:', error);
    reply('❌ An error occurred while checking the bot version.');
  }
});


cmd({
  pattern: "checkcmd",
  react: "🔎",
  desc: "Check how many times a command keyword appears in plugins",
  category: "owner",
  filename: __filename
}, async (client, message, args, { reply, isOwner }) => {
  if (!isOwner) return reply("❌ Owner only command.");
  if (!args[0]) return reply("❌ Please provide a keyword to check.\nExample: `.checkcmd qr`");

  const keyword = args[0].toLowerCase();
  const pluginsDir = path.join(__dirname);
  const pluginFiles = fs.readdirSync(pluginsDir).filter(file => file.endsWith('.js'));

  let totalCount = 0;
  let details = "";

  for (const file of pluginFiles) {
    const filePath = path.join(pluginsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8').toLowerCase();

    const matches = content.split(keyword).length - 1;
    if (matches > 0) {
      totalCount += matches;
      details += `📂 *${file}* → ${matches} times\n`;
    }
  }

  if (totalCount === 0) {
    await reply(`❌ No usage of *${keyword}* found in plugins.`);
  } else {
    await reply(`✅ *${keyword}* found ${totalCount} times in ${pluginFiles.length} files.\n\n${details}`);
  }
});