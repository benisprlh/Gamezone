document.addEventListener("DOMContentLoaded", function()
{
    // import { dataGame } from './scripts/dataGame.js';
    // localStorage.clear();
   

function generateGameItems() {
    
    let dataGame = window.dataGame;
                            
    let idAge = localStorage.getItem("keyAge");
    let action = localStorage.getItem("Action");
    let battleRoyal = localStorage.getItem("Battle-Royal");
    let sports = localStorage.getItem("Sports");
    let genreGroup = [action, battleRoyal, sports]
    localStorage.removeItem("keyAge")
    localStorage.removeItem("Action")
    localStorage.removeItem("Battle-Royal")
    localStorage.removeItem("Sports")
    let gameItemsHTML = "";
    dataGame.forEach((game, index) => {
        const stock = JSON.parse(localStorage.getItem(`stock-${game.nama}`)) || game.stok;
        if (!action && !sports && !battleRoyal){
            gameItemsHTML += `
            <article class="game-item">
                <img src="${game.image}" alt="${game.nama}"gi>
                <h2>${game.nama}</h2>
                <p>Genre: ${game.genre}</p>
                <p>Price: RP.${game.harga}</p>
                <p class="stock" id="stock-${game.nama}">Stock: ${stock > 0 ? stock : 0} available</p>
                <button class="cart-button" data-stock="${game.stok}">Add to Cart</button>
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
                            <p class="stock" id="stock-${game.nama}">Stock: ${stock > 0 ? stock : 0} available</p>
                            <button class="cart-button" data-stock="${game.stok}">Add to Cart</button>
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
                        <p class="stock" id="stock-${game.nama}">Stock: ${stock > 0 ? stock : 0} available</p>
                        <button class="cart-button" data-stock="10">Add to Cart</button>
                    </article>
                `;
                }
            }
        }
         
    
});    
    
    return gameItemsHTML;
}
    
function renderGameItems() {
    const gameList = document.querySelector(".game-list");
    const gameItemsHTML = generateGameItems();
   
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


const gameItems = document.querySelectorAll('.game-item');


    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }

      

    function handleButtonClick(event) {
        const index = Array.from(gameItems).indexOf(event.currentTarget.closest('.game-item'));
        const gameData = window.dataGame[index];
        const button = event.currentTarget;
        const stock = parseInt(button.getAttribute('data-stock'), 10);
      
        if (stock > 0) {
          const updatedStock = stock - 1;
          button.setAttribute('data-stock', updatedStock);
      
          const stockElement = document.getElementById(`stock-${gameData.nama}`);
      
          if (stockElement) {
            stockElement.textContent = `Stock: ${updatedStock} available`;
      
            // Simpan perubahan stok ke localStorage
            localStorage.setItem(`stock-${gameData.nama}`, updatedStock.toString());
          }
      
          const cart = JSON.parse(localStorage.getItem('cart')) || [];
          const existingItem = cart.find(item => item.nama === gameData.nama);
      
          if (existingItem) {
            existingItem.quantity++;
            existingItem.harga += gameData.harga;
          } else {
            cart.push({
              nama: gameData.nama,
              image: gameData.image,
              quantity: 1,
              harga: gameData.harga,
            });
          }
      
          localStorage.setItem('cart', JSON.stringify(cart));
      
          // Perbarui stok di halaman Cart Page dengan mengambil data yang sama dari localStorage
          const cartStockElement = document.getElementById(`cart-stock-${gameData.nama}`);
          if (cartStockElement) {
            cartStockElement.textContent = `Stock: ${updatedStock} available`;
          }
        } else {
          alert('Stok habis.');
          const stockElement = document.getElementById(`stock-${gameData.nama}`);
      
          if (stockElement) {
            stockElement.textContent = `Stock: ${0} available`;
      
            // Simpan perubahan stok ke localStorage
            localStorage.setItem(`stock-${gameData.nama}`, 0);
          }
        }
      }


for (let i = 0; i < gameItems.length; i++) {
  const gameItem = gameItems[i];
  const button = gameItem.querySelector('button');
  button.addEventListener('click', handleButtonClick);
  
}

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

