// Navbar Media Queries 
let navbar = document.querySelector(".navbar");
document.querySelector("#menu-btn").onclick = () => {
    navbar.classList.toggle("active");
    searchForm.classList.remove("active");
    cartItem.classList.remove("active");
}

// Icon Search 
let searchForm = document.querySelector(".search-form");

document.querySelector("#search-btn").onclick = () => {
    document.getElementById("search-box").focus();
    searchForm.classList.toggle("active");
    navbar.classList.remove("active");
    cartItem.classList.remove("active");
}

// Cart Items
let cartItem = document.querySelector(".cart-items-container");

document.querySelector("#cart-btn").onclick = () => {
    cartItem.classList.toggle("active");
    navbar.classList.remove("active");
    searchForm.classList.remove("active");
}

// When Scroll 
window.onscroll = () => {
    navbar.classList.remove("active");
    searchForm.classList.remove("active");
    cartItem.classList.remove("active");
}


// --- Start Edition 6/1/2020 --- ///
/// Variables
let shoppingIcon = document.querySelector('.shopping');
let itemsContainer = document.querySelector('.cart-items-container .items');
let productsContainer = document.querySelector(".products .box-container");
let searchSection = document.querySelector('.search-section');
// Globle Variables
let dataProducts = [];
// Function Get Product From JSON File
function getProducts() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let productsObject = JSON.parse(this.responseText);
            let prodectsCount = productsObject.length;
            //
            showProducts(productsObject, prodectsCount);
            for (let i = 0; i < prodectsCount; i++) {
                dataProducts.push(productsObject[i]);
            }
        }
    }
    myRequest.open("GET", "products.json", true);
    myRequest.send();
}
getProducts();

let dataShoppingArr;
if (window.localStorage.product != null) {
    dataShoppingArr = JSON.parse(localStorage.product);
} else {
    dataShoppingArr = [];
}

// Send To Cart Function
function sendToCart(index) {
    let newProduct = {
        title: dataProducts[index].title,
        img: dataProducts[index].img,
        price: dataProducts[index].price,
    }
    dataShoppingArr.push(newProduct);
    // Save In LocalStorage
    localStorage.setItem('product', JSON.stringify(dataShoppingArr)); 
    showDataShopping();
}

// Show Data Shopping
function showDataShopping() {
    let item = '';
    for (let i = 0; i < dataShoppingArr.length; i++) {
        item += `
        <div class="cart-item">
            <span onclick="deleteItem(${i})" class="fas fa-times"></span>
            <img src="${dataShoppingArr[i].img}" alt="">
            <div class="content">
                <h3>${dataShoppingArr[i].title}</h3>
                <div class="price">${dataShoppingArr[i].price}</div>
            </div>
        </div>
    `;
    }
    itemsContainer.innerHTML = item;
    // If No Items In Cart
    if (dataShoppingArr.length === 0) {
        itemsContainer.innerHTML = `
            <a href="#products" class="btn">Checkout Now</a>
        `
    }
}
showDataShopping();

function showProducts(obj, count) {
    let product = '';
    for (let i = 0; i < 4; i++) {
        product += `
            <div class="box">
                <div class="icons">
                    <a onclick="sendToCart(${i})" title="Shopping" class="fa fa-shopping-cart shopping"></>
                    <a title="Favourite" class="fa fa-heart favourite"></a>
                    <a title="Views" class="fa fa-eye views"></a>
                </div>
                <div class="image">
                    <img src="${obj[i].img}" alt="">
                </div>
                <div class="content">
                    <h3>${obj[i].title}</h3>
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>
                    <div class="price">${obj[i].price}<span>20.99</span></div>
                </div>
            </div>
        `
    }
    productsContainer.innerHTML += product;
}
// showProducts();

// Delete Item From Cart Function
function deleteItem(index) {
    dataShoppingArr.splice(index, 1);
    localStorage.product = JSON.stringify(dataShoppingArr);
    showDataShopping(); 
}

// Search Function 
let searchInput = document.getElementById('search-box');
let searchIcon = document.getElementById('search-icon');

// searchIcon.addEventListener('click', function () {
//     search(searchInput.value);
// });

searchInput.addEventListener('input', function () {
    window.scrollTo(0, 0);
    search(searchInput.value);
});
function search(value) {
    if (searchInput.value != '') {
        searchSection.innerHTML = '';
        let productSearch = '';
        for (let i = 0; i < dataProducts.length; i++) {
            if (dataProducts[i].title.toLowerCase().includes(value.toLowerCase())) {
                productSearch += `
                            <div class="box">
                                <div class="icons">
                                    <a onclick="sendToCart(${i})" title="Shopping" class="fa fa-shopping-cart shopping"></>
                                    <a title="Favourite" class="fa fa-heart favourite"></a>
                                    <a title="Views" class="fa fa-eye views"></a>
                                </div>
                                <div class="image">
                                    <img src="${dataProducts[i].img}" alt="">
                                </div>
                                <div class="content">
                                    <h3>${dataProducts[i].title}</h3>
                                    <div class="stars">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                    <div class="price">${dataProducts[i].price}<span>20.99</span></div>
                                </div>
                            </div>
                    `
                }
            }
            if (productSearch != '') {
                searchSection.innerHTML = `
                <div style="height: 100vh; overflow-y: auto;" class="products">
                <h1 style="margin-top: 120px;" id="products" class="heading">Search <span>Results</span></h1>
                    <div class="box-container">
                        ${productSearch}
                    </div>
                </div>
                `;
            } else {
                searchSection.innerHTML = `
                    <div style="height: 100vh; overflow-y: auto;" class="products">
                    <h1 style="margin-top: 120px;" id="products" class="heading">Search <span>Results</span></h1>
                        <h1 style="margin-top: 250px; color: red" id="products" class="heading">No Items Found</h1>
                    </div>
                    `;
            }
    } else {
        searchSection.innerHTML = '';
    }
}
// --- End Edition 6/1/2020 --- ///

