/* ===== script.js ===== */

// ===== Обработчик ввода имени =====
const confirmButton = document.getElementById("confirmButton");
const inputField = document.querySelector(".form-control input");
const errorMessage = document.getElementById("errorMessage");

confirmButton.addEventListener("click", function() {
  const nameValue = inputField.value.trim();
  if (nameValue === "") {
    errorMessage.textContent = "Ошибка: поле не может быть пустым!";
    errorMessage.style.display = "block";
    return;
  }
  if (nameValue.length > 32) {
    errorMessage.textContent = "Ошибка: введено больше 32 символов!";
    errorMessage.style.display = "block";
    return;
  }
  errorMessage.style.display = "none";
  // Переход к форме выбора пола
  document.querySelector(".name-form-container").style.display = "none";
  document.querySelector(".gender-form-container").style.display = "block";
  console.log("Введённое имя:", nameValue);
});

// ===== Обработчик выбора пола =====
const confirmGenderButton = document.getElementById("confirmGenderButton");
const genderErrorMessage = document.getElementById("genderErrorMessage");

confirmGenderButton.addEventListener("click", function() {
  const selectedGender = document.querySelector('input[name="gender"]:checked');
  if (!selectedGender) {
    genderErrorMessage.textContent = "Ошибка: выберите ваш пол!";
    genderErrorMessage.style.display = "block";
    return;
  }
  genderErrorMessage.style.display = "none";
  console.log("Выбранный пол:", selectedGender.id);
  // Переход к форме выбора возраста
  document.querySelector(".gender-form-container").style.display = "none";
  document.querySelector(".age-form-container").style.display = "block";
});

// ===== Обработчик выбора возраста =====
const ageElem = document.querySelector('.age-form-container input[type="range"]');
const updateAgeValue = function() {
  const newAge = ageElem.value;
  const target = document.querySelector('.age-form-container .age-value');
  target.innerHTML = newAge;
};
ageElem.addEventListener("input", updateAgeValue);

const confirmAgeButton = document.getElementById("confirmAgeButton");
const ageErrorMessage = document.getElementById("ageErrorMessage");
confirmAgeButton.addEventListener("click", function() {
  const age = ageElem.value;
  console.log("Выбранный возраст:", age);
  // Переход к форме выбора веса
  document.querySelector(".age-form-container").style.display = "none";
  document.querySelector(".weight-form-container").style.display = "block";
});

// ===== Обработчик выбора веса =====
const weightElem = document.querySelector('.weight-form-container input[type="range"]');
const updateWeightValue = function() {
  const newWeight = weightElem.value;
  const target = document.querySelector('.weight-form-container .weight-value');
  target.innerHTML = newWeight + '<span class="weight-unit"> кг</span>';
};
weightElem.addEventListener("input", updateWeightValue);

const confirmWeightButton = document.getElementById("confirmWeightButton");
const weightErrorMessage = document.getElementById("weightErrorMessage");
confirmWeightButton.addEventListener("click", function() {
  const weight = weightElem.value;
  console.log("Выбранный вес:", weight);
  // Переход к форме выбора роста
  document.querySelector(".weight-form-container").style.display = "none";
  document.querySelector(".height-form-container").style.display = "block";
});

// ===== Обработчик выбора роста =====
const heightElem = document.querySelector('.height-form-container input[type="range"]');
const updateHeightValue = function() {
  const newHeight = heightElem.value;
  const target = document.querySelector('.height-form-container .height-value');
  target.innerHTML = newHeight + '<span class="height-unit"> см</span>';
};
heightElem.addEventListener("input", updateHeightValue);

const confirmHeightButton = document.getElementById("confirmHeightButton");
const heightErrorMessage = document.getElementById("heightErrorMessage");
confirmHeightButton.addEventListener("click", function() {
  const height = heightElem.value;
  console.log("Выбранный рост:", height);
  // Переход к форме ввода города
  document.querySelector(".height-form-container").style.display = "none";
  document.querySelector(".city-form-container").style.display = "block";
});

// ===== Обработчик ввода города =====
const confirmCityButton = document.getElementById("confirmCityButton");
const cityInputField = document.querySelector(".city-form-container .form-control input");
const cityErrorMessage = document.getElementById("cityErrorMessage");
confirmCityButton.addEventListener("click", function() {
  const cityValue = cityInputField.value.trim();
  if (cityValue === "") {
    cityErrorMessage.textContent = "Ошибка: поле не может быть пустым!";
    cityErrorMessage.style.display = "block";
    return;
  }
  cityErrorMessage.style.display = "none";
  console.log("Введённый город:", cityValue);
  // Переход: скрываем форму ввода города и показываем финальные анимации
  document.querySelector(".city-form-container").style.display = "none";
  document.querySelector(".final-animations-container").style.display = "block";
});

async function sendUserData(data) {
    const userId = localStorage.getItem("telegramUserId");
    if (!userId) {
        console.error("Не найден ID пользователя!");
        return;
    }

    try {
        const response = await fetch(`https://api.telegram.org/botТОКЕН_БОТА/callback_query`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ callback_query: { id: userId, data: JSON.stringify(data) } })
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        console.log("Данные отправлены успешно!");
    } catch (error) {
        console.error("Ошибка отправки данных:", error);
    }
}

// ===== Обработчик завершения регистрации =====
const confirmCityButton = document.getElementById("confirmCityButton");
confirmCityButton.addEventListener("click", function() {
    const userData = {
        name: document.querySelector(".name-form-container input").value.trim(),
        gender: document.querySelector('input[name="gender"]:checked')?.id,
        age: document.querySelector('.age-form-container input[type="range"]').value,
        weight: document.querySelector('.weight-form-container input[type="range"]').value,
        height: document.querySelector('.height-form-container input[type="range"]').value,
        city: document.querySelector(".city-form-container input").value.trim()
    };

    sendUserData(userData);

    // Показываем финальную анимацию
    document.querySelector(".city-form-container").style.display = "none";
    document.querySelector(".final-animations-container").style.display = "block";
});
