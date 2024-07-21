// Открытие модального окна
export function openModal(element) {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', initCloseModalOnEsc);
    document.addEventListener('click', initCloseModalOnOverlayClick);
};
// Закрытие модального окна
export function closeModal(element) {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', initCloseModalOnEsc);
    document.removeEventListener('click', initCloseModalOnOverlayClick);
};

//Инициализация закрытия модального окна по нажатию Esc
function initCloseModalOnEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    };
};

// Инициализация закрытия модального окна по клику на оверлей 
function initCloseModalOnOverlayClick(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closeModal(evt.target);
    };
};
