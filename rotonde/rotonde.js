var rotonde = {
  get: function() {
    return {
      meta: {
        version: "0.0.1-metaprop",
        canonical: "rotonde.nanoleptic.net",
        aliases: [
          "nanoleptic.net:4444",
          "176.31.185.224:4444"
        ],
        options: {}
      },
      profile: {
        name: "Gaeel",
        location: "Abstract",
        position: "0, 0",
        color: "#DDEEEE",
        avatar: "https://pbs.twimg.com/profile_images/879291279292628992/7hCKAdcY_400x400.jpg"
      },
      feed:[
        {
          time: 0,
          text: "Hello, world!",
          topic: "Testing",
          task: "Rotonde",
          data: {
            focus: 0.1,
            sleep: 0,
            nutrition: 0.2
          }
        }
      ],
      portal: [
        "rotonde.v-os.ca",
        "rotonde.xxiivv.com"
      ]
    }
  },
}




module.exports = rotonde;