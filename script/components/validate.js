// базовые функции валидации
const showInputError = (input, span, inputErrorClass, errorClass, errrorMasage) => {
  input.classList.add(`${inputErrorClass}`);
  span.textContent = errrorMasage;
  span.classList.add(`${errorClass}`);
}

const hideInputError = (input, span, inputErrorClass, errorClass) => {
  input.classList.remove(`${inputErrorClass}`);
  span.classList.remove(`${errorClass}`);
  span.textContent = '';
}
const hasInvalidInput = (inputAll) => {
  return inputAll.some((input) => {
    return !input.validity.valid;
  })
}

const toggleButtonState = (inputAll, button, inactiveButtonClass) => {
  if (hasInvalidInput(inputAll)) {
    button.classList.add(`${inactiveButtonClass}`);
    button.setAttribute('disabled', '');
  } else {
    button.classList.remove(`${inactiveButtonClass}`);
    button.removeAttribute('disabled');
  }
};

console
//задание валидации каждой модалки
const isValid = (input ,inputErrorClass, errorClass) => {
  const span = document.querySelector(`.popup__span-${input.id}`)
  if (!input.validity.valid) {
    showInputError(input, span, inputErrorClass, errorClass, input.validationMessage);
  } else {
    hideInputError(input, span, inputErrorClass, errorClass);
  }
}



const enableValidation = (setting) =>{
  const forms = Array.from(document.querySelectorAll(`${setting.formSelector}`))
  forms.forEach(form => {
    const inputAll = Array.from(form.querySelectorAll(`${setting.inputSelector}`));
    const button = form.querySelector(`${setting.submitButtonSelector}`)
    inputAll.forEach(input => {
      input.addEventListener('input', () => {
        isValid(input ,setting.inputErrorClass, setting.errorClass);
        toggleButtonState(inputAll, button, setting.inactiveButtonClass)
      })
    })
  })
}

export {enableValidation}
