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