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

