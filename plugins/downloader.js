const fetch = require("node-fetch");
const config = require('../config');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');
const { getConfig, setConfig } = require('../lib/configdb');
const axios = require("axios");
const { fetchJson } = require("../lib/functions");
const { downloadTiktok } = require("@mrnima/tiktok-downloader");
const { facebook } = require("@mrnima/facebook-downloader");
const cheerio = require("cheerio");
const { igdl } = require("ruhend-scraper");
const { cmd, commands } = require('../command');


cmd({
  pattern: "ig",
  alias: ["insta", "instagram"],
  desc: "Download Instagram videos/images using BK9 API",
  react: "🎥",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("http")) {
      return reply("❌ Please provide a valid Instagram link.");
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const apiURL = `https://bk9.fun/download/instagram?url=${encodeURIComponent(q)}`;
    const response = await axios.get(apiURL);
    const json = response.data;

    if (!json.status || !Array.isArray(json.BK9)) {
      return reply("⚠️ Failed to fetch Instagram media. Please check the link.");
    }

    for (const media of json.BK9) {
      const type = media.type || "";
      const url = media.url;
      if (!url) continue;

      if (type === "image") {
        await conn.sendMessage(from, {
          image: { url },
          caption: "📥 *Instagram Image*"
        }, { quoted: m });
      } else {
        await conn.sendMessage(from, {
          video: { url },
          caption: "📥 *Instagram Video*"
        }, { quoted: m });
      }
    }

  } catch (error) {
    console.error("IG Download Error:", error);
    reply("❌ An error occurred while processing your Instagram link.");
  }
});


