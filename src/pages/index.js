import './index.css'
import { Card } from '../components/card.js';
import { FormValidator } from '../components/formValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo';
import Api from '../components/Api'
import PopupWithApprove from '../components/PopupWithApprove';


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

// ID OWNER c4b57be845e0c2e7582e746a


// const a = fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards', {
//   headers: {
//     authorization: '8bcd8154-9450-4170-8ca5-d5b37663d1a8'
//   }
// }).then(res => res.json()).then(data => {return data})
// console.log(a)

const editButton = document.querySelector('.profile__edit-button');
const profilePopupNameFiled = document.querySelector('.profile-popup__input-filed_name');
const profilePopupAboutFiled = document.querySelector('.profile-popup__input-filed_about');
const addButton = document.querySelector('.profile__add-button');
const avatarDOM = document.querySelector('.profile__avatar');
export const imgPopup = document.querySelector('.img-popup');
export const imgPopupImage = document.querySelector('.img-popup__image');
export const imgPopupTitle = document.querySelector('.img-popup__title');
export const imgPopupCloseButton = document.querySelector('.img-popup__close-button');

//получаем данные для прфоиля при загрузке страницы
const apiGET = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
    headers: {
        authorization: '8bcd8154-9450-4170-8ca5-d5b37663d1a8',
        'Content-Type': 'application/json'
    }
});
apiGET.getProfile()

//меняем аватарку
const changeAvatar = new PopupWithForm('.avatar-edit-popup', ({avatar}) => {
    renderLoading('.add-popup__save-button', true, 'Сохранить')
    const changeAvatarApi = new Api({
        baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
        method: 'PATCH',
        headers: {
            authorization: '8bcd8154-9450-4170-8ca5-d5b37663d1a8',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatar
        })
    })
    const avatarNputFiild = document.querySelector('.avatar-edit-popup__input')
    changeAvatarApi.changeAvatar().then(data => {
        
        data.avatar = avatarDOM.src
        
    }).catch(err => { console.log(err) }).finally(() => renderLoading('.add-popup__save-button', false, 'Сохранить'))
    avatarDOM.src = avatarNputFiild.value
})
avatarDOM.addEventListener('click', () => {
    renderLoading('.add-popup__save-button', false, 'Сохранить')
    changeAvatar.setEventListeners()
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
    const apiPatchProfile = new Api({
        baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
        method: 'PATCH',
        headers: {
            authorization: '8bcd8154-9450-4170-8ca5-d5b37663d1a8',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: profileName,
            about: profileAbout
        })
    })
    apiPatchProfile.changeProfile().then(data => handleUserInfo.setUserInfo(data)).catch(err => { console.log(err) }).finally(() => renderLoading('.profile-popup__save-button', false, 'Сохранить'))
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


//Создание новых карточек из массива с сервера
const renderDefaultCards = new Section({
    // items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#elementCards', () => {
            const name = item.name
            const link = item.link
            popupImg.open(name, link)
        },
        () => {
            //проверяем есть ли в массиве мой айди
            if(item.likes.some(element => element._id === 'c4b57be845e0c2e7582e746a')) {
                //если есть отправляю запрос на удаление
                const apiLikeCard = new Api({
                    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
                    method: 'DELETE',
                    headers: {
                        authorization: '8bcd8154-9450-4170-8ca5-d5b37663d1a8',
                        'Content-Type': 'application/json'
                    }
                })
                apiLikeCard.toggleLike(item._id).then( res => {
                    //метод delLikes присваивает цифре под лайком значение длины массива лайков и убирает закрашивание сердечка
                    card.delLike(res)
                    }).catch(err => { console.log(err) })
            } else {
                //если моего айдишника нет, то отправляю запрос PUT  
                const apiLikeCard = new Api({
                    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
                    method: 'PUT',
                    headers: {
                        authorization: '8bcd8154-9450-4170-8ca5-d5b37663d1a8',
                        'Content-Type': 'application/json'
                    }
                })
                    apiLikeCard.toggleLike(item._id).then( res => {
                        //метод addLikes присваивает цифре под лайком значение длины массива лайков и добавляет закрашивание сердечка
                        card.addLike(res)
                    // card.likesCounter.textContent = res.likes.length
                    }).catch(err => { console.log(err) })
                    
                
            }
        },
        () => {
            const approvePopup = new PopupWithApprove('.approve-popup', () => {
                
                const delCard = new Api({
                    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
                    method: 'DELETE',
                    headers: {
                        authorization: '8bcd8154-9450-4170-8ca5-d5b37663d1a8',
                        'Content-Type': 'application/json'
                    }
                })
                delCard.deleteCard(item._id).catch(err => { console.log(err) })
                card.trashCard.remove()
            })
            approvePopup.setEventListeners()
            approvePopup.open()
        }
        )
        const cardElement = card.generateCard(item.owner._id)
        renderDefaultCards.addItem(cardElement)
        card.likesCounter.textContent = item.likes.length
        
        if(item.likes.some(element => element._id === 'c4b57be845e0c2e7582e746a')) {
            card._element.querySelector('.element__like_icon')
            .classList.add('element__like_fill')
        }
    }
}, '.elements')

apiGET.getCards().then(data => { 
    // console.log(data)
    renderDefaultCards.renderItems(data) 
}).catch(err => { console.log(err) });


//попап с картинкой и подписью
const popupImg = new PopupWithImage('.img-popup')
popupImg.setEventListeners()




//попап с формой добавления карточки
const handleCardPopup = new PopupWithForm('.add-popup', ({ placeName, link }) => {
    renderLoading('.add-popup__save-button', true, 'Создать')
    const apiPostCard = new Api({
        baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
        method: 'POST',
        headers: {
            authorization: '8bcd8154-9450-4170-8ca5-d5b37663d1a8',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: placeName,
            link: link
        })
    })
    apiPostCard.addCard().then(data => {
        addNewCard(data)
    }).catch(err => { console.log(err) }).finally(() => renderLoading('.profile-popup__save-button', false));

});
handleCardPopup.setEventListeners()


// console.log(apiPostCard.addCard())

//Создание новых карточек из формы добавления карточек
const addNewCard = (data) => {
    const card = new Card(data, '#elementCards',
        () => {
            const name = data.name
            const link = data.link
            popupImg.open(name, link)
            
        },
        () => {
            const apiPostCard = new Api({
                baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
                method: 'POST',
                headers: {
                    authorization: '8bcd8154-9450-4170-8ca5-d5b37663d1a8',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: data.name,
                    link: data.link
                })
            })
            apiPostCard.addCard().then( res => {
                card.likesCounter.textContent = res.likes.length
                }).catch(err => { console.log(err) })
        }
    );
    card.likesCounter.textContent = data.likes.length
    renderDefaultCards.addItemFromPopup(card.generateCard());
}

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


