// вынимаю попапы

const popupProfile = document.querySelector('.popup__profile');
const popupImg = document.querySelector('.popup__view-image');

// вынимаю кнопки закрытия попапов
const popupProfileClose = popupProfile.querySelector('.popup__button-close');
const popupImgClose = popupImg.querySelector('.popup__button-close');

// вынимаю кнопку открытия редактироать профиль
const changesProfile = document.querySelector('.profile__button-changes-profile');

// вынимаю значения форм для попапов
const formProfile = popupProfile.querySelector('.popup__form');

// базовый набор карточек и элементов
const profileName = document.querySelector('.profile__name');
const profileProfesion  = document.querySelector('.profile__profession');

//импорт нужных объектов
import {popupOpened, popupClosed} from './utils.js';

// *изменения профиля
// открытие попапа
function popupProfileOpened(){
  const formName = formProfile.querySelector('#name');
  formName.setAttribute('value', profileName.textContent);
  const formProfesion = formProfile.querySelector('#proffesion');
  formProfesion.setAttribute('value', profileProfesion.textContent);
  popupOpened(popupProfile);
};

// Работа с именем и профессией
function profileChanges (evt) {
  evt.preventDefault();
  const formName = formProfile.querySelector('#name');
  profileName.textContent = formName.value;
  const formProfesion = formProfile.querySelector('#proffesion');
  profileProfesion.textContent = formProfesion.value;
  popupClosed(popupProfile);
}



// экспорт объектов
export {popupImgClose, formProfile, popupProfileClose, changesProfile, popupProfile, popupImg, profileChanges, popupProfileOpened}
