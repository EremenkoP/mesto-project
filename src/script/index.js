import '../pages/index.css'

// импортирую нужные объекты
import {formProfile, changesProfile, handleProfileFormSubmit, openProfilePopup, getUserData} from './components/modal.js';
import {openPopup ,closePopup} from './components/utils.js';
import {enableValidation} from './components/validate.js'
import {popupAdd, formCard, cardAdd, handelFormAddCard, createCard, cardsArea} from './components/cards.js'
import {getAppInfo } from './components/api.js';

// объявим необходимые константы
const popups = document.querySelectorAll(".popup");

//закрытие сразу всех попапов
popups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened')){
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  })
})

// выполнение функции для отображения первичной информации от сервера
getAppInfo()
  .then(([user, cards]) => {
    getUserData(user);
    cards.forEach(card => {
      cardsArea.prepend(createCard(card.name, card.link, card.likes, user._id, card.owner._id));
    });
  })
  .catch(err => console.log(err));

//*Добавление новой карточки
formCard.addEventListener('submit', handelFormAddCard);
// открытие и закрытие попапа
cardAdd.addEventListener('click', function(){
  openPopup(popupAdd);
});


// закрытие модалки c изменениями данных пользователя
formProfile.addEventListener('submit', handleProfileFormSubmit);

// открытие и закрытие модалки с данными пользователя
changesProfile.addEventListener('click', openProfilePopup);

// запуск валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__text-input_error',
  errorClass: 'popup__span_visible'
});
