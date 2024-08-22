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

  setLike(cardData, currentUserID, likeButton);
  updateLikeCount(cardData, cardElement);
  return cardElement;
};

// Обновление кол-ва лайков на карточке
export function updateLikeCount(cardData, cardElement) {
  if (cardData.likes.length > 0) {
    cardElement.querySelector('.card__likes-count').textContent = cardData.likes.length;
  } else {
    cardElement.querySelector('.card__likes-count').textContent = '';
  }
};

// Закрашивание кнопки лайк при старте
export function setLike(cardData, currentUserID, likeButton) {
  const liked = cardData.likes.some(like => {
    return like._id === currentUserID
  });
  if (liked) {
    likeButton.classList.add('card__like-button_is-active');
  };
}

// Удаление карточки
export function deleteCard(evt) {
  const placeItem = evt.target.closest('.places__item');
  placeItem.remove();
};

// Переключение лайка карточки
export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}; 