function generateProductList() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    let productListHTML = '';
    for (let i = 0; i < cart.length; i++) {
        productListHTML += `<tr>
            <td><img src="${cart[i].image}"></td>
            <td>${cart[i].nama}</td>
            <td>${cart[i].quantity}</td>
            <td>${cart[i].harga}</td>
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
}

renderGame();