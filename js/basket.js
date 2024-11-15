"use strict"
//==========================================
import { ERROR_SERVER, NO_ITEMS_CART } from './constants.js';
import { 
    showErrorMessage,
    setBasketLocalStorage,
    getBasketLocalStorage,
    checkingRelevanceValueBasket
} from './utils.js';

const cart = document.querySelector('.cart');
let productsData = [];


getProducts();
cart.addEventListener('click', delProductBasket);


async function getProducts() {
    try {

        if (!productsData.length) {
            const res = await fetch('../data/products.json');
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            productsData = await res.json();
        }
        
        loadProductBasket(productsData);

    } catch (err) {
        showErrorMessage(ERROR_SERVER);
        console.log(err.message);
    }
}

function loadProductBasket(data) {
    cart.textContent = '';

    if (!data || !data.length) {
        showErrorMessage(ERROR_SERVER)
        return;
    }

    checkingRelevanceValueBasket(data);
    const basket = getBasketLocalStorage();

    if(!basket || !basket.length) {
        showErrorMessage(NO_ITEMS_CART)
        return;
    }

    const findProducts = data.filter(item => basket.includes(String(item.id)));

    if(!findProducts.length) {
        showErrorMessage(NO_ITEMS_CART)
        return;
    }

    renderProductsBasket(findProducts);
}

function delProductBasket(event) {
    const targetButton = event.target.closest('.cart__del-card');
    if (!targetButton) return;

    const card = targetButton.closest('.cart__product');
    const id = card.dataset.productId;
    const basket = getBasketLocalStorage();

    const newBasket = basket.filter(item => item !== id);
    setBasketLocalStorage(newBasket);

    getProducts()
}

function renderProductsBasket(arr) {
    arr.forEach(card => {
        const { id, img, title, price, discount, size } = card;
        const priceDiscount = price - ((price * discount) / 100);

        const formattedPrice = price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1&nbsp;');
        const formattedPriceDis = priceDiscount.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1&nbsp;');

        const cardItem = 
        `
        <div class="cart__product" data-product-id="${id}">
            <div class="cart__img">
              <img src="img/discounts/${img[0]}" alt="Image: ${title}" />
            </div>
            <!-- /.cart__img -->
            <div class="cart__info">
              <div class="cart__title">${title}</div>
              <!-- /.cart__title -->
              <div class="cart__skuprops">
                <span
                  >Размер:
                  <b>${size}</b>
                </span>
              </div>
              <!-- /.cart__skuprops -->
               <!-- <div class="cart__color">
                <span>Цвет: 
                  <b>black</b>
                </span>
               </div> -->
               <!-- /.cart__color -->
            </div>
            <!-- /.cart__info -->
            <div class="cart__price" product-discount="${discount}">
              <span>${formattedPriceDis} RUB</span>
            </div>
            <!-- /.cart__price -->
            <div class="cart__block-btns">
              <div class="cart__minus">-</div>
              <div class="cart__count">1</div>
              <div class="cart__plus">+</div>
            </div>
            <!-- /.cart__block-btns -->
            <div class="cart__price-total">
              <b>3&nbsp;000 RUB</b>
            </div>
            <!-- /.cart__price-total -->
            <div class="cart__del-card">X</div>
          </div>
          <!-- /.cart__product -->
        `;

        cart.insertAdjacentHTML('beforeend', cardItem);
    });
}