let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let popupNameFiled = document.querySelector('.popup__input-filed_name');
let popupAboutFiled = document.querySelector('.popup__input-filed_about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about-self');
let formElement = document.querySelector('.popup__container'); 



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

editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 
