// Проверка валидности поля
const isValid = (formElement, inputElement, objConfig) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, objConfig);
    } else {
        hideInputError(formElement, inputElement, objConfig);
    }
};

// Показать сообщение об ошибке 
const showInputError = (formElement, inputElement, errorMessage, objConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(objConfig.inputErrorClass);
    errorElement.classList.add(objConfig.errorClass);
    errorElement.textContent = errorMessage;
};

// Скрыть сообщение об ошибке
const hideInputError = (formElement, inputElement, objConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(objConfig.inputErrorClass);
    errorElement.classList.remove(objConfig.errorClass);
    errorElement.textContent = '';
};

// Добавление обработчиков полям формы
const setEventListeners = (formElement, objConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(objConfig.inputSelector));
    const buttonElement = formElement.querySelector(objConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, objConfig);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, objConfig);
            toggleButtonState(inputList, buttonElement, objConfig);
        });
    });
};

// Добавление обработчиков формам
export const enableValidation = (objConfig) => {
    const formList = Array.from(document.querySelectorAll(objConfig.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, objConfig);
    });
};

// Очистка валидации
export const clearValidation = (formElement, objConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(objConfig.inputSelector));
    const buttonElement = formElement.querySelector(objConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, objConfig);
    });
    disableSubmitButton(buttonElement, objConfig);
};

// Проверка наличия невалидного поля
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

// Переключение активности кнопки
const toggleButtonState = (inputList, buttonElement, objConfig) => {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, objConfig);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(objConfig.inactiveButtonClass);
    }
}; 
// Выключение активности кнопки
const disableSubmitButton = (buttonElement, objConfig) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(objConfig.inactiveButtonClass);
};
