const { cmd } = require('../command');

cmd({
    pattern: "react",
    desc: "React with ❤️ to a message from a specific group or channel using URL",
    category: "tools",
    filename: __filename
}, async (client, message, m, { args, reply }) => {
    try {
        // بررسی اینکه آیا آرگومان وارد شده است
        if (!args || args.length === 0) {
            return reply("❌ Please provide the message URL.");
        }

        const messageUrl = args[0]; // URL پیام
        const reactionEmoji = '❤️'; // ایموجی ریکشن

        // ارسال ریکشن به پیام با استفاده از URL
        await client.sendMessage(message.chat, {
            'reaction': {
                text: reactionEmoji,
                key: { remoteJid: messageUrl }
            }
        });

        reply("❤️ Reaction added to the message.");
    } catch (error) {
        console.error(error);
        reply("❌ Error: " + error.message);
    }
});