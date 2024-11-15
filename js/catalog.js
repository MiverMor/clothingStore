"use strict"
//==========================================
import { 
    showErrorMessage,
    setBasketLocalStorage,
    getBasketLocalStorage,
    checkingRelevanceValueBasket
} from './utils.js';

import { 
    COUNT_SHOW_CARDS_CLICK, 
    ERROR_SERVER,
    NO_PRODUCTS_IN_THIS_CATEGORY
} from './constants.js';

const cards = document.querySelector('.goodlist');
const btnShowCards = document.querySelector('.paginator__show');
let shownCards = COUNT_SHOW_CARDS_CLICK;
let countClickBtnShowCards = 1;
let productsData = [];

// Загрузка товаров
getProducts()

// Обработка клика по кнопке "Показать еще"
btnShowCards.addEventListener('click', sliceArrCards);
// Обработка клика по кнопке "В корзину"
// cards.addEventListener('click', handleCardClick);


// Получение товаров
async function getProducts() {
    try {

        if (!productsData.length) {
            const res = await fetch('../data/products.json');
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            productsData = await res.json();
        }

        if ((productsData.length > COUNT_SHOW_CARDS_CLICK) && 
            btnShowCards.classList.contains('none')) {
            btnShowCards.classList.remove('none');
        }
        
        renderStartPage(productsData);

    } catch (err) {
        showErrorMessage(ERROR_SERVER);
        console.log(err);
    }
}

function renderStartPage(data) {
    if (!data || !data.length) {
        showErrorMessage(NO_PRODUCTS_IN_THIS_CATEGORY);
        return 
    };

    const arrCards = data.slice(0, COUNT_SHOW_CARDS_CLICK);
    createCards(arrCards);

    checkingRelevanceValueBasket(data);

    // const basket = getBasketLocalStorage();
    // checkingActiveButtons(basket);
}


function sliceArrCards() {
    if(shownCards >= productsData.length) return;

    countClickBtnShowCards++;
    const countShowCards = COUNT_SHOW_CARDS_CLICK * countClickBtnShowCards;

    const arrCards = productsData.slice(shownCards, countShowCards);
    createCards(arrCards);
    shownCards = cards.children.length;

    if(shownCards >= productsData.length) {
        btnShowCards.classList.add('none');
    }
}


// function handleCardClick(event) {
//     const targetButton = event.target.closest('.card__add');
//     if (!targetButton) return;

//     const card = targetButton.closest('.card');
//     const id = card.dataset.productId;
//     const basket = getBasketLocalStorage();

//     if (basket.includes(id)) return;

//     basket.push(id);
//     setBasketLocalStorage(basket);
//     checkingActiveButtons(basket);
// }


// function checkingActiveButtons(basket) {
//     const buttons = document.querySelectorAll('.card__add');

//     buttons.forEach(btn => {
//         const card = btn.closest('.card');
//         const id = card.dataset.productId;
//         const isInBasket = basket.includes(id);

//         btn.disabled = isInBasket;
//         btn.classList.toggle('active', isInBasket);
//         btn.textContent = isInBasket ? 'В корзине' : 'В корзину';
//     });
// }


// Рендер карточки
function createCards(data) {
    data.forEach(card => {
        const { id, img, title, price, discount } = card;
        const priceDiscount = price - ((price * discount) / 100);
         // Форматирование цены с разделением тысяч с использованием &nbsp;
    const formattedPrice = price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1&nbsp;');
		const cardItem = 
			`
                <div class="product" data-product-id="${id}">
              <a
                href="card.html?id=${id}"
                class="product__link"
                style="background-image: url(../../img/discounts/${img[0]})"
              >
                <div class="product__title">${title}</div>
                <div class="product__price" product-discount="${discount}">
                  <b>${formattedPrice} RUB</b>
                </div>
              </a>
            </div>
            `
        cards.insertAdjacentHTML('beforeend', cardItem);

	});
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
            let pic = priceBlock.closest(".product__link");
            if (!pic.querySelector('.product__discount')) {
                let discountDiv = document.createElement('div');
                discountDiv.classList.add('product__discount');
                discountDiv.innerHTML = '<span>' + discount + '%</span>';
                pic.appendChild(discountDiv);
            }
        }
});
}




