document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".modal");
  const callButton = document.querySelector(".call-button");
  const closeButton = document.querySelector(".modal__close");
  const form = document.querySelector(".form");
  const phoneInput = document.querySelector("#phone");
  const nameInput = document.querySelector("#name");

  // Маска для телефона
  const phoneMask = IMask(phoneInput, {
    mask: "+{7} (000) 000-00-00",
  });

  // Валидация формы
  const validateForm = () => {
    let isValid = true;
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    // Валидация имени
    if (name.length < 2) {
      nameInput.classList.add("error");
      isValid = false;
    } else {
      nameInput.classList.remove("error");
    }

    // Валидация телефона
    if (phone.length < 18) {
      phoneInput.classList.add("error");
      isValid = false;
    } else {
      phoneInput.classList.remove("error");
    }

    return isValid;
  };

  // Открытие модального окна
  callButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      nameInput.focus();
    }, 300);
  });

  // Закрытие модального окна
  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    form.reset();
    nameInput.classList.remove("error");
    phoneInput.classList.remove("error");
  };

  closeButton.addEventListener("click", closeModal);
  modal.querySelector(".modal__overlay").addEventListener("click", closeModal);

  // Закрытие по ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Анимация полей формы
  [nameInput, phoneInput].forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      if (!input.value) {
        input.parentElement.classList.remove("focused");
      }
    });

    // Проверяем начальное состояние
    if (input.value) {
      input.parentElement.classList.add("focused");
    }
  });

  // Отправка формы
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
      };

      console.log("Данные формы:", formData);

      // Анимация успешной отправки
      form.classList.add("success");
      setTimeout(() => {
        closeModal();
        form.classList.remove("success");
      }, 1000);
    }
  });
});
