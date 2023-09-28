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

const deleteButtons = document.querySelectorAll('.delete');
for (let i = 0; i < deleteButtons.length; i++){
    let button = deleteButtons[i];
    button.addEventListener("click", handleDeleteClick) 
}