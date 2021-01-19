import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popUpSelector, handleSubmit) {
        super(popUpSelector)
        this._handleSubmit = handleSubmit
        this._popUpSelector = popUpSelector
        this.form = this._popup.querySelector('#form')
        
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.input')
        this._inputValues = {}
        this._inputList.forEach( item => {
            this._inputValues[item.name] = item.value
        })
        return this._inputValues
    }

    _submitHandler (evt) {
        evt.preventDefault();
        this._handleSubmit(this._getInputValues());
        this.close();
    }

    // _submitHandlerAvatar (evt) {
    //     evt.preventDefault();
    //     this._handleSubmit(this._getInputValues());
    //     super.close();
    // }

    setEventListeners() {
        this._popup.addEventListener('submit', this._submitHandler.bind(this))
        super.setEventListeners()
    }

    // setEventListenersAvatar() {
    //     this._popup.addEventListener('submit', this._submitHandlerAvatar.bind(this))
    //     super.setEventListeners()
        
    // }

    close() {
        super.close()
        // 
    }

    reset() {
        this.form.reset()
    }

}