cmd({
    pattern: "movie",
    desc: "Fetch detailed information about a movie.",
    category: "utility",
    react: "🎬",
    filename: __filename
},
async (conn, mek, m, { from, reply, sender, args }) => {
    try {
        // Properly extract the movie name from arguments
        const movieName = args.length > 0 ? args.join(' ') : m.text.replace(/^[\.\#\$\!]?movie\s?/i, '').trim();
        
        if (!movieName) {
            return reply("📽️ Please provide the name of the movie.\nExample: .movie Captain America");
        }

        const apiUrl = `https://apis.davidcyriltech.my.id/imdb?query=${encodeURIComponent(movieName)}`;
        const response = await axios.get(apiUrl);

        if (!response.data.status || !response.data.movie) {
            return reply("🚫 Movie not found. Please check the name and try again.");
        }

        const movie = response.data.movie;
        
        // Format the caption
        const dec = `
🎬 *${movie.title}* (${movie.year}) ${movie.rated || ''}

⭐ *IMDb:* ${movie.imdbRating || 'N/A'} | 🍅 *Rotten Tomatoes:* ${movie.ratings.find(r => r.source === 'Rotten Tomatoes')?.value || 'N/A'} | 💰 *Box Office:* ${movie.boxoffice || 'N/A'}

📅 *Released:* ${new Date(movie.released).toLocaleDateString()}
⏳ *Runtime:* ${movie.runtime}
🎭 *Genre:* ${movie.genres}

📝 *Plot:* ${movie.plot}

🎥 *Director:* ${movie.director}
✍️ *Writer:* ${movie.writer}
🌟 *Actors:* ${movie.actors}

🌍 *Country:* ${movie.country}
🗣️ *Language:* ${movie.languages}
🏆 *Awards:* ${movie.awards || 'None'}

[View on IMDb](${movie.imdbUrl})
`;

        // Send message with the requested format
        await conn.sendMessage(
            from,
            {
                image: { 
                    url: movie.poster && movie.poster !== 'N/A' ? movie.poster : 'https://files.catbox.moe/6vrc2s.jpg'
                },
                caption: dec,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363333589976873@newsletter',
                        newsletterName: "NOTHING TECH",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error('Movie command error:', e);
        reply(`❌ Error: ${e.message}`);
    }
});


cmd({
  pattern: 'gitclone',
  alias: ["git"],
  desc: "Download GitHub repository as a zip file.",
  react: '📦',
  category: "downloader",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  args,
  reply
}) => {
  if (!args[0]) {
    return reply("❌ Where is the GitHub link?\n\nExample:\n.gitclone https://github.com/username/repository");
  }

  if (!/^(https:\/\/)?github\.com\/.+/.test(args[0])) {
    return reply("⚠️ Invalid GitHub link. Please provide a valid GitHub repository URL.");
  }

  try {
    const regex = /github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?/i;
    const match = args[0].match(regex);

    if (!match) {
      throw new Error("Invalid GitHub URL.");
    }

    const [, username, repo] = match;
    const zipUrl = `https://api.github.com/repos/${username}/${repo}/zipball`;

    // Check if repository exists
    const response = await fetch(zipUrl, { method: "HEAD" });
    if (!response.ok) {
      throw new Error("Repository not found.");
    }

    const contentDisposition = response.headers.get("content-disposition");
    const fileName = contentDisposition ? contentDisposition.match(/filename=(.*)/)[1] : `${repo}.zip`;
    
    // Send the zip file to the user with custom contextInfo
    await conn.sendMessage(from, {
      document: { url: zipUrl },
      fileName: fileName,
      mimetype: 'application/zip',
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ Failed to download the repository. Please try again later.");
  }
});


// MP4 video download

cmd({ 
    pattern: "mp4", 
    alias: ["video"], 
    react: "🎥", 
    desc: "Download YouTube video", 
    category: "main", 
    use: '.mp4 < Yt url or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("Please provide a YouTube URL or video name.");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("No results found!");
        
        let yts = yt.results[0];  
        let apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status !== 200 || !data.success || !data.result.download_url) {
            return reply("Failed to fetch the video. Please try again later.");
        }

        let ytmsg = `📹 *Video Downloader*
🎬 *Title:* ${yts.title}
⏳ *Duration:* ${yts.timestamp}
👀 *Views:* ${yts.views}
👤 *Author:* ${yts.author.name}
🔗 *Link:* ${yts.url}
> Powered By JawadTechX ❤️`;

        // Send video directly with caption
        await conn.sendMessage(
            from, 
            { 
                video: { url: data.result.download_url }, 
                caption: ytmsg,
                mimetype: "video/mp4"
            }, 
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});

// MP3 song download 


cmd({
  pattern: "song",
  alias: ["play", "mp3"],
  react: "🎶",
  desc: "Download YouTube song",
  category: "main",
  use: '.song <query>',
  filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
  try {
    if (!q) return reply("🎵 Please provide a song name or YouTube link.");

    const yt = await ytsearch(q);
    if (!yt.results.length) return reply("❌ No results found!");

    const song = yt.results[0];
    const cacheKey = `song:${song.title.toLowerCase()}`;
    const cachedData = getConfig(cacheKey);
    let downloadUrl = null;

    if (!cachedData) {
      const apiUrl = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(song.url)}`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (!data?.result?.downloadUrl) return reply("⛔ Download failed.");
      downloadUrl = data.result.downloadUrl;

      setConfig(cacheKey, JSON.stringify({
        url: downloadUrl,
        title: song.title,
        thumb: song.thumbnail,
        artist: song.author.name,
        duration: song.timestamp,
        views: song.views,
        yt: song.url
      }));
    } else {
      const parsed = JSON.parse(cachedData);
      downloadUrl = parsed.url;
    }

    const caption = `*✦ BEN_BOT-V1 DOWNLOADER ✦*
╭───────────────◆
│⿻ *Title:* ${song.title}
│⿻ *Quality:* mp3/audio (128kbps)
│⿻ *Duration:* ${song.timestamp}
│⿻ *Viewers:* ${song.views}
│⿻ *Uploaded:* ${song.ago}
│⿻ *Artist:* ${song.author.name}
╰────────────────◆
⦿ *Direct Yt Link:* ${song.url}

Reply With:
*1* To Download Audio 🎶
*2* To Download Audio Document 📄

╭────────────────◆
│ *ᴘᴏᴡᴇʀᴇᴅ ʙʏ Nothing*
╰─────────────────◆`;

    const sentMsg = await conn.sendMessage(from, {
      image: { url: song.thumbnail },
      caption
    }, { quoted: mek });

    const messageID = sentMsg.key.id;

    const handler = async (msgData) => {
      try {
        const msg = msgData.messages[0];
        if (!msg?.message || !msg.key?.remoteJid) return;

        const quotedId = msg.message?.extendedTextMessage?.contextInfo?.stanzaId;
        if (quotedId !== messageID) return;

        const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
        const songCache = getConfig(cacheKey);
        if (!songCache) return reply("⚠️ Song cache not found.");

        const songData = JSON.parse(songCache);

        if (text === "1") {
          await conn.sendMessage(from, {
            audio: { url: songData.url },
            mimetype: "audio/mpeg"
          }, { quoted: msg });
        } else if (text === "2") {
          await conn.sendMessage(from, {
            document: { url: songData.url },
            mimetype: "audio/mpeg",
            fileName: `${songData.title}.mp3`
          }, { quoted: msg });
        } else {
          await conn.sendMessage(from, { text: "❌ Invalid option. Reply with 1 or 2." }, { quoted: msg });
        }

        conn.ev.off("messages.upsert", handler);
      } catch (err) {
        console.error("Reply Handler Error:", err);
      }
    };

    conn.ev.on("messages.upsert", handler);
    setTimeout(() => conn.ev.off("messages.upsert", handler), 10 * 60 * 1000); // 10 min

  } catch (err) {
    console.error(err);
    reply("🚫 An error occurred.");
  }
});