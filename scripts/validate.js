
function enableValidation(object) {
    const form = document.querySelector(object.formSelector)
    const formButton = form.querySelector(object.submitButtonSelector)
    
    form.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });

    function setEventListener(form) {
        const inputList = Array.from(form.querySelectorAll(object.inputSelector));
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                checkInputValidity(form, inputElement);
                toggleButtonSave(inputList, formButton)
                });
            });
            
        }
        
        setEventListener(form);    
    };

    const showInputError = (form, formInput, errorMassage) => {
        const formError = form.querySelector(`#${formInput.id}-error`);
        formInput.classList.add('popup-error__input-error');
        formError.textContent = errorMassage;

    };

    const hideInputError = (form, formInput) => {
        const formError = form.querySelector(`#${formInput.id}-error`);
        formInput.classList.remove('popup-error__input-error');
        formError.textContent = '';
    };

    const checkInputValidity = (form, formInput) => {
        if (!formInput.validity.valid) {
            showInputError(form, formInput, formInput.validationMessage);
        } else {
            hideInputError(form, formInput);
        }
    };

    function hasInvalid(inputList) {
        return inputList.some(inputElement => {
            return !inputElement.validity.valid;

        });
    }

    function toggleButtonSave (inputList, buttonElemnt) {
        if (hasInvalid(inputList)) {
            addInactiveButton(buttonElemnt)
        } else {
            removeInactiveButton(buttonElemnt);
        }
    }


    function addInactiveButton (button) {
        button.classList.add('popup-error__disabled-button');
        button.setAttribute('disabled', true);
    }

    function removeInactiveButton (button) {
        button.classList.remove('popup-error__disabled-button');
        button.removeAttribute('disabled', true);
    }



enableValidation({
    formSelector: '.profilePopup__container',
    inputSelector: '.profilePopup__input-filed',
    errorSelector: '.popup-error__text-input-error',
    submitButtonSelector: '.profilePopup__save-button',
    inactiveButtonClass: 'popup-error__disabled-button',
    inputErrorClass: 'popup-error__input-error',
    errorClass: 'popup-error__text-input-error'
}); 

enableValidation({
    formSelector: '.addPopup__container',
    inputSelector: '.addPopup__input-filed',
    errorSelector: '.popup-error__text-input-error',
    submitButtonSelector: '.addPopup__save-button',
    inactiveButtonClass: 'popup-error__disabled-button',
    inputErrorClass: 'popup-error__input-error',
    errorClass: 'popup-error__text-input-error'
}); 
