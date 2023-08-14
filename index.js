const TelegramBot = require('node-telegram-bot-api')

const token = "6624334564:AAHwB5FuExznHV_lm1tJGCw5pWRnM_3M-1Y"

const bot = new TelegramBot(token, {polling: true});

const { gameOptions, againOptions } = require('./options')

const obj = {}

const startGame = async chatId => {
    await bot.sendMessage(
        chatId,
        "0 dan 9 gacha o'ylangan sonni toping"
    )

    const randomNumber = Math.floor(Math.random() * 10)
    obj[chatId] = randomNumber
    await bot.sendMessage(chatId, "To'g'ri sonni toping", gameOptions) 
}

const bootstrap = () => {
    bot.setMyCommands([
        {
            command: "/start", 
            description: "Botni ishga tushirish"
        },
        {
            command: "/info", 
            description: "Korxona haqida ma'lumot"
        },
        {
            command: "/game", 
            description: "O'yin o'ynash"
        }
    ]);

    bot.on('message', async (msg) => {
        const text = msg.text
        const chatId = msg.chat.id;
      
        if (text === '/start') {
            return bot.sendMessage(
                chatId,
                `Assalomu alaykum hurmatli ${msg.from?.first_name}. Eshik va mebellar ishlab chiqarish korxonasi sotuv bo'limiga xush kelibsiz.`)
        }
    
        if (text === '/info') {
            await bot.sendSticker(
                chatId, 
                "https://tlgrm.eu/_/stickers/b0d/85f/b0d85fbf-de1b-4aaf-836c-1cddaa16e002/1.webp"
            )
    
            return bot.sendMessage(
                chatId,
                "Biz haqimizda..."
            )
        }

        if (text === '/game') {
            return startGame(chatId)
        }
        
        bot.sendMessage(
            chatId, 
            "uzur, men sizning gapingizga tushunmayapman"
        )
    });

    bot.on("callback_query", msg => {
        const data = msg.data
        const chatId = msg.message.chat.id

        if (data === '/again') {
            return startGame(chatId)
        }
        
        if (data == obj[chatId]) {
            return bot.sendMessage(
                chatId, 
                `Tabriklaymiz siz to'g'ri javob berdingiz. Kompyuter ${obj[chatId]} sonini o'ylagan edi.`    
            )
        } else {
            return bot.sendMessage(
                chatId, 
                `Siz topolmadingiz. Siz tanlagan son ${data}, kompyuter o'ylagan son ${obj[chatId]} edi.`,
                againOptions
            )
        }

    })
}

bootstrap()