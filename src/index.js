// Объявления и инициализация глобальных констант и переменных с DOM-элементами страницы
// Обработчики событий (при открытии и закрытии попапов; при отправке форм 
// Обработчик, открывающий попап при клике по изображению карточки
// Вызовы других функций, подключённых из созданных модулей

import './pages/index.css';
import { initialCards, createCard, deleteCard, likeCard } from './scripts/cards.js';
import { openModal, closeModal } from './scripts/modal.js';

const placesList = document.querySelector('.places__list');
const newCardPopup = document.querySelector('.popup_type_new-card');
const typeEditPopup = document.querySelector('.popup_type_edit');
const typeImagePopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const addButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('form[name="edit-profile"]');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__description');
const newCardFormElement = document.querySelector('form[name="new-place"]');
const placeNameInput = newCardFormElement.querySelector('.popup__input_type_card-name');
const placeUrlInput = newCardFormElement.querySelector('.popup__input_type_url');
const newCardObj = {};

newCardPopup.classList.add('popup_is-animated');
typeEditPopup.classList.add('popup_is-animated');
typeImagePopup.classList.add('popup_is-animated');

closePopupOnX(newCardPopup);
closePopupOnX(typeEditPopup);
closePopupOnX(typeImagePopup);

// Закрытие модального окна по клику на Х 
function closePopupOnX(popupWindow) {
    popupWindow.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close')) {
            closeModal(popupWindow);
        };
    });
};

// Закрытие модального окна по клику на оверлей 
document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    };
});

// Открытие модального окна "Добавление карточки"
addButton.addEventListener('click', () => {
    openModal(newCardPopup);
    document.addEventListener('keydown', closeNewCardPopupOnEscape);
});
// Открытие модального окна "Профиль"
profileEditButton.addEventListener('click', () => {
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
    openModal(typeEditPopup);
    document.addEventListener('keydown', closeTypeEditPopupOnEscape);
});
// Открытие изображения карточки
function openCardImage(evt) {
    popupImage.src = evt.currentTarget.src;
    popupImageCaption.textContent = evt.currentTarget.alt;
    openModal(typeImagePopup);
};
// Закрытие модального окна "Добавление карточки" по нажатию ESC
function closeNewCardPopupOnEscape(evt) {
    if (evt.key === "Escape") {
        closeModal(newCardPopup);
        document.removeEventListener('keydown', closeNewCardPopupOnEscape);
    };
};
// Закрытие модального окна "Профиль" по нажатию ESC
function closeTypeEditPopupOnEscape(evt) {
    if (evt.key === "Escape") {
        closeModal(typeEditPopup);
        document.removeEventListener('keydown', closeTypeEditPopupOnEscape);
    };
};
// Создание стартового набора карточек
initialCards.forEach(function (item) {
    const card = createCard(item, deleteCard, likeCard, openCardImage);
    placesList.append(card);
});

formElement.addEventListener('submit', handleFormSubmit);
// Сохранение новых данных профиля
function handleFormSubmit(evt) {
    evt.preventDefault();
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    closeModal(typeEditPopup);
};

newCardFormElement.addEventListener('submit', handleNewImageSubmit);
// Добавление новой карточки из данных введенных пользователем
function handleNewImageSubmit(evt) {
    evt.preventDefault();
    newCardObj.name = placeNameInput.value;
    newCardObj.link = placeUrlInput.value;
    const newCard = createCard(newCardObj, deleteCard, likeCard, openCardImage);
    placesList.prepend(newCard);
    placeNameInput.value = "";
    placeUrlInput.value = "";
    closeModal(newCardPopup);
};
