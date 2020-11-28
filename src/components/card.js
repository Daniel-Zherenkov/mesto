
export class Card {
    constructor(object, cardSelector, handleCardClick) {
        this._cardSelector = cardSelector;
        this._name = object.name;
        this._link = object.link;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _handleDeleteElement() {
        const trash = this._element.querySelector('.element__trash');
        const trashElement = trash.closest('.element');
        trashElement.remove();
    }

    _handleMassegeLike() {
        this._element
            .querySelector('.element__like_icon')
            .classList.toggle('element__like_fill');
    }



    _setEventListener() {
        this._element
            .querySelector('.element__like')
            .addEventListener('click', () => {
                this._handleMassegeLike();
            });

        this._element
            .querySelector('.element__trash')
            .addEventListener('click', () => {
                this._handleDeleteElement();
            });

        this._element
            .querySelector('.element__image')
            .addEventListener('click', () => {
                this._handleCardClick();
            });

    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListener();
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__image').alt = this._name;
        return this._element;
    }
}
