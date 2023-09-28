document.addEventListener("DOMContentLoaded", function()
{

function generateProductList() {
    const nama = localStorage.getItem("nama");
    const image = localStorage.getItem("image");
    const count = localStorage.getItem("count");
    const harga = localStorage.getItem("harga");
    let productListHTML = "";

    productListHTML += `<tr>
              
    <td><img src="${image}"></td>
   <td>${nama}</td>
   <td>${count}</td>
   <td>${harga}</td>
   <td>
       <button class="button-29" id="penambahan">+</button>
       <button class="button-29" id="pengurangan">-</button>
       <button class="button-29" id="delete">delete</button> 
   </td> 
</tr>`

return productListHTML;
}



function renderGame(){
    const productList = document.querySelector(".product-list")
    const produclistHTML = generateProductList();

    productList.innerHTML = produclistHTML;
}
renderGame();
});