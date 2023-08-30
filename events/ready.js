module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {

    let green = '\x1b[32m',
    colorful = (color, string, reset = '\x1b[0m') => color + string + reset
    console.log(colorful(green, 
        
`✅ - [BOT] online!|${client.user.username}`))   



        var compteurStatus = 1
        setInterval(async () => {
            status =  [`ULTIMATE X`]
            compteurStatus = (compteurStatus + 1) % (status.length);
            client.user.setPresence({
                activities: [{
                    name: `${status[compteurStatus]}`,
                    type: "WATCHING",
                    url: "https://www.youtube.com/watch?v=6GCHMSA8f_I&t"
                }],
                  status: "online"})
        }, 5000);
    }
}
