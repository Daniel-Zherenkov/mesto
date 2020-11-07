import { Card } from './card.js';
import { FormValidator } from './formValidator.js';

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const editButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.profile-popup');
const profilePopupCloseButton = document.querySelector('.profile-popup__close-button');
const profilePopupNameFiled = document.querySelector('.profile-popup__input-filed_name');
const profilePopupAboutFiled = document.querySelector('.profile-popup__input-filed_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about-self');
const formElement = document.querySelector('.profile-popup__container');
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.add-popup');
const addPopupCloseButton = document.querySelector('.add-popup__close-button');
const addFormElement = document.querySelector('.add-popup__container');
const placeName = document.querySelector('.add-popup__input-filed_place');
const link = document.querySelector('.add-popup__input-filed_link');
const elementTemplate = document.querySelector('#elementCards').content;
const elements = document.querySelector('.elements');
export const imgPopup = document.querySelector('.img-popup');
export const imgPopupImage = document.querySelector('.img-popup__image');
export const imgPopupTitle = document.querySelector('.img-popup__title');
export const imgPopupCloseButton = document.querySelector('.img-popup__close-button')
const addPopupSaveButton = document.querySelector('#submit')



export function openPopup(popup) {
    popup.classList.add('popup-opened');
    document.addEventListener('keydown', function (evt) {
        closeEsc(evt, popup);
    });
};

//Закрытие попапа по клавише Esc
export function closePopup(popup) {
    popup.classList.remove('popup-opened');
    document.removeEventListener('keydown', function (evt) {
        closeEsc(evt, popup);
    });

};

function closeEsc(evt, popup) {
    if (evt.key === "Escape") {
        closePopup(popup)
    }
};

//Закрытие попапа по клику на оверлей
document.addEventListener('click', function (evt) {
    closePopup(evt.target);
});

//отправка формы профиля
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = profilePopupNameFiled.value;
    profileAbout.textContent = profilePopupAboutFiled.value;
    closePopup(profilePopup);

}
formElement.addEventListener('submit', handleFormSubmit);

//открытие и закрытие профиля
editButton.addEventListener('click', function () {
    openPopup(profilePopup);
    profilePopupNameFiled.value = profileName.textContent;
    profilePopupAboutFiled.value = profileAbout.textContent;
});

profilePopupCloseButton.addEventListener('click', function () {
    closePopup(profilePopup)
});



//Создание новых карточек из массива
initialCards.forEach(item => {
    const card = new Card(item, '#elementCards');
    elements.append(card.generateCard());

});



//Создание новых карточек из формы добавления карточек
function handleNewPlaceForm(evt) {
    evt.preventDefault();
    const item = {}
    item.name = placeName.value;
    item.link = link.value;
    const card = new Card(item, '#elementCards');
    elements.append(card.generateCard());
    closePopup(addPopup);
}
addFormElement.addEventListener('submit', handleNewPlaceForm);

addButton.addEventListener('click', function () {
    openPopup(addPopup);
    placeName.value = '';
    link.value = '';
    addInactiveButton(addPopupSaveButton);
});

addPopupCloseButton.addEventListener('click', function () {
    closePopup(addPopup);
});

function addInactiveButton(button) {
    button.classList.add('popup-error__disabled-button');
    button.setAttribute('disabled', true);
}








const popupAddContainer = {
    formSelector: '.add-popup__container',
    inputSelector: '.add-popup__input-filed',
    errorSelector: '.popup-error__text-input-error',
    submitButtonSelector: '.add-popup__save-button',
    inactiveButtonClass: 'popup-error__disabled-button',
    inputErrorClass: 'popup-error__input-error',
    errorClass: 'popup-error__text-input-error'
}
const popupAddValidator = new FormValidator(popupAddContainer, '.add-popup__container')
popupAddValidator.enableValidation();

const popupProfileContainer = {
    formSelector: '.profile-popup__container',
    inputSelector: '.profile-popup__input-filed',
    errorSelector: '.popup-error__text-input-error',
    submitButtonSelector: '.profile-popup__save-button',
    inactiveButtonClass: 'popup-error__disabled-button',
    inputErrorClass: 'popup-error__input-error',
    errorClass: 'popup-error__text-input-error'
}
const popupProfileValidator = new FormValidator(popupProfileContainer, '.profile-popup__container')
popupProfileValidator.enableValidation();

