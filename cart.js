function generateProductList() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    // localStorage.clear();

    let productListHTML = '';
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        const stock = JSON.parse(localStorage.getItem(`stock-${product.nama}`));

        productListHTML += `<tr>
            <td><img src="${product.image}"></td>
            <td class="ProductName">${product.nama}</td>
            <td class="QuantityProduct">${product.quantity}</td>
            <td class="PriceProduct">${product.harga}</td>
            <td>
                <button class="button-29 penambahan">+</button>
                <button class="button-29 pengurangan">-</button>
                <button class="button-29 delete">delete</button>
            </td> 
        </tr>`;
    }
    return productListHTML;
}

function renderGame() {
    const productList = document.querySelector(".product-list");
    const productListHTML = generateProductList();
    productList.innerHTML = productListHTML;

    productList.addEventListener("change", function() {
        // Hitung total jumlah game dan total pembayaran
        const cart = JSON.parse(localStorage.getItem('cart'));
        let totalGame = 0;
        let totalPembayaran = 0;
        cart.forEach((item) => {
            totalGame += item.quantity;
            totalPembayaran += item.harga * item.quantity;
        });

        // Perbarui nilai elemen HTML
        const totalGameElement = document.querySelector('.totalGame');
        totalGameElement.innerHTML = totalGame;
        const totalElement = document.querySelector('.total');
        totalElement.innerHTML = totalPembayaran;

        // Perbarui nilai elemen namaGame
        const namaGameElement = document.querySelector('.namaGame');
        namaGameElement.innerHTML = "";
        cart.forEach((item) => {
            namaGameElement.innerHTML += item.nama;
        });
    });

}

renderGame();



function handleIncrementClick(event) {
    const productList = document.querySelector(".product-list");
    const cart = JSON.parse(localStorage.getItem('cart'));
    const index = Array.from(productList.rows).indexOf(event.currentTarget.closest('tr'));
    const product = cart[index];
    let stock = JSON.parse(localStorage.getItem(`stock-${product.nama}`));
    let gameData = window.dataGame;

    // Periksa stok tersedia
    if (stock > 0) {
        
        product.harga += product.harga / product.quantity; // Perubahan harga per item jika diperlukan
        product.quantity++;

        // Mengurangi stok
        stock--;

        // Simpan perubahan ke localStorage
        localStorage.setItem(`stock-${product.nama}`, stock);
        localStorage.setItem("cart", JSON.stringify(cart));

        // Perbarui tampilan jumlah produk pada elemen HTML yang sesuai
        const quantityElement = productList.rows[index].querySelector('.QuantityProduct');
        const priceElement = productList.rows[index].querySelector('.PriceProduct');
        if (quantityElement) {
            quantityElement.textContent = product.quantity;
        }
        if (priceElement) {
            priceElement.textContent = product.harga;
        }
    } else {
        alert('Stok habis.');
    }

    // Log pesan ke console
    console.log('Button penambahan diklik.');

    // Hentikan eksekusi fungsi
    return;
}

const incrementButtons = document.querySelectorAll('.penambahan')
for (let i = 0; i < incrementButtons.length; i++){
    let button = incrementButtons[i];
    button.addEventListener("click", handleIncrementClick) 
}

function handleDecrementClick(event) {
    const productList = document.querySelector(".product-list");
    const cart = JSON.parse(localStorage.getItem('cart'));
    const index = Array.from(productList.rows).indexOf(event.currentTarget.closest('tr'));
    const product = cart[index];
    let stock = JSON.parse(localStorage.getItem(`stock-${product.nama}`));

    // Periksa stok tersedia
    if (product.quantity > 0) {
        product.harga -= product.harga / product.quantity; // Perubahan harga per item jika diperlukan
        product.quantity--;
        if (product.quantity === 0) {
            event.preventDefault();
            alert('Jumlah produk tidak boleh kurang dari 1.');
            return;
        }
        

        // Mengurangi stok
        // decrementStock(product);
        stock++;

        // Simpan perubahan ke localStorage
        localStorage.setItem(`stock-${product.nama}`, stock);
        localStorage.setItem("cart", JSON.stringify(cart));

        // Perbarui tampilan jumlah produk pada elemen HTML yang sesuai
        const quantityElement = productList.rows[index].querySelector('.QuantityProduct');
        const priceElement = productList.rows[index].querySelector('.PriceProduct');
        if (quantityElement) {
            quantityElement.textContent = product.quantity;
        }
        if (priceElement) {
            priceElement.textContent = product.harga;
        }

        // Hapus produk jika kuantitas = 0
        
    } 

    // Hentikan eksekusi fungsi
    return;
}

const decrementButtons = document.querySelectorAll('.pengurangan');
for (let i = 0; i < decrementButtons.length; i++){
    let button = decrementButtons[i];
    button.addEventListener("click", handleDecrementClick) 
}

function handleDeleteClick(event) {
    const productList = document.querySelector(".product-list");
    const cart = JSON.parse(localStorage.getItem('cart'));
    const index = Array.from(productList.rows).indexOf(event.currentTarget.closest('tr'));
    const product = cart[index];
    let stock = JSON.parse(localStorage.getItem(`stock-${product.nama}`));

    stock += product.quantity;
    localStorage.setItem(`stock-${product.nama}`, stock);

    // Hapus produk dari keranjang belanja
    cart.splice(index, 1);

    // Simpan perubahan ke localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Perbarui tampilan keranjang belanja
    productList.rows[index].remove();

    // Hentikan eksekusi fungsi
    return;
}

function displayCheckoutModal() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
        backdrop: 'static',
        keyboard: false
    });

    // Get the elements in the modal
    const namaGameElement = document.querySelector('.namaGame');
    const totalGameElement = document.querySelector('.totalGame');
    const totalElement = document.querySelector('.total');

    // Initialize variables to store game list, total quantity, and total payment
    let gameList = '';
    let totalQuantity = 0;
    let totalPrice = 0;

    // Loop through the cart to build the game list and calculate totals
    cart.forEach((item) => {
        gameList += `${item.nama}<br>`;
        totalQuantity += item.quantity;
        totalPrice += item.harga * item.quantity;
    });

    // Update the modal content with the calculated values
    namaGameElement.innerHTML = gameList;
    totalGameElement.innerHTML = totalQuantity;
    totalElement.innerHTML = `RP.${totalPrice.toFixed(2)}`;

    // Show the modal
    modal.show();
}


const deleteButtons = document.querySelectorAll('.delete');
for (let i = 0; i < deleteButtons.length; i++){
    let button = deleteButtons[i];
    button.addEventListener("click", handleDeleteClick) 
}

// Add an event listener to the "Submit" button to display the modal
const submitButton = document.getElementById('submit-modal');
submitButton.addEventListener('click', displayCheckoutModal);
