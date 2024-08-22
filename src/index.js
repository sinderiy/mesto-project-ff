import './pages/index.css';
import { createCard, deleteCard, likeCard, updateLikeCount } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getUserInfo, getInitialCards, patchUserInfo, addNewCard, deleteCard as deleteCardApi, putLike, deleteLike, patchUserAvatar } from './scripts/api.js';

const placesList = document.querySelector('.places__list');
const newCardPopup = document.querySelector('.popup_type_new-card');
const typeEditPopup = document.querySelector('.popup_type_edit');
const typeImagePopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const avatarEditPopup = document.querySelector('.popup_type_avatar-edit');
const userAvatar = document.querySelector('.profile__image');
const addButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileFormElement = document.querySelector('form[name="edit-profile"]');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__description');
const avatarElement = document.querySelector('.profile__image');
const newCardFormElement = document.querySelector('form[name="new-place"]');
const placeNameInput = newCardFormElement.querySelector('.popup__input_type_card-name');
const placeUrlInput = newCardFormElement.querySelector('.popup__input_type_url');
const avatarFormElement = document.querySelector('form[name="avatar-edit"]');
const avatarUrlInput = avatarFormElement.querySelector('.popup__input_type_avatar-url');
const popupList = document.querySelectorAll('.popup');
const objConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
let currentUserID = undefined;

// Инициализация закрытия модального окна по нажатию на "Х" 
function initClosePopupOnX(popupWindow) {
    popupWindow.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close')) {
            closeModal(popupWindow);
        };
    });
};

// Открытие изображения карточки
function openCardImage(evt) {
    popupImage.src = evt.currentTarget.src;
    popupImage.alt = evt.currentTarget.alt;
    popupImageCaption.textContent = evt.currentTarget.alt;
    openModal(typeImagePopup);
};

// Изменение аватара пользователя
function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    patchUserAvatar(avatarUrlInput.value)
        .then(() => {
            renderLoading(false, evt.target);
            closeModal(avatarEditPopup);
            avatarElement.style = `background-image: url(${avatarUrlInput.value});`;
            avatarFormElement.reset();
            clearValidation(avatarFormElement, objConfig);
        })
        .catch((error) => {
            console.log(error);
        });
    renderLoading(true, evt.target);
};

// Изменение данных профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    patchUserInfo(nameInput.value, jobInput.value)
        .then(() => {
            renderLoading(false, evt.target);
            closeModal(typeEditPopup);
        })
        .catch((error) => {
            console.log(error);
        });
    renderLoading(true, evt.target);
};

// Добавление новой карточки из данных введенных пользователем
function handleNewImageSubmit(evt) {
    evt.preventDefault();
    addNewCard(placeNameInput.value, placeUrlInput.value)
        .then((newCardInfo) => {
            const newCardObj = {
                likes: [],
                _id: newCardInfo._id,
                name: placeNameInput.value,
                link: placeUrlInput.value,
                owner: {
                    _id: currentUserID
                }
            };
            const newCard = createCard(currentUserID, newCardObj, deleteCardCallback, toggleLikeCallback, openCardImage);
            placesList.prepend(newCard);
            clearValidation(newCardFormElement, objConfig);
            newCardFormElement.reset();
            renderLoading(false, evt.target);
            closeModal(newCardPopup);
        })
        .catch((error) => {
            console.log(error);
        });
    renderLoading(true, evt.target);
};

// Удаление карточки визуально и на сервере
function deleteCardCallback(evt) {
    deleteCard(evt);
    const placeItem = evt.target.closest('.places__item');
    const cardElementID = placeItem.id;
    deleteCardApi(cardElementID);
};

// Переключение лайка на сервере
function toggleLikeCallback(evt) {
    likeCard(evt);
    const placeItem = evt.target.closest('.places__item');
    const cardElementID = placeItem.id;
    if (evt.target.classList.contains('card__like-button_is-active')) {
        putLike(cardElementID)
            .then((cardData) => {
                updateLikeCount(cardData, placeItem);
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        deleteLike(cardElementID)
            .then((cardData) => {
                updateLikeCount(cardData, placeItem);
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

// Отрисовка загрузки при сохранении
function renderLoading(isLoading, formElement) {
    const buttonElement = formElement.querySelector(objConfig.submitButtonSelector);
    if (isLoading) {
        buttonElement.textContent = 'Сохранение...';
    } else {
        buttonElement.textContent = 'Сохранить';
    }
};

// Настройка модальных окон
popupList.forEach((item) => {
    item.classList.add('popup_is-animated');
    initClosePopupOnX(item);
});

// Открытие модального окна "Добавление карточки"
addButton.addEventListener('click', () => {
    openModal(newCardPopup);
    clearValidation(newCardFormElement, objConfig);
});

// Открытие модального окна "Обновить аватар"
userAvatar.addEventListener('click', () => {
    openModal(avatarEditPopup);
    clearValidation(avatarFormElement, objConfig);
});

// Открытие модального окна "Профиль"
profileEditButton.addEventListener('click', () => {
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
    clearValidation(profileFormElement, objConfig);
    openModal(typeEditPopup);
});

avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
newCardFormElement.addEventListener('submit', handleNewImageSubmit);
enableValidation(objConfig);

// Загрузка профиля и создание стартового набора карточек только после выполнения промисов
Promise.all([getUserInfo(), getInitialCards()])
    .then((values) => {
        const userInfo = values[0];
        const initialCards = values[1];
        nameElement.textContent = userInfo.name;
        jobElement.textContent = userInfo.about;
        avatarElement.style = `background-image: url(${userInfo.avatar});`;
        currentUserID = userInfo._id;
        initialCards.forEach((cardData) => {
            const card = createCard(currentUserID, cardData, deleteCardCallback, toggleLikeCallback, openCardImage);
            placesList.append(card);
        });
    })
    .catch((error) => {
        console.log(error);
    });

