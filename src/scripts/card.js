// Создание карточки
export function createCard(cardData, deleteCallback, likeCallback, openCardImageCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCallback);
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeCallback);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', openCardImageCallback);

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  const likeCountElement = cardElement.querySelector('.card__likes-count');
  if (cardData.likes.length > 0) {
    likeCountElement.textContent = cardData.likes.length;
  }
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