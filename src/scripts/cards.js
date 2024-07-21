// Функции лайка карточки
// Функции создания,добавления и удаления карточки
// Функции для работы с карточками

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

// Создание карточки
export function createCard(cardData, deleteCallback, likeCallback, openCardImageCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCallback);
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeCallback);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', openCardImageCallback);

  return cardElement;
};

// Удаление карточки
export function deleteCard(evt) {
  const deleteButton = evt.target;
  const placeItem = deleteButton.closest('.places__item');
  placeItem.remove();
};

// Лайк карточки
export function likeCard(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle('card__like-button_is-active');
}; 
