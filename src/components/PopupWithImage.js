import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popUpSelector) {
        super(popUpSelector);
        this._image = this._popup.querySelector('.img-popup__image')
        this._text = this._popup.querySelector('.img-popup__title')
    }

    open(text, image) {
        this._image.src = image
        this._text.textContent = text 
        super.open()
    }

}