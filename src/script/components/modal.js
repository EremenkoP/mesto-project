// вынимаю попапы
const popupProfile = document.querySelector('.popup__profile');
const popupImg = document.querySelector('.popup__view-image');
const popupAvatar = document.querySelector('.popup__avatar')

// вынимаю кнопки закрытия попапов
const popupProfileClose = popupProfile.querySelector('.popup__button-close');
const popupImgClose = popupImg.querySelector('.popup__button-close');

// вынимаю кнопку открытия редактироать профиль и аватар
const changesProfile = document.querySelector('.profile__button-changes-profile');
const changesAvatar = document.querySelector('.profile__image-box');

// вынимаю значения форм для попапов
const formProfile = popupProfile.querySelector('.popup__form');
const formName = formProfile.querySelector('#name');
const formProfesion = formProfile.querySelector('#proffesion');
const formAvatar = popupAvatar.querySelector('.popup__form');
const avatar = popupAvatar.querySelector('.popup__text-input');

// базовый набор карточек и элементов
const profileName = document.querySelector('.profile__name');
const profileProfesion  = document.querySelector('.profile__profession');
const profileImage = document.querySelector('.profile__image');

//импорт нужных объектов
import {openPopup, closePopup} from './utils.js';
import {changesDataProfile, changesAvatarProfile } from './api.js';

// *изменения профиля
// открытие попапов
function openProfilePopup(){
  formName.setAttribute('value', profileName.textContent);
  formProfesion.setAttribute('value', profileProfesion.textContent);
  openPopup(popupProfile);
};

// Работа с именем и профессией, через модалку
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  const button = evt.submitter;
  button.value = 'Сохранение...'
  changesDataProfile (formName.value, formProfesion.value)
    .then ((res) => {
      profileName.textContent = res.name;
      profileProfesion.textContent = res.about;
      closePopup(popupProfile);
    })
    .catch ( res => console.log(res))
    .finally ( () => {
      button.value = 'Сохранить'
    })
}

// функция изменения аватара
function handelNewAvatar (evt) {
  evt.preventDefault();
  const button = evt.submitter;
  button.value = 'Сохранение...'
  changesAvatarProfile (avatar.value)
    .then ((res) => {
        profileImage.src = res.avatar;
        closePopup(popupAvatar);
    })
    .then ( () => {
      formAvatar.reset();
      button.setAttribute('disabled', '');
      button.classList.add('popup__button_disabled');
    })
    .catch ( res => console.log(res))
    .finally ( () => button.value = 'Сохранить')

}

// функция для загрузки первичных данных пользователя
const getUserData = (user) => {
  profileName.textContent = user.name;
  profileProfesion.textContent = user.about;
  profileImage.src = user.avatar;
}

// экспорт объектов
export {popupImgClose, formProfile, popupProfileClose, changesProfile, popupProfile, popupImg, handleProfileFormSubmit, openProfilePopup, getUserData, handelNewAvatar, formAvatar, popupAvatar, changesAvatar}
