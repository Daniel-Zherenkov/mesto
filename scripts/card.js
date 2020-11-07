import { openPopup, closePopup, imgPopup, imgPopupImage, imgPopupTitle, imgPopupCloseButton } from './index.js';

export class Card {
    constructor(object, cardSelector) {
        this._cardSelector = cardSelector
        this._name = object.name
        this._link = object.link
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    _handleDeleteElement() {
        const trash = this._element.querySelector('.element__trash')
        const trashElement = trash.closest('.element')
        trashElement.remove();
    }

    _handleMassegeLike() {
        this._element.querySelector('.element__like_icon').classList.toggle('element__like_fill');
    }

    _handleOpenImgPopup() {
        openPopup(imgPopup);
        imgPopupImage.src = this._link;
        imgPopupTitle.textContent = this._name;
    }


    _handleCloseImgPopup() {
        closePopup(imgPopup);
    }

    _setEventListener() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._handleMassegeLike();
        });

        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._handleDeleteElement();
        });

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleOpenImgPopup();
        });

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleOpenImgPopup();
        });

        imgPopupCloseButton.addEventListener('click', () => {
            this._handleCloseImgPopup();
        });

    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListener();
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;
        return this._element;
    }

}
