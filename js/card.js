"use strict"
//==========================================
import { ERROR_SERVER, PRODUCT_INFORMATION_NOT_FOUND } from './constants.js';
import { 
    showErrorMessage,
    checkingRelevanceValueBasket,
    getBasketLocalStorage,
    setBasketLocalStorage
} from './utils.js';


const wrapper = document.querySelector('.card-product__main');
let productsData = [];



getProducts();

// Обработка клика по кнопке "В корзину"
wrapper.addEventListener('click', handleCardClick);

async function getProducts() {
    try {

        if (!productsData.length) {
            const res = await fetch('../data/products.json');
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            productsData = await res.json();
        }
        
        loadProductDetails(productsData);

    } catch (err) {
        showErrorMessage(ERROR_SERVER);
        console.log(err.message);
    }
}


function getParameterFromURL(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}


function loadProductDetails(data) {

    if (!data || !data.length) {
        showErrorMessage(ERROR_SERVER)
        return;
    }

    checkingRelevanceValueBasket(data);

    const productId = Number(getParameterFromURL('id'));

    if (!productId) {
        showErrorMessage(PRODUCT_INFORMATION_NOT_FOUND)
        return;
    }

    const findProduct = data.find(card => card.id === productId);

    if(!findProduct) {
        showErrorMessage(PRODUCT_INFORMATION_NOT_FOUND)
        return;
    }
    renderInfoProduct(findProduct);

    const basket = getBasketLocalStorage();
    checkingActiveButtons(basket);
    
}

//==============================================//
function handleCardClick(event) {
    const targetButton = event.target.closest('.card-product__actions--btn');
    if (!targetButton) return;

    const card = targetButton.closest('.card-product__details');

    const id = card.dataset.productId;

    
    const basket = getBasketLocalStorage();

    if (basket.includes(id)) return;

    basket.push(id);
    setBasketLocalStorage(basket);
    checkingActiveButtons(basket);
}


function checkingActiveButtons(basket) {
    const buttons = document.querySelectorAll('.card-product__actions--btn');

    buttons.forEach(btn => {
        const card = btn.closest('.card-product__details');
        const id = card.dataset.productId;
        const isInBasket = basket.includes(id);

        

        btn.disabled = isInBasket;
        btn.classList.toggle('card-product__actions--active', isInBasket);
        btn.textContent = isInBasket ? 'В корзине' : 'В корзину';

    });
}
// ===========================================

