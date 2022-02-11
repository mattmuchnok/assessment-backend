const gamesContainer = document.querySelector('#games-container')
const form = document.querySelector('form')

document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
  };

document.getElementById("fortuneButton").onclick = function () {
axios.get("http://localhost:4000/api/fortune/")
    .then(function (response) {
        const data = response.data;
        alert(data);
    });
};

const gamesCallback = ({ data: games }) => displayGames(games)
const errCallback = err => console.log(err.response.data)

const getAllGames = () => axios.get("http://localhost:4000/api/games/").then(gamesCallback).catch(errCallback)
const deleteGame = id => axios.delete(`http://localhost:4000/api/games/${id}`).then(gamesCallback).catch(errCallback)
const createGame = body => axios.post("http://localhost:4000/api/games/", body).then(gamesCallback).catch(errCallback)
const updateGame = (id, type) => axios.put(`http://localhost:4000/api/games/${id}`, {type}).then(gamesCallback).catch(errCallback)

function createGameCard(game) {
    const gameCard = document.createElement('div')
    gameCard.classList.add('game-card')

    gameCard.innerHTML = `<img alt='game cover image' src=${game.imageURL} class="game-cover-image"/>
    <p class="title">${game.title}</p>
    <div class="btns-container">
        <button onclick="updateGame(${game.id}, 'minus')">-</button>
        <p class="game-rating">${game.rating}</p>
        <button onclick="updateGame(${game.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteGame(${game.id})">delete</button>
    `
    
    gamesContainer.appendChild(gameCard)
}

function submitHandler(e) {
    e.preventDefault()

    let title = document.querySelector('#title')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        title: title.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createGame(bodyObj)

    title.value = ''
    rating.checked = false
    imageURL.value = ''
}

function displayGames(arr) {
    gamesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createGameCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllGames()