
export default class Popup {
    constructor (popUpSelector) {
        this._popup = document.querySelector(popUpSelector);
        this._closeButton = this._popup.querySelector('.popup-close')
    }


    close() {
        this._popup.classList.remove('popup-opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
        
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
        this.setEventListeners()
        
    }

    setEventListeners() {
        this._popup.addEventListener('click', this._handleOverlayClose.bind(this));
        this._closeButton.addEventListener('click', this.close.bind(this))
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }


}