function renderInfoProduct(product) {
    const { id, img, title, price, discount, size, descr } = product;
    // const priceDiscount = price - ((price * discount) / 100);
     // Форматирование цены с разделением тысяч с использованием &nbsp;
    const formattedPrice = price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1&nbsp;');
    const productItem = 
        `
      
        <div class="swiper card-product__slider" >
          <!-- Additional required wrapper -->
          <div class="swiper-wrapper">
            <!-- Slides -->
            <div class="swiper-slide card-product__item">
              <img
                src="img/discounts/${img[0]}"
                alt="Image: ${title}"
                class="card-product__item--img"
              />
            </div>
            <div class="swiper-slide card-product__item">
              <img
                src="img/discounts/${img[1]}"
                alt="Image: product"
                class="card-product__item--img"
              />
            </div>
            <div class="swiper-slide card-product__item">
              <img
                src="img/discounts/${img[2]}"
                alt="Image: product"
                class="card-product__item--img"
              />
            </div>
          </div>

          <!-- If we need navigation buttons -->
          <button
            class="card-product__button card-product__button--prev"
          ></button>
          <button
            class="card-product__button card-product__button--next"
          ></button>

          <!-- If we need scrollbar -->
          <div class="swiper-scrollbar card-product__slider--scrollbar"></div>
        </div>
        <!-- /.card-product__slider -->

        <div class="card-product__details" data-product-id="${id}">
          <h1 class="card-product__title">
            <span>${title}</span>
            
          </h1>
          <div class="card-product__offer">
            <div class="card-product__price product__price" product-discount="${discount}">
              <b>${formattedPrice} RUB</b>
            </div>
            <!-- /.card-product__price -->

            <div class="skuprops">
              <div class="skuprops__title">
                <span>Размер</span>
                <u>Определить размер</u>
              </div>
              <!-- /.skuprops__title -->
              <div class="skuprops__values">
                <div class="skuprops__btn">${size[0]}</div>
                <div class="skuprops__btn">${size[1]}</div>
                <div class="skuprops__btn">${size[2]}</div>
              </div>
              <!-- /.skuprops__values -->
            </div>
            <!-- /.skuprops -->
           <!-- <div class="card-product__select color-select">
              <ul class="color-select__list">
                <li class="color-select__item">
                  <button
                    class="color-select__btn btn-reset color-select__btn--active"
                    data-color="black"
                    style="background-color: black"
                  ></button>
                </li>
                <li class="color-select__item">
                  <button
                    class="color-select__btn btn-reset"
                    data-color="white"
                    style="background-color: white"
                  ></button>
                </li>
                <li class="color-select__item">
                  <button
                    class="color-select__btn btn-reset"
                    data-color="red"
                    style="background-color: red"
                  ></button>
                </li>
                <li class="color-select__item">
                  <button
                    class="color-select__btn btn-reset"
                    data-color="green"
                    style="background-color: green"
                  ></button>
                </li>
                <li class="color-select__item">
                  <button
                    class="color-select__btn btn-reset"
                    data-color="yellow"
                    style="background-color: yellow"
                  ></button>
                </li>
              </ul>
            </div>
            <!-- /.card-product__color -->
            
            <div class="card-product__actions">
              <button class="button card-product__actions--btn " >
                В корзину
              </button>
            </div>
            <!-- /.card-product__actions -->
          </div>
          <!-- /.card-product__offer -->
          <div class="card-product__info">
            <h3>Описание</h3>
            <p>
              ${descr}
            </p>
          </div>
          <!-- /.card-product__info -->
        </div>
        <!-- /.card-product__details -->
      
        `
    wrapper.insertAdjacentHTML('beforeend', productItem);

    document.querySelectorAll('.product__price').forEach(function(priceBlock) {
    let discount = priceBlock.getAttribute('product-discount');
    if (discount) {
        // Убираем символ процента и преобразуем скидку в число
        let discountValue = parseFloat(discount);
        
        // Получаем старую цену из тега <b>
        let oldPriceText = priceBlock.querySelector('b').textContent.replace(/\s/g, '').replace('RUB', '');
        let oldPrice = parseFloat(oldPriceText);
        
        // Вычисляем новую цену
        let newPrice = oldPrice - (oldPrice * (discountValue / 100));
        
        // Оборачиваем старую цену в тег <s>
        let oldPriceHtml = '<s>' + oldPrice.toLocaleString() + ' RUB</s>';
        
        // Добавляем новую цену в тег <b>
        let newPriceHtml = '<b>' + newPrice.toLocaleString() + ' RUB</b>';
        
        // Обновляем HTML внутри priceBlock
        priceBlock.innerHTML = oldPriceHtml + ' ' + newPriceHtml;

        // Добавляем элемент со скидкой, если он еще не существует
        let title = priceBlock.closest('.card-product__details').querySelector('.card-product__title'); // Ищем заголовок
        if (!title.querySelector('.card-product__discount')) {
            let discountDiv = document.createElement('div');
            discountDiv.classList.add('card-product__discount');
            discountDiv.innerHTML = '<span>' + discount + '%</span>';
            title.appendChild(discountDiv);
        }
    }
});
    const productSlider = new Swiper('.card-product__slider', {
  // Optional parameters
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.card-product__button--next',
    prevEl: '.card-product__button--prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.card-product__slider--scrollbar',
  },
});

}

