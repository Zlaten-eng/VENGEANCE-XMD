const { cmd } = require('../command');

cmd({
    pattern: "qr",
    alias: ["qrcode", "qr2"],
    desc: "Create QR code from text",
    category: "tools",
    react: "📦",
    filename: __filename
},
async (client, message, m, { args, reply }) => {
    try {
        const allowedNumber = "93744215959@s.whatsapp.net";
        
        if (!args[0]) return reply("❌ Please provide a text.\nExample: `.qr example`");

        const text = args.join(" ");
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;

        await client.sendMessage(message.chat, {
            image: { url: qrUrl },
            caption: `> ✅ QR Code generated for: ${text}`
        }, { quoted: message });

    } catch (err) {
        console.error("Error in .qr command:", err);
        reply("❌ Error: " + err.message);
    }
});