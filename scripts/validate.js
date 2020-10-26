function enableValidation(object) {
    const form = document.querySelector(object.formSelector)
    const formInput = form.querySelector(object.inputSelector)
    const formError = form.querySelector(object.errorSelector)
    const formButton = form.querySelector(object.submitButtonSelector)

    const showInputError = (form, formInput, errorMassage) => {
        const formError = form.querySelector(`#${formInput.id}-error`);
        formInput.classList.add(object.inputErrorClass);
        formError.textContent = errorMassage;

    };

    const hideInputError = (form, formInput) => {
        const formError = form.querySelector(`#${formInput.id}-error`);
        formInput.classList.remove(object.inputErrorClass);
        formError.textContent = '';
    };

    const checkInputValidity = (form, formInput) => {
        if (!formInput.validity.valid) {
            showInputError(form, formInput, formInput.validationMessage);
        } else {
            hideInputError(form, formInput);
        }
    };

    form.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });


    function hasInvalid(inputList) {
        return inputList.some(inputElement => {
            return !inputElement.validity.valid;

        });
    }

    function toggleButtonSave (inputList, buttonElemnt) {
        if (hasInvalid(inputList)) {
            buttonElemnt.classList.add(object.inactiveButtonClass)
            buttonElemnt.setAttribute('disabled', true);
        } else {
            buttonElemnt.classList.remove(object.inactiveButtonClass)
            buttonElemnt.removeAttribute('disabled');
        }
    }

    

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
