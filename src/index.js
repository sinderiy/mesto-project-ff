import './blocks/index.css';

import {initialCards} from './scripts/cards.js';

function createCard(cardData, deleteCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCallback);

    return cardElement;
};

function deleteCard(event) {
    const deleteButton = event.target;
    const placeItem = deleteButton.closest('.places__item');
    placeItem.remove();
};

const placesList = document.querySelector('.places__list');

initialCards.forEach(function (item) {
    const card = createCard(item, deleteCard);
    placesList.append(card);
});


