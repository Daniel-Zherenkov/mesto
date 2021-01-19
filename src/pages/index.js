import './index.css'
import { Card } from '../components/card.js';
import { FormValidator } from '../components/formValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo';
import Api from '../components/Api'
import PopupWithApprove from '../components/PopupWithApprove';


// const initialCards = [
//     {
//         name: 'Архыз',
//         link:
//             'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
//     },
//     {
//         name: 'Челябинская область',
//         link:
//             'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
//     },
//     {
//         name: 'Иваново',
//         link:
//             'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
//     },
//     {
//         name: 'Камчатка',
//         link:
//             'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
//     },
//     {
//         name: 'Холмогорский район',
//         link:
//             'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
//     },
//     {
//         name: 'Байкал',
//         link:
//             'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
//     },
// ];

// ID OWNER c4b57be845e0c2e7582e746a




// console.log(a)

const editButton = document.querySelector('.profile__edit-button');
const profilePopupNameFiled = document.querySelector('.profile-popup__input-filed_name');
const profilePopupAboutFiled = document.querySelector('.profile-popup__input-filed_about');
const addButton = document.querySelector('.profile__add-button');
const avatarDOM = document.querySelector('.profile__avatar');
const avatarEditButton = document.querySelector('.profile__edit-avatar');
export const imgPopup = document.querySelector('.img-popup');
export const imgPopupImage = document.querySelector('.img-popup__image');
export const imgPopupTitle = document.querySelector('.img-popup__title');
export const imgPopupCloseButton = document.querySelector('.img-popup__close-button');
const avatarNputFiild = document.querySelector('.avatar-edit-popup__input')
const addCardSaveButton = document.querySelector('.add-popup__save-button')
const meID = {}

//Основной экземпляр класса с Апишками
const mainApi = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
    headers: {
        authorization: '8bcd8154-9450-4170-8ca5-d5b37663d1a8',
        'Content-Type': 'application/json'
    }
});

Promise.all([
    mainApi.getProfile(),
    mainApi.getCards()
]).then( values => {
    const [userData, cardData] = values
    //получаем данные для профиля при загрузке страницы
    handleUserInfo.setUserInfo(userData)
    handleUserInfo.setUserAvatar('.profile__avatar', userData)
    meID.id = userData._id
    // для рендера карточек при загрузке страницы
    renderDefaultCards.renderItems(cardData)
}).catch(err => { console.log(err) });



//меняем аватарку
const changeAvatar = new PopupWithForm('.avatar-edit-popup', ({ avatar }) => {
    renderLoading('.add-popup__save-button', true, 'Сохранить')
    mainApi.changeAvatar({ avatar })
    .then(data => {
        data.avatar = avatarDOM.src
        avatarDOM.src = avatarNputFiild.value
        changeAvatar.close()
    }).catch(err => { console.log(err) }).finally(() => renderLoading('.add-popup__save-button', false, 'Сохранить'))
})

changeAvatar.setEventListeners()
avatarEditButton.addEventListener('click', () => {
    renderLoading('.add-popup__save-button', false, 'Сохранить')
    changeAvatar.open()
})

const renderLoading = (selector, isLoading, string) => {
    const saveButton = document.querySelector(selector)
    if (isLoading) {
        saveButton.textContent = saveButton.textContent + '...'
    } else if (!isLoading) {
        saveButton.textContent = string
    }
}
//получаем данные из полей
const handleUserInfo = new UserInfo({ profileNameSelector: '.profile__name', profileAboutSelector: '.profile__about-self' })

//экземпляр класса с формой для попапа редкатирования профиля
const handleProfilePopup = new PopupWithForm('.profile-popup', ({ profileName, profileAbout }) => {
    renderLoading('.profile-popup__save-button', true, 'Сохранить')
    mainApi.changeProfile({ profileName, profileAbout })
    .then(data => handleUserInfo.setUserInfo(data))
    .catch(err => { console.log(err) })
    .finally(() => renderLoading('.profile-popup__save-button', false, 'Сохранить'))
});

//открытие попапа редактирвоания профиля и заполнение 
const addProfileInfo = () => {
    const cardInfo = handleUserInfo.getUserInfo();
    profilePopupNameFiled.value = cardInfo.name;
    profilePopupAboutFiled.value = cardInfo.about;
    renderLoading('.profile-popup__save-button', false, 'Сохранить')
    handleProfilePopup.open();
}
editButton.addEventListener('click', addProfileInfo)
handleProfilePopup.setEventListeners()


const buildCard = (item, bool) => {
    const card = new Card(item, '#elementCards', meID, () => {
        const name = item.name
        const link = item.link
        popupImg.open(name, link)
    },
        (currentCard) => {
            if (currentCard.isLiked()) {
                mainApi.deleteLike(item._id).then(res => {
                    
                    //метод setLikes присваивает цифре под лайком значение длины массива лайков и убирает закрашивание сердечка
                    currentCard.setLikes(res)
                }).catch(err => { console.log(err) })
            } else {
                mainApi.addLike(item._id).then(res => {
                    currentCard.setLikes(res)
                }).catch(err => { console.log(err) })
                // console.log(item.likes)
            }
        },
        () => {
            const approvePopup = new PopupWithApprove('.approve-popup', () => {
                mainApi.deleteCard(item._id).then(res => card.deleteCard() ).catch(err => { console.log(err) })
            })
            approvePopup.setEventListeners()
            approvePopup.open()
        }
    )
    const cardElement = card.generateCard(item.owner._id, meID.id)
    if (bool) {
        renderDefaultCards.addItem(cardElement)
    } else {
        renderDefaultCards.addItemFromPopup(cardElement) 
    }
    
    //проверяем ставил ли текущий пользователь лайк, если да - заливаем цветом сердечко
    if (item.likes.some(element => element._id === meID.id)) {
        cardElement.querySelector('.element__like_icon')
            .classList.add('element__like_fill')
    }
}

//Создание новых карточек из массива с сервера
const renderDefaultCards = new Section({
    renderer: (item) => {
        buildCard(item, true)
    }
}, '.elements')


//попап с картинкой и подписью
const popupImg = new PopupWithImage('.img-popup')
popupImg.setEventListeners()




//Создание новых карточек из формы добавления карточек
const handleCardPopup = new PopupWithForm('.add-popup', ({ placeName, link }) => {
    renderLoading('.add-popup__save-button', true, 'Создать')
    mainApi.addCard({ placeName, link })
    .then(data => {
        buildCard(data, false)
        handleCardPopup.reset()
        popupAddValidator.enableValidation()
        // addCardSaveButton.classList.add('popup-error__disabled-button')
        // addCardSaveButton.setAttribute('disabled', true)
    }).catch(err => { console.log(err) }).finally(() => renderLoading('.profile-popup__save-button', false));

});
handleCardPopup.setEventListeners()



addButton.addEventListener('click', () => {
    renderLoading('.add-popup__save-button', false, 'Создать')
    handleCardPopup.open()

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
popupAddValidator.enableValidation(); // валидация формы


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
popupProfileValidator.enableValidation(); //валидация формы


