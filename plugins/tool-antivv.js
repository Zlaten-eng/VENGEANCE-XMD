const { cmd } = require("../command");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");

cmd({
  pattern: "vv3",
  alias: ["viewonce3", "readviewonce3"],
  desc: "Retrieve view-once message",
  category: "tools",
  react: "🕵️",
  filename: __filename
}, async (client, message, match, { isCreator }) => {
  if (!isCreator) return message.reply("❌ Only owner can use this command.");
  if (!message.quoted || message.quoted.mtype !== "viewOnceMessageV2") {
    return message.reply("⚠️ Please reply to a *view-once* image or video.");
  }

  try {
    const viewOnceContent = message.quoted.message.viewOnceMessageV2.message;
    const type = Object.keys(viewOnceContent)[0]; // imageMessage or videoMessage
    const media = viewOnceContent[type];

    const stream = await downloadContentFromMessage(media, type.includes("image") ? "image" : "video");
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    if (type.includes("image")) {
      await client.sendMessage(message.chat, {
        image: buffer,
        caption: media.caption || ""
      }, { quoted: message });
    } else if (type.includes("video")) {
      await client.sendMessage(message.chat, {
        video: buffer,
        caption: media.caption || ""
      }, { quoted: message });
    } else {
      message.reply("❌ Unsupported media type.");
    }

  } catch (err) {
    console.error("VV Error:", err);
    message.reply("❌ Error while retrieving view-once message.");
  }
});