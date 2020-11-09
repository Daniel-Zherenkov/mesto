export class FormValidator {
    constructor(object, formSelector) {
        this._form = document.querySelector(formSelector);
        this._input = this._form.querySelector(object.inputSelector);
        this._formButton = this._form.querySelector(object.submitButtonSelector);
        this._objectInput = object.inputSelector;
        // this._formSelector = formSelector;
    }

    //     _showInputError() {
    //     const formError = this._form.querySelector(`#${this._input.id}-error`);
    //     this._input.classList.add('popup-error__input-error');
    //     formError.textContent = this._input.validationMessage;
    // }

    // _hideInputError() {
    //     const formError = this._form.querySelector(`#${this._input.id}-error`);
    //     this._input.classList.remove('popup-error__input-error');
    //     formError.textContent = '';
    // }

    _checkInputValidity() {
        const inputList = Array.from(
            this._form.querySelectorAll(this._objectInput)
        );
        const hasInvalid = () => {
            return inputList.some((inputElement) => {
                return !inputElement.validity.valid;
            });
        };

        const toggle = () => {
            if (hasInvalid(inputList)) {
                this._formButton.classList.add('popup-error__disabled-button');
                this._formButton.setAttribute('disabled', true);
            } else {
                this._formButton.classList.remove('popup-error__disabled-button');
                this._formButton.removeAttribute('disabled', true);
            }
        };

        inputList.forEach((inputElement) => {
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

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const inputList = Array.from(
            this._form.querySelectorAll(this._objectInput)
        );
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity();
            });
        });
    }
}

// function enableValidation(object) {
//     const form = document.querySelector(object.formSelector)
//     const formButton = form.querySelector(object.submitButtonSelector)

//     form.addEventListener('submit', function (evt) {
//         evt.preventDefault();
//     });

//     function setEventListener(form) {
//         const inputList = Array.from(form.querySelectorAll(object.inputSelector));
//         inputList.forEach((inputElement) => {
//             inputElement.addEventListener('input', function () {
//                 checkInputValidity(form, inputElement);
//                 toggleButtonSave(inputList, formButton)
//                 });
//             });

//         }

//         setEventListener(form);
//     };

// const showInputError = (form, formInput, errorMassage) => {
//     const formError = form.querySelector(`#${formInput.id}-error`);
//     formInput.classList.add('popup-error__input-error');
//     formError.textContent = errorMassage;

// };

// const hideInputError = (form, formInput) => {
//     const formError = form.querySelector(`#${formInput.id}-error`);
//     formInput.classList.remove('popup-error__input-error');
//     formError.textContent = '';
// };

// const checkInputValidity = (form, formInput) => {
//     if (!formInput.validity.valid) {
//         showInputError(form, formInput, formInput.validationMessage);
//     } else {
//         hideInputError(form, formInput);
//     }
// };

//     function hasInvalid(inputList) {
//         return inputList.some(inputElement => {
//             return !inputElement.validity.valid;

//         });
//     }

//     function toggleButtonSave (inputList, buttonElemnt) {
//         if (hasInvalid(inputList)) {
//             addInactiveButton(buttonElemnt)
//         } else {
//             removeInactiveButton(buttonElemnt);
//         }
//     }

// enableValidation({
//     formSelector: '.add-popup__container',
//     inputSelector: '.add-popup__input-filed',
//     errorSelector: '.popup-error__text-input-error',
//     submitButtonSelector: '.add-popup__save-button',
//     inactiveButtonClass: 'popup-error__disabled-button',
//     inputErrorClass: 'popup-error__input-error',
//     errorClass: 'popup-error__text-input-error'
// });
