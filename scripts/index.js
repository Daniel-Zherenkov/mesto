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
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
let popupNameFiled = document.querySelector('.popup__input-filed_name');
let popupAboutFiled = document.querySelector('.popup__input-filed_about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about-self');
const formElement = document.querySelector('.popup__container');
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.addPopup');
const addPopupCloseButton = document.querySelector('.addPopup__close-button');
const addFormElement = document.querySelector('.addPopup__container');






function openPopup() {
    popup.classList.add('popup_opened');
    popupNameFiled.value = profileName.textContent;
    popupAboutFiled.value = profileAbout.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = popupNameFiled.value;
    profileAbout.textContent = popupAboutFiled.value;
    closePopup();
    
}



function addElement(item) {
    const elementTemplate = document.querySelector('#elementCards').content;
    const elementCard = elementTemplate.cloneNode(true);
    const elements = document.querySelector('.elements');
    let elementTitle = elementCard.querySelector('.element__title');
    let elementImage = elementCard.querySelector('.element__image');
    const imgPopup = document.querySelector('.imgPopup');
    let imgPopupImage = document.querySelector('.imgPopup__image');
    let imgPopupTitle = document.querySelector('.imgPopup__title');

    elementTitle.textContent = item.name;
    elementImage.src = item.link;

    elementCard.querySelector('.element__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_fill');
    });

    elementCard.querySelector('.element__trash').addEventListener('click', function(evt) {
        evt.target.parentNode.classList.add('element_deleted');
    });

    elementImage.addEventListener('click', function() {
        imgPopup.classList.add('imgPopup_opened');
        imgPopupImage.src = elementImage.src;
        imgPopupTitle.textContent = elementTitle.textContent});
    
    document.querySelector('.imgPopup__close-button').addEventListener('click', function () {
        imgPopup.classList.remove('imgPopup_opened')
    })

    elements.prepend(elementCard);
    
}

initialCards.forEach( item => {
    addElement(item);
});

function newPlaceFormHandler(evt) {
    evt.preventDefault();
    const placeName = document.querySelector('.addPopup__input-filed_place');
    const link = document.querySelector('.addPopup__input-filed_link')
    const item = {} 
    item.name = placeName.value;
    item.link = link.value;
    addElement(item);
    placeName.value  = '';
    link.value = '';
    addPopup.classList.remove('addPopup_opened')
}


editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', function() {
    addPopup.classList.add('addPopup_opened');
});
addPopupCloseButton.addEventListener('click', function() {
    addPopup.classList.remove('addPopup_opened');
}) 
addFormElement.addEventListener('submit', newPlaceFormHandler);

