// Открытие модального окна
export function openModal(element) {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalOnEsc);
    document.addEventListener('click', closeModalOnOverlayClick);
};
// Закрытие модального окна
export function closeModal(element) {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalOnEsc);
    document.removeEventListener('click', closeModalOnOverlayClick);
};

//Закрытие модального окна по нажатию Esc
function closeModalOnEsc(evt) {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (evt.key === "Escape") {
        closeModal(openedPopup);
    };
};

// Закрытие модального окна по клику на оверлей 
function closeModalOnOverlayClick(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closeModal(evt.target);
    };
};
