document.addEventListener("DOMContentLoaded", () => {
  const scrollbar = Scrollbar.init(document.body, {
    damping: 0.1,
    thumbMinSize: 20,
    renderByPixel: true,
    alwaysShowTracks: false,
    continuousScrolling: true,
  });

  const header = document.querySelector(".header");
  let lastScroll = 0;

  scrollbar.addListener(({offset}) => {
    if (offset.y > lastScroll) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }
    lastScroll = offset.y;
  });

  const burgerMenu = document.querySelector(".burger-menu");
  const menuOverlay = document.createElement("div");
  menuOverlay.classList.add("menu-overlay");

  const menuContent = document.createElement("div");
  menuContent.classList.add("menu-content");
  menuContent.innerHTML = `
      <nav class="menu-nav">
          <ul>
              <li><a href="#about">О проекте</a></li>
              <li><a href="#apartments">Квартиры</a></li>
              <li><a href="#location">Расположение</a></li>
              <li><a href="#contacts">Контакты</a></li>
          </ul>
      </nav>
  `;

  document.body.appendChild(menuOverlay);
  menuOverlay.appendChild(menuContent);

  burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("active");
    menuOverlay.classList.toggle("active");
    document.body.style.overflow = menuOverlay.classList.contains("active")
      ? "hidden"
      : "";
  });

  menuOverlay.addEventListener("click", (e) => {
    if (e.target === menuOverlay) {
      burgerMenu.classList.remove("active");
      menuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  const videoPreview = document.querySelector(".about__video-preview");
  const videoPlay = document.querySelector(".about__video-play");

  if (videoPreview && videoPlay) {
    const video = document.createElement("video");
    video.src = "https://example.com/video.mp4"; // Замените на реальный URL видео
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.classList.add("about__video-element");

    const videoWrapper = document.createElement("div");
    videoWrapper.classList.add("about__video-wrapper");
    videoWrapper.appendChild(video);

    videoPreview.addEventListener("click", () => {
      videoPreview.innerHTML = "";
      videoPreview.appendChild(videoWrapper);
      video.play();

      const fullscreenButton = document.createElement("button");
      fullscreenButton.classList.add("about__video-fullscreen");
      fullscreenButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M8 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V8M21 8V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H16M16 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V16M3 16V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;

      fullscreenButton.addEventListener("click", () => {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        }
      });

      videoWrapper.appendChild(fullscreenButton);
    });
  }
});
