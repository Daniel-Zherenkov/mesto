import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popUpSelector) {
        super(popUpSelector);
    }

    open(text, image) {
        this._popup.querySelector('.img-popup__image').src = image
        this._popup.querySelector('.img-popup__title').textContent = text 
        super.open()
    }

}