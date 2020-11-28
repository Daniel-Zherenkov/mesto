import './index.css'
import { Card } from '../components/card.js';
import { FormValidator } from '../components/formValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo';

const initialCards = [
    {
        name: 'Архыз',
        link:
            'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
        name: 'Челябинская область',
        link:
            'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
        name: 'Иваново',
        link:
            'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
        name: 'Камчатка',
        link:
            'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
        name: 'Холмогорский район',
        link:
            'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
        name: 'Байкал',
        link:
            'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    },
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
export const imgPopupCloseButton = document.querySelector('.img-popup__close-button');
const addPopupSaveButton = document.querySelector('#submit');







//получаем данные из полей
const handleUserInfo = new UserInfo({ profileNameSelector: '.profile__name', profileAboutSelector: '.profile__about-self' })

//экземпляр класса с формой для попапа редкатирования профиля
const handleProfilePopup = new PopupWithForm('.profile-popup', ({ profileName, profileAbout }) => {
    handleUserInfo.setUserInfo({ profileName, profileAbout })
});

//открытие попапа редактирвоания профиля и заполнение 
const addProfileInfo = () => {
    const cardInfo = handleUserInfo.getUserInfo();
    profilePopupNameFiled.value = cardInfo.name;
    profilePopupAboutFiled.value = cardInfo.about;
    handleProfilePopup.open();
    popupProfileValidator.enableValidation(); //валидация формы
}
editButton.addEventListener('click', addProfileInfo)
handleProfilePopup.setEventListeners() 




//Создание новых карточек из массива
const renderDefaultCards = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#elementCards', () => {
            const name = item.name
            const link = item.link
            popupImg.open(name, link)
        })
        const cardElement = card.generateCard()
        renderDefaultCards.addItem(cardElement)
    }
}, '.elements')

renderDefaultCards.renderItems();

//попап с картинкой и подписью
const popupImg = new PopupWithImage('.img-popup')
popupImg.setEventListeners()

//попап с формой добавления карточки
const handleCardPopup = new PopupWithForm('.add-popup', ({ placeName, link }) => {
    addNewCard({ name: placeName, link: link })
});
handleCardPopup.setEventListeners()

//Создание новых карточек из формы добавления карточек
const addNewCard = (data) => {
    const card = new Card(data, '#elementCards', () => {
        const name = data.name
        const link = data.link
        popupImg.open(name, link)
    });
    renderDefaultCards.addItem(card.generateCard());
}

addButton.addEventListener('click', () => {
    handleCardPopup.open()
    popupAddValidator.enableValidation(); // валидация формы
});





const popupAddContainer = {
    formSelector: '.add-popup__container',
    inputSelector: '.add-popup__input-filed',
    errorSelector: '.popup-error__text-input-error',
    submitButtonSelector: '.add-popup__save-button',
    inactiveButtonClass: 'popup-error__disabled-button',
    inputErrorClass: 'popup-error__input-error',
    errorClass: 'popup-error__text-input-error',
};
const popupAddValidator = new FormValidator(popupAddContainer, '.add-popup__container');


const popupProfileContainer = {
    formSelector: '.profile-popup__container',
    inputSelector: '.profile-popup__input-filed',
    errorSelector: '.popup-error__text-input-error',
    submitButtonSelector: '.profile-popup__save-button',
    inactiveButtonClass: 'popup-error__disabled-button',
    inputErrorClass: 'popup-error__input-error',
    errorClass: 'popup-error__text-input-error',
};
const popupProfileValidator = new FormValidator(popupProfileContainer, '.profile-popup__container');


