// импортирую нужные объекты
import {popupImgClose, popupImg, formProfile, popupProfileClose, changesProfile, popupProfile, profileChanges, popupProfileOpened} from './components/modal.js';
import {popupClosed} from './components/utils.js';

// закрытие модалки с картинкой
popupImgClose.addEventListener('click', function(){
  popupClosed(popupImg);
});

// закрытие модалки c изменениями данных пользователя
formProfile.addEventListener('submit', profileChanges);

// открытие и закрытие модалки с данными пользователя
changesProfile.addEventListener('click', popupProfileOpened);
popupProfileClose.addEventListener('click', function(){
   popupClosed(popupProfile);
});

//закрытие модалки по ESC
document.addEventListener('keydown', evt => {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');
      if (popupOpen != null ) {
        popupClosed(popupOpen);
      }
  }
});

//закрытие попапа кликом по оверфлоу
document.addEventListener('click',  evt => {
  const popupOpen = document.querySelector('.popup_opened');
  if ((popupOpen != null) && (evt.target.classList.contains('popup')) ) {
    popupClosed(popupOpen);
  }
})
