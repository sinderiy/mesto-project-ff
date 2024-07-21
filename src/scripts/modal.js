// Работа модальных окон
// Экспорт функций "openModal" и "closeModal", в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие

export function openModal(element) {
    element.classList.add('popup_is-opened');
}

export function closeModal(element) {
    element.classList.remove('popup_is-opened');
}

