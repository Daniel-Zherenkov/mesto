export class Card {
    constructor(object, cardSelector, handleCardClick, handleLikeCounter, handleDeleteCard) {
        this._cardSelector = cardSelector;
        this._name = object.name;
        this._link = object.link;
        this._handleCardClick = handleCardClick;
        this._handleLikeCounter = handleLikeCounter;
        this._element = this._getTemplate();
        this.likesCounter = this._element.querySelector('.element__like-count')
        this.trash = this._element.querySelector('.element__trash');
        this.trashCard = this.trash.closest('.element')
        this._handleDeleteCard = handleDeleteCard
        
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

    addLike(object) {
        this.likesCounter.textContent = object.likes.length
        this._element
            .querySelector('.element__like_icon')
            .classList.add('element__like_fill');
    }
    delLike(object) {
        this.likesCounter.textContent = object.likes.length
        this._element
            .querySelector('.element__like_icon')
            .classList.remove('element__like_fill');
    }


    _setEventListener() {
        this._element
            .querySelector('.element__like')
            .addEventListener('click', () => {
                // this._handleMassegeLike();
                this._handleLikeCounter();
            });

        this._element
            .querySelector('.element__trash')
            .addEventListener('click', () => {
                // this._handleDeleteElement();
                this._handleDeleteCard();
            });

        this._element
            .querySelector('.element__image')
            .addEventListener('click', () => {
                this._handleCardClick();
            });

    }

    generateCard(id) {
        this._image = this._element.querySelector('.element__image')
        this._setEventListener();
        this._image.src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;
        this._image.alt = this._name;
        if (id !== 'c4b57be845e0c2e7582e746a') {
            this._element.querySelector('.element__trash').remove()
        }
        return this._element;
    }

}
