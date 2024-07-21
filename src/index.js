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
const profileFormElement = document.querySelector('form[name="edit-profile"]');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__description');
const newCardFormElement = document.querySelector('form[name="new-place"]');
const placeNameInput = newCardFormElement.querySelector('.popup__input_type_card-name');
const placeUrlInput = newCardFormElement.querySelector('.popup__input_type_url');
const popupList = document.querySelectorAll('.popup');

// Настройка модальных окон
popupList.forEach((item) => {
    item.classList.add('popup_is-animated');
    initClosePopupOnX(item);
});

// Инициализация закрытия модального окна по нажатию на "Х" 
function initClosePopupOnX(popupWindow) {
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
    popupImage.alt = evt.currentTarget.alt;
    popupImageCaption.textContent = evt.currentTarget.alt;
    openModal(typeImagePopup);
};

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// Изменение данных профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    closeModal(typeEditPopup);
};

newCardFormElement.addEventListener('submit', handleNewImageSubmit);

// Добавление новой карточки из данных введенных пользователем
function handleNewImageSubmit(evt) {
    evt.preventDefault();
    const newCardObj = {
        name: placeNameInput.value,
        link: placeUrlInput.value,
    };
    const newCard = createCard(newCardObj, deleteCard, likeCard, openCardImage);
    placesList.prepend(newCard);
    newCardFormElement.reset();
    closeModal(newCardPopup);
};

// Создание стартового набора карточек
initialCards.forEach((item) => {
    const card = createCard(item, deleteCard, likeCard, openCardImage);
    placesList.append(card);
});