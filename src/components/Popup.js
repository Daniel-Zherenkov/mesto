
export default class Popup {
    constructor (popUpSelector) {
        this._popup = document.querySelector(popUpSelector);
        this._closeButton = this._popup.querySelector('.popup-close')
        this._handleEscClose = this._handleEscClose.bind(this)
        
        
    }


    close() {
        this._popup.classList.remove('popup-opened');
        document.removeEventListener('keydown', this._handleEscClose);
        
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
            
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target === this._popup) {
            this.close()
        }
    }

    open() {
        this._popup.classList.add('popup-opened')
        document.addEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._popup.addEventListener('click', this._handleOverlayClose.bind(this));
        this._closeButton.addEventListener('click', this.close.bind(this))
        
    }


}
