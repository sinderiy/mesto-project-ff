import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
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
const popupList = document.querySelectorAll('.popup');

// Настройка модальных окон
popupList.forEach((item) => {
    item.classList.add('popup_is-animated');
    closePopupOnX(item);
});

// Закрытие модального окна по клику на "Х" 
function closePopupOnX(popupWindow) {
    popupWindow.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close')) {
            closeModal(popupWindow);
        };
    });
};

// Открытие модального окна "Добавление карточки"
addButton.addEventListener('click', () => {
    openModal(newCardPopup);
});

// Открытие модального окна "Профиль"
profileEditButton.addEventListener('click', () => {
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
    openModal(typeEditPopup);
});

// Открытие изображения карточки
function openCardImage(evt) {
    popupImage.src = evt.currentTarget.src;
    popupImageCaption.textContent = evt.currentTarget.alt;
    openModal(typeImagePopup);
};

formElement.addEventListener('submit', handleFormSubmit);

// Изменение данных профиля
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
    const newCardObj = {};
    newCardObj.name = placeNameInput.value;
    newCardObj.link = placeUrlInput.value;
    const newCard = createCard(newCardObj, deleteCard, likeCard, openCardImage);
    placesList.prepend(newCard);
    placeNameInput.value = "";
    placeUrlInput.value = "";
    closeModal(newCardPopup);
};

// Создание стартового набора карточек
initialCards.forEach((item) => {
    const card = createCard(item, deleteCard, likeCard, openCardImage);
    placesList.append(card);
});