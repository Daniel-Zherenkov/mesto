export class Card {
    constructor(object, cardSelector, meID, handleCardClick, handleLikeCounter, handleDeleteCard) {
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
        this._likes = object.likes
        this._meID = meID.id
        
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _handleMassegeLike() {
        this._element
            .querySelector('.element__like_icon')
            .classList.toggle('element__like_fill');
    }

    isLiked() {
        return this._likes.some(element => element._id === this._meID)
    }

    setLikes(res) {
        if (this.isLiked()) {
            this._likes = res.likes
            // console.log('aa')
            this.likesCounter.textContent = res.likes.length
        this._element
            .querySelector('.element__like_icon')
            .classList.remove('element__like_fill');

        } else {
            // res.likes = this._likes
            // console.log('bb')
            this.likesCounter.textContent = res.likes.length
        this._element
            .querySelector('.element__like_icon')
            .classList.add('element__like_fill');
        }
    }

    deleteCard(){
        this.trashCard.remove()
    }


    // addLike(res) {
    //     // console.log(res.likes)
    //     // console.log(this._likes)
    //     this._likes = res.likes
    //     this.likesCounter.textContent = res.likes.length
    //     this._element
    //         .querySelector('.element__like_icon')
    //         .classList.add('element__like_fill');
    //     // console.log(this._likes)
    // }
    // delLike(res) {
    //     // console.log(res.likes)
    //     res.likes = this._likes
    //     this.likesCounter.textContent = res.likes.length - 1
    //     this._element
    //         .querySelector('.element__like_icon')
    //         .classList.remove('element__like_fill');
    // }


    _setEventListener() {
        this._element
            .querySelector('.element__like')
            .addEventListener('click', () => {
                // this._handleMassegeLike();
                this._handleLikeCounter(this);
            });

        this._element
            .querySelector('.element__trash')
            .addEventListener('click', () => {
                this._handleDeleteCard();
            });

        this._element
            .querySelector('.element__image')
            .addEventListener('click', () => {
                this._handleCardClick();
            });

    }

    generateCard(id, meID) {
        this._image = this._element.querySelector('.element__image')
        this._setEventListener();
        this._image.src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;
        this._image.alt = this._name;
        if (id !== meID) {
            this._element.querySelector('.element__trash').remove()
        }
        this.likesCounter.textContent = this._likes.length
        return this._element;
    }

}
// 'c4b57be845e0c2e7582e746a'
