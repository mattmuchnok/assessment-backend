const express = require("express");
const cors = require("cors");
const games = require(`./db.json`)
let globalId = 4

const app = express();

app.use(cors());
app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get("/api/fortune", (req, res) => {
  const fortunes = ["A beautiful, smart, and loving person will be coming into your life.",
					 "A dubious friend may be an enemy in camouflage.",
					 "A faithful friend is a strong defense.",
           "A feather in the hand is better than a bird in the air.",
           "A fresh start will put you on your way.",
           "A friend asks only for your time not your money.",
  ];

  // choose random fortune
  let randomIndex = Math.floor(Math.random() * fortunes.length);
  let randomFortune = fortunes[randomIndex];

  res.status(200).send(randomFortune);
  
});

app.get("/api/games", (req, res) => {
  res.status(200).send(games)
})

app.delete("/api/games/:id", (req, res) => {
  let index = games.findIndex(elem => elem.id === +req.params.id)
  games.splice(index, 1)
  res.status(200).send(games)
})

app.post("/api/games", (req, res) => {
  let {title, rating, imageURL} = req.body
  let newGame = {
    id: globalId,
    title,
    rating,
    imageURL
  }
  games.push(newGame)
  res.status(200).send(games)
  globalId++
})

app.put("/api/games/:id", (req, res) => {
  let {id} = req.params
  let {type} = req.body
  let index = games.findIndex(elem => elem.id === +id)

  if (games[index].rating === 5 && type === `plus`) {
      res.status(400).send(`We cannot go above 5`)
  } else if (games[index].rating === 0 && type === `minus`) {
      res.status(400).send(`We cannot go below 0`)
  } else if (type === `plus`) {
      games[index].rating++
      res.status(200).send(games)
  } else if (type === `minus`) {
      games[index].rating--
      res.status(200).send(games)
  } else {
      res.status(400).send(`You broke it!`)
  }
})

app.listen(4000, () => console.log("Server running on 4000"));