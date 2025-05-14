document.addEventListener('DOMContentLoaded', () => {
  // Настройка высоты первого экрана
  const hero = document.querySelector('.hero');

  const setHeroHeight = () => {
    if (window.innerWidth > 767) {
      hero.style.height = '100vh';
    } else {
      // Для мобильных устройств iOS
      hero.style.height = `${window.innerHeight}px`;
    }
  };

  setHeroHeight();
  window.addEventListener('resize', setHeroHeight);

  // Плавный скролл к секциям
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      // Проверяем, что href не пустой и не равен просто "#"
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          Scrollbar.scrollIntoView(target, {
            offsetTop: 0,
          });
        }
      }
    });
  });
});
