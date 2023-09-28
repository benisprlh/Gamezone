document.addEventListener("DOMContentLoaded", function()
{
    // import { dataGame } from './scripts/dataGame.js';
   

function generateGameItems(ageFixed) {
    
    let dataGame = window.dataGame;
                            
    let idAge = localStorage.getItem("keyAge");
    let action = localStorage.getItem("Action");
    let battleRoyal = localStorage.getItem("Battle-Royal");
    let sports = localStorage.getItem("Sports");
    let genreGroup = [action, battleRoyal, sports]
    localStorage.clear();
    let gameItemsHTML = "";
    dataGame.forEach((game, index) => {
        if (!action && !sports && !battleRoyal){
            gameItemsHTML += `
            <article class="game-item">
                <img src="${game.image}" alt="${game.nama}"gi>
                <h2>${game.nama}</h2>
                <p>Genre: ${game.genre}</p>
                <p>Price: RP.${game.harga}</p>
                <p>Stock: ${game.stok} available</p>
                <button class="cart-button">Add to Cart</button>
            </article>
        `;
        }
        if (idAge === "Di Bawah 18 Tahun"){
            if (game.umur < 18){
                for (let i = 0; i < genreGroup.length; i++){
                    if (genreGroup[i] === game.genre){
                        gameItemsHTML += `
                        <article class="game-item">
                            <img src="${game.image}" alt="${game.nama}"gi>
                            <h2>${game.nama}</h2>
                            <p>Genre: ${game.genre}</p>
                            <p>Price: RP.${game.harga}</p>
                            <p>Stock: ${game.stok} available</p>
                            <button class="cart-button">Add to Cart</button>
                        </article>
                    `;
                    }
                }
                
            }
        } else {
            for (let i = 0; i < genreGroup.length; i++){
                if (genreGroup[i] === game.genre){
                    gameItemsHTML += `
                    <article class="game-item">
                        <img src="${game.image}" alt="${game.nama}"gi>
                        <h2>${game.nama}</h2>
                        <p>Genre: ${game.genre}</p>
                        <p>Price: RP.${game.harga}</p>
                        <p>Stock: ${game.stok} available</p>
                        <button class="cart-button">Add to Cart</button>
                    </article>
                `;
                }
            }
        }
         
    
});    
    
    return gameItemsHTML;
}
    
function renderGameItems(ageFixed) {
    const gameList = document.querySelector(".game-list");
    const gameItemsHTML = generateGameItems(ageFixed);
   
    gameList.innerHTML = gameItemsHTML;
}
renderGameItems();


    
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const cancelBtn = document.getElementById("cancel-btn");

    function clearSearchInput() {
        searchInput.value = "";
    }

    searchBtn.addEventListener("click", function()
    {
        clearSearchInput();
    });

    cancelBtn.addEventListener("click", function()
    {
        clearSearchInput();
        renderGameItems();
    });
});
    
// Function to render game items based on search
function renderGames(searchText) {
    const gameItems = document.querySelectorAll(".game-item");

    // Iterate through existing game items and hide them if they don't match the search text
    gameItems.forEach(gameItem => {
        const title = gameItem.querySelector("h2").textContent.toLowerCase();
        if (title.includes(searchText.toLowerCase()))
        {
            gameItem.style.display = "block";
        }
        else
        {
            gameItem.style.display = "none";
        }
    });
}

// Event listener for the search input
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.trim();
    renderGames(searchText);
});
