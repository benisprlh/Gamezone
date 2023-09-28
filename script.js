document.addEventListener("DOMContentLoaded", function()
{
    // import { dataGame } from './scripts/dataGame.js';
   

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
        localStorage.setItem(`stock-${game.nama}`, game.stok);
        if (!action && !sports && !battleRoyal){
            gameItemsHTML += `
            <article class="game-item">
                <img src="${game.image}" alt="${game.nama}"gi>
                <h2>${game.nama}</h2>
                <p>Genre: ${game.genre}</p>
                <p>Price: RP.${game.harga}</p>
                <p class="stock" id="stock-${game.nama}">Stock: ${game.stok} available</p>
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
                            <p class="stock" id="stock-${game.nama}">Stock: ${game.stok} available</p>
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
                        <p class="stock" id="stock-${game.nama}">Stock: ${game.stok} available</p>
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

    // Inisialisasi stok saat halaman dimuat
    // Mengambil stok dari localStorage (jika sudah ada)
    const stock = JSON.parse(localStorage.getItem('stock')) || {};
  
    // Memperbarui tampilan stok di halaman list game

    gameItems.forEach(gameItem => {
      const gameDataIndex = Array.from(gameItems).indexOf(gameItem);
      const gameData = window.dataGame[gameDataIndex];
      const stockElement = gameItem.querySelector('[data-stock]');
  
      if (stock[gameData.nama] !== undefined) {
        // Jika stok ada di localStorage, perbarui tampilan stok
        const stockValue = stock[gameData.nama];
        stockElement.setAttribute('data-stock', stockValue);
        stockElement.textContent = `Stok: ${stockValue} tersedia`;
      }
    });
      

function handleButtonClick(event) {
  const index = Array.from(gameItems).indexOf(event.currentTarget.closest('.game-item'));

  const gameData = window.dataGame[index];

  const button = event.currentTarget;
//   console.log('Button:', button);
  const stock = parseInt(button.getAttribute('data-stock'), 10);
//   console.log('Nilai stock dalam handleButtonClick:', button.getAttribute('data-stock'));

if (stock > 0) {
    // Mengurangi stok jika stok masih tersedia
    const updatedStock = stock - 1;
    button.setAttribute('data-stock', updatedStock);

    const stockElement = document.getElementById(`stock-${gameData.nama}`);

    // Memperbarui tampilan stok dalam elemen dengan ID yang sesuai
    if (stockElement) {
      stockElement.textContent = `Stok: ${updatedStock} tersedia`;

      localStorage.setItem(`stock-${gameData.nama}`, updatedStock.toString());
    }

    // Mengupdate atau menambahkan item ke dalam keranjang
    const cart = JSON.parse(localStorage.getItem('cart'));
    const existingItem = cart.find(item => item.nama === gameData.nama);

    if (existingItem) {
      existingItem.quantity++;
      existingItem.harga += gameData.harga;
    } else {
      cart.push({
        nama: gameData.nama,
        image: gameData.image,
        quantity: 1,
        harga: gameData.harga
      });
    }

    // Menyimpan keranjang yang diperbarui ke localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  } else {
    alert('Stok habis.');
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

