import '../pages/index.css'

// импортирую нужные объекты
import {formProfile, changesProfile, handleProfileFormSubmit, openProfilePopup, getUserData, popupAvatar, changesAvatar, formAvatar, handelNewAvatar} from './components/modal.js';
import {openPopup ,closePopup} from './components/utils.js';
import {enableValidation} from './components/validate.js'
import {popupAdd, formCard, cardAdd, handelFormAddCard, createCard, cardsArea} from './components/cards.js'
import {getAppInfo } from './components/api.js';

// объявим необходимые константы
const popups = document.querySelectorAll(".popup");
export let myUser;

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
      cardsArea.append(createCard(card.name, card.link, card.likes, user, card.owner._id, card._id));
    })
    myUser = user;
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
changesAvatar.addEventListener('mousedown', () => openPopup(popupAvatar));
formAvatar.addEventListener('submit', handelNewAvatar)

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
