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
const profilePopup = document.querySelector('.profilePopup');
const profilePopupCloseButton = document.querySelector('.profilePopup__close-button');
const profilePopupNameFiled = document.querySelector('.profilePopup__input-filed_name');
const profilePopupAboutFiled = document.querySelector('.profilePopup__input-filed_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about-self');
const formElement = document.querySelector('.profilePopup__container');
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.addPopup');
const addPopupCloseButton = document.querySelector('.addPopup__close-button');
const addFormElement = document.querySelector('.addPopup__container');
const placeName = document.querySelector('.addPopup__input-filed_place');
const link = document.querySelector('.addPopup__input-filed_link');
const elementTemplate = document.querySelector('#elementCards').content;
const elements = document.querySelector('.elements');
const imgPopup = document.querySelector('.imgPopup');
const imgPopupImage = document.querySelector('.imgPopup__image');
const imgPopupTitle = document.querySelector('.imgPopup__title');
const addPopupSaveButton = document.querySelector('#submit')



function openPopup(popup) {
    popup.classList.add('popup-opened');
    popup.addEventListener('click', function(evt) {
        if (evt.target === popup){
        closePopup(popup);
        }
        
    });
    document.addEventListener('keydown', function(evt) {
        if (evt.key === "Escape"){
            closePopup(popup)
            }
    });

 

};


function closePopup(popup) {
    popup.classList.remove('popup-opened');
    
};


function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = profilePopupNameFiled.value;
    profileAbout.textContent = profilePopupAboutFiled.value;
    closePopup(profilePopup);
    
}

editButton.addEventListener('click', function() {
    openPopup(profilePopup);
    profilePopupNameFiled.value = profileName.textContent;
    profilePopupAboutFiled.value = profileAbout.textContent;
});

profilePopupCloseButton.addEventListener('click', function () {
    closePopup(profilePopup)
} );

formElement.addEventListener('submit', formSubmitHandler);



function addElement(item) {
    const elementCard = elementTemplate.cloneNode(true);
    const elementTitle = elementCard.querySelector('.element__title');
    const elementImage = elementCard.querySelector('.element__image');

    elementTitle.textContent = item.name;
    elementImage.src = item.link;
    elementImage.alt = item.name;

    elementCard.querySelector('.element__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_fill');
    });

    const trash = elementCard.querySelector('.element__trash')
    trash.addEventListener('click', function() {
        const element = trash.closest('.element')
        element.remove();
    });

    elementImage.addEventListener('click', function () {
        openPopup(imgPopup);
        imgPopupImage.src = elementImage.src;
        imgPopupTitle.textContent = elementTitle.textContent  
    });
    
    return elementCard;
}

initialCards.forEach( item => {
    elements.append(addElement(item));
    
});



function newPlaceFormHandler(evt) {
    evt.preventDefault();
    const item = {} 
    item.name = placeName.value;
    item.link = link.value;
    elements.prepend(addElement(item));
    closePopup(addPopup);
}


document.querySelector('.imgPopup__close-button').addEventListener('click', function () {
    closePopup(imgPopup);
})

addButton.addEventListener('click', function() {
    openPopup(addPopup);
    placeName.value  = '';
    link.value = '';
    addPopupSaveButton.classList.add('popup-error__disabled-button');
    addPopupSaveButton.setAttribute('disabled', true);
    
});

addPopupCloseButton.addEventListener('click', function() {
    closePopup(addPopup);
});

addFormElement.addEventListener('submit', newPlaceFormHandler);

