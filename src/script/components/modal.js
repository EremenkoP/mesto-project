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
const formName = formProfile.querySelector('#name');
const formProfesion = formProfile.querySelector('#proffesion');

// базовый набор карточек и элементов
const profileName = document.querySelector('.profile__name');
const profileProfesion  = document.querySelector('.profile__profession');
const profileImage = document.querySelector('.profile__image');


//импорт нужных объектов
import {openPopup, closePopup} from './utils.js';
import { changesDataProfile } from './api.js';

// *изменения профиля
// открытие попапа
function openProfilePopup(){
  formName.setAttribute('value', profileName.textContent);
  formProfesion.setAttribute('value', profileProfesion.textContent);
  openPopup(popupProfile);
};

// Работа с именем и профессией через модалку
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  changesDataProfile (formName, formProfesion)
    .then ((res) => {
      if (res.ok) {
        profileName.textContent = formName.value;
        profileProfesion.textContent = formProfesion.value;
        closePopup(popupProfile);
      } else {
        return console.log(res.status);
      }
    })
}

// функция для загрузки первичных данных пользователя
const getUserData = (user) => {
  profileName.textContent = user.name;
  profileProfesion.textContent = user.about;
  profileImage.src = user.avatar;
}

// экспорт объектов
export {popupImgClose, formProfile, popupProfileClose, changesProfile, popupProfile, popupImg, handleProfileFormSubmit, openProfilePopup, getUserData}
