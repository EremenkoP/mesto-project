// **Вынимаю все что нужно из страницы
// вынимаю кнопки
const changesProfile = document.querySelector('.profile__button-changes-profile');
const cardAdd = document.querySelector('.profile__button-add');
// вынимаю попапы
const popup = document.querySelectorAll('.popup');
const popupProfile = popup[0];
const popupAdd = popup[1];
const popupImg = popup[2];
const popupClose = document.querySelectorAll('.popup__button-close');
const popupProfileClose = popupClose[0];
const popupAddClose = popupClose[1];
const popupImgClose = popupClose[2];
// вынимаю значения
const formElement = document.querySelector('.popup__form');

// **работа непосредственно со страницей и попапами
// *изменения профиля
// открытие и закрытие попапа
function popupProfileFunction(){
  popupProfile.classList.toggle('popup_opened');
  let formName = formElement.querySelector('#name');
  formName.setAttribute('value', profileName.textContent);
  let formProfesion = formElement.querySelector('#proffesion');
  formProfesion.setAttribute('value', profileProfesion.textContent);
}
changesProfile.addEventListener('click', popupProfileFunction);
popupProfileClose.addEventListener('click', popupProfileFunction);
// Работа с именем и профессией
let profileName = document.querySelector('.profile__name');
let profileProfesion  = document.querySelector('.profile__profession');
function formSubmitHandler (evt) {
  evt.preventDefault();
  let formName = formElement.querySelector('#name');
  profileName.textContent = formName.value;
  let formProfesion = formElement.querySelector('#proffesion');
  profileProfesion.textContent = formProfesion.value;
  popupProfileFunction();
}
formElement.addEventListener('submit', formSubmitHandler);

//*Попап добавление новой карточки
function popupAddFunction(){
  popupAdd.classList.toggle('popup_opened');
}
cardAdd.addEventListener('click', popupAddFunction);
popupAddClose.addEventListener('click', popupAddFunction);

// открытие попапа с картинкой
