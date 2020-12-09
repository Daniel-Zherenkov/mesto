import Popup from './Popup.js';

export default class PopupWithApprove extends Popup {
    constructor(popUpSelector, handleSubmit) {
        super(popUpSelector);
        this._handleSubmit = handleSubmit
    }


    setEventListeners() {
        this._popup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleSubmit();
        this.close();
        })
        super.setEventListeners()
        
    }


}