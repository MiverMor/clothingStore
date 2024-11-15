
window.addEventListener('scroll', () => {
  document.querySelector('.navbar').classList.toggle('navbar__scrolled', window.scrollY > 10);
});

const bannersSlider = new Swiper('.banners-slider', {
  // Optional parameters
  loop: true,
  autoplay: {
    delay: 10000,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.banners-slider__button--next',
    prevEl: '.banners-slider__button--prev',
  },

});

var discountsSlider = new Swiper(".discounts-slider", {
  loop: true,
  autoplay: {
    delay: 10000,
  },
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 5,
    },
  },
  navigation: {
    nextEl: '.discounts-slider__button--next',
    prevEl: '.discounts-slider__button--prev',
  },
});


$(function() {
  $(document).on("click",'.sort__label',function(e){
		$(this).closest(".sort").toggleClass("_active");
  });


$(document).on("click",".catalog__switcher",function(e){
  let sidebar = $(".catalog__sidebar");

  if (!sidebar.hasClass("show")) {
    sidebar.addClass("show");
  } else {
    sidebar.removeClass("show");
  }
});

// $('.product__price').each(function(){
// 		let priceBlock = $(this);
// 		let discount = priceBlock.attr('product-discount');
// 		if (discount) {
//         // Убираем символ процента и преобразуем скидку в число
//         let discountValue = parseFloat(discount.replace('%', ''));
        
//         // Получаем старую цену из тега <b>
//         let oldPriceText = priceBlock.find('b').text().replace(/\s/g, '').replace('RUB', '');
//         let oldPrice = parseFloat(oldPriceText);
        
//         // Вычисляем новую цену
//         let newPrice = oldPrice - (oldPrice * (discountValue / 100));
        
//         // Оборачиваем старую цену в тег <s>
//         let oldPriceHtml = '<s>' + oldPrice.toLocaleString() + ' RUB</s>';
        
//         // Добавляем новую цену в тег <b>
//         let newPriceHtml = '<b>' + newPrice.toLocaleString() + ' RUB</b>';
        
//         // Обновляем HTML внутри priceBlock
//         priceBlock.html(oldPriceHtml + ' ' + newPriceHtml);

//         // Добавляем элемент со скидкой, если он еще не существует
//         let pic = $(this).closest(".product__link");
//         if (!pic.find('.product__discount').length) {
//             pic.append('<div class="product__discount"><span>' + discount + '</span></div>');
//         }
//     }
// });

$(document).on("click", ".skuprops__btn", function(e) {
  let skupropsSel = $(this); // текущий элемент, на который кликнули

  // Удаляем класс 'active' у всех кнопок
  $(".skuprops__btn").removeClass("skuprops__values--active");

  // Добавляем класс 'active' только выбранному элементу
  skupropsSel.addClass("skuprops__values--active");
});

$(document).on("click", ".color-select__btn", function(e) {
  let colorSel = $(this); // текущий элемент, на который кликнули

  // Удаляем класс 'active' у всех кнопок
  $(".color-select__btn").removeClass("color-select__btn--active");

  // Добавляем класс 'active' только выбранному элементу
  colorSel.addClass("color-select__btn--active");
});


// $('.product__price').each(function(){
// 		let priceBlock = $(this);
// 		let discount = priceBlock.attr('product-discount');
// 		if (discount) {
//         // Убираем символ процента и преобразуем скидку в число
//         let discountValue = parseFloat(discount.replace('%', ''));
        
//         // Получаем старую цену из тега <b>
//         let oldPriceText = priceBlock.find('b').text().replace(/\s/g, '').replace('RUB', '');
//         let oldPrice = parseFloat(oldPriceText);
        
//         // Вычисляем новую цену
//         let newPrice = oldPrice - (oldPrice * (discountValue / 100));
        
//         // Оборачиваем старую цену в тег <s>
//         let oldPriceHtml = '<s>' + oldPrice.toLocaleString() + ' RUB</s>';
        
//         // Добавляем новую цену в тег <b>
//         let newPriceHtml = '<b>' + newPrice.toLocaleString() + ' RUB</b>';
        
//         // Обновляем HTML внутри priceBlock
//         priceBlock.html(oldPriceHtml + ' ' + newPriceHtml);

//         // Добавляем элемент со скидкой, если он еще не существует
//         let title = $(this).closest('.card-product__details').find('.card-product__title'); // Ищем заголовок
//         if (!title.find('.card-product__discount').length) {
//             title.append('<div class="card-product__discount"><span>' + discount + '</span></div>');
//         }
//     }
// });
});