const { getConfig } = require("./lib/configdb");
const fs = require('fs');
require('dotenv').config();

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "ROVER-XMD~4yUmUCoA#sikdu7Vv9yN969GI9q8hO7bsxMIgRXioczjUDdqYRa0",
// add your Session Id 
AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
// make true or false status auto seen
AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
// make true if you want auto reply on status 
AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
// make true if you want auto reply on status 
AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*YOUR STATUS HAS BEEN VIEWED SUCCESSFULLY BY VENGEANCE-XMD*",
// set the auto reply massage on status reply  
WELCOME: process.env.WELCOME || "false",
// true if want welcome and goodbye msg in groups    
ADMIN_EVENTS: process.env.ADMIN_EVENTS || "false",
// make true to know who dismiss or promoted a member in group
ANTI_LINK: process.env.ANTI_LINK || "true",
// make anti link true,false for groups 
ANTI_DELETE: process.env.ANTI_DELETE || "true",
//Antidelete make true to recover deleted messages 
MENTION_REPLY: process.env.MENTION_REPLY || "false",
// make true if want auto voice reply if someone menetion you 
MENU_IMAGE_URL: process.env.MENU_IMAGE_URL || "https://files.catbox.moe/ktqas9.jpg'",
// add custom menu and mention reply image url
PREFIX: getConfig("PREFIX") || "Z",
// add your prefix for bot   
BOT_NAME: process.env.BOT_NAME || "VENGEANCE-XMD",
// add bot namw here for menu
STICKER_NAME: process.env.STICKER_NAME || "VENGEANCE-XMD",
// type sticker pack name 
CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
// make this true for custum emoji react    
CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "🤎,🖤,🤍",
// chose custom react emojis by yourself 
ANTIVIEW_ONCE: process.env.ANTIVIEW_ONCE || "true",
//make True to be able to download view once messages
ANTILINK_WARN: process.env.ANTILINK_WARN || "true",
// make anti link true,false for groups 
ANTILINK_KICK: process.env.ANTILINK_KICK || "false",
// make antilink true to kick those who sent links 
OWNER_NUMBER: process.env.OWNER_NUMBER || "254769677305",
// add your bot owner number
OWNER_NAME: process.env.OWNER_NAME || "VENGEANCE254",
// add bot owner name
DESCRIPTION: process.env.DESCRIPTION || "*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ VENGEANCE-XMD*",
// add bot owner name    
ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/ktqas9.jpg'",
// add img for alive msg
LIVE_MSG: process.env.LIVE_MSG || "> ALWAYS ONLINE *VENGEANCE-XMD*⚡",
// add alive msg here 
READ_MESSAGE: process.env.READ_MESSAGE || "false",
// Turn true or false for automatic read msgs
AUTO_REACT: process.env.AUTO_REACT || "false",
// make this true or false for auto react on all msgs
ANTI_BAD: process.env.ANTI_BAD || "false",
// false or true for anti bad words  
MODE: process.env.MODE || "private",
// make bot public-private-inbox-group 
AUTO_VOICE: process.env.AUTO_VOICE || "false",
// make true for send automatic voices
AUTO_STICKER: process.env.AUTO_STICKER || "false",
// make true for automatic stickers 
AUTO_REPLY: process.env.AUTO_REPLY || "false",
// make true or false automatic text reply 
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
// maks true for always online 
PUBLIC_MODE: process.env.PUBLIC_MODE || "false",
// make false if want private mod
AUTO_TYPING: process.env.AUTO_TYPING || "false",
// true for automatic show typing   
READ_CMD: process.env.READ_CMD || "false",
// true if want mark commands as read 
DEV: process.env.DEV || "254769677305",
//replace with your whatsapp number        
ANTI_VV: process.env.ANTI_VV || "true",
// true for anti once view 
AUTO_RECORDING: process.env.AUTO_RECORDING || "false"
// make it true for auto recoding
};
