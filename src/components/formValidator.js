export class FormValidator {
    constructor(object, formSelector) {
        this._form = document.querySelector(formSelector);
        this._input = this._form.querySelector(object.inputSelector);
        this._formButton = this._form.querySelector(object.submitButtonSelector);
        this._objectInput = object.inputSelector;
        this._inputList = Array.from(this._form.querySelectorAll(this._objectInput)); //массив инпутов формы
    }

    //основной метод валидации
    _checkInputValidity() {
        //проверка каждого инпута на валидность
        const hasInvalid = () => {
            return this._inputList.some((inputElement) => {
                return !inputElement.validity.valid;
            });
        };
        //условие, что какой-то из инпутов не прошел проверку, нужно выключить кнопку сохранения формы
        const toggle = () => {
            if (hasInvalid(this._inputList)) {
                this._formButton.classList.add('popup-error__disabled-button');
                this._formButton.setAttribute('disabled', true);
            } else {
                this._formButton.classList.remove('popup-error__disabled-button');
                this._formButton.removeAttribute('disabled', true);
            }
        };

        //условие, что если какой-то из инпутов не прошел проверку на валидность, вывести ошибку и поменять стили для инпута

        this._inputList.forEach((inputElement) => {
            if (!inputElement.validity.valid) {
                const formError = this._form.querySelector(`#${inputElement.id}-error`);
                inputElement.classList.add('popup-error__input-error');
                formError.textContent = inputElement.validationMessage;
                toggle();
            } else {
                const formError = this._form.querySelector(`#${inputElement.id}-error`);
                this._input.classList.remove('popup-error__input-error');
                formError.textContent = '';
                toggle();
            }
        });
    }

    //включение валидации, этот метод вызывается у экземпляра класса чтобы форма валидирвалась
    enableValidation() {
        this._inputList.forEach((inputElement) => {
            if (inputElement.name === 'placeName') {
                this._formButton.classList.add('popup-error__disabled-button');
                this._formButton.setAttribute('disabled', true);
            } 
            inputElement.addEventListener('input', () => {
                this._checkInputValidity();
            });
        });
        
        
    }
}

