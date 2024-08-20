// Создание карточки
export function createCard(currentUserID, cardData, deleteCallback, likeCallback, openCardImageCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (currentUserID === cardData.owner._id) {
    deleteButton.addEventListener('click', deleteCallback);
  } else {
    deleteButton.style.display = "none";
  }
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeCallback);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', openCardImageCallback);
  
  cardElement.id = cardData._id;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  if (cardData.likes.length > 0) {
    cardElement.querySelector('.card__likes-count').textContent = cardData.likes.length;
  }
  return cardElement;
};

// Удаление карточки
export function deleteCard(evt) {
  const placeItem = evt.target.closest('.places__item');
  placeItem.remove();
};

// Лайк карточки
export function likeCard(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle('card__like-button_is-active');
}; 