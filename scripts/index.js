let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let popupNameFiled = document.querySelector('.popup__name-filed');
let popupAboutFiled = document.querySelector('.popup__about-filed');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about-self');

function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

popupNameFiled.value = profileName.textContent;
popupAboutFiled.value = profileAbout.textContent;

let formElement = document.querySelector('.popup__container'); 
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = popupNameFiled.value 
    profileAbout.textContent = popupAboutFiled.value
    closePopup()
    
}

formElement.addEventListener('submit', formSubmitHandler); 