// **все что нужно из страницы
// вынимаю глобальные кнопки
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
// вынимаю значения форм для попапов
const formElement = document.querySelectorAll('.popup__form');
const formProfile = formElement[0];
const formCard = formElement[1];
// базовый набор карточек и элементов
const cardTemp = document.querySelector("#card__temp").content;
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

// **работа непосредственно со страницей и попапами
// * функция открытие модалки с картинкой.
function popupImgFunction(){
  popupImg.classList.toggle('popup_opened');
}
popupImgClose.addEventListener('click', popupImgFunction);
// *загрузка начальных картинок
initialCards.forEach(function(item){
  let card = cardTemp.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = item.name;
  card.querySelector('.card__image').setAttribute('src', item.link);
  card.querySelector('.card__image').setAttribute('alt', item.name);
  card.querySelector('.card__button').addEventListener('click', function (event){
    event.target.classList.toggle('card__button_active')
  });
  card.querySelector('.card__button-trash').addEventListener('click', function (){
    card.remove();
  });
  card.querySelector('.card__image').addEventListener('click', function(){
    popupImg.querySelector('.popup__image').setAttribute('src', item.link);
    popupImg.querySelector('.popup__image').setAttribute('alt', item.name);
    popupImg.querySelector('.popup__label').textContent = item.name;
    popupImgFunction();
  });
  document.querySelector('.cards').prepend(card);
});

// *изменения профиля
// открытие и закрытие попапа
function popupProfileFunction(){
  popupProfile.classList.toggle('popup_opened');
  let formName = formProfile.querySelector('#name');
  formName.setAttribute('value', profileName.textContent);
  let formProfesion = formProfile.querySelector('#proffesion');
  formProfesion.setAttribute('value', profileProfesion.textContent);
}
changesProfile.addEventListener('click', popupProfileFunction);
popupProfileClose.addEventListener('click', popupProfileFunction);
// Работа с именем и профессией
let profileName = document.querySelector('.profile__name');
let profileProfesion  = document.querySelector('.profile__profession');
function profileChanges (evt) {
  evt.preventDefault();
  let formName = formProfile.querySelector('#name');
  profileName.textContent = formName.value;
  let formProfesion = formProfile.querySelector('#proffesion');
  profileProfesion.textContent = formProfesion.value;
  popupProfileFunction();
}
formProfile.addEventListener('submit', profileChanges);

//*Добавление новой карточки
// открытие и закрытие попапа
function popupAddFunction(){
  popupAdd.classList.toggle('popup_opened');
}
cardAdd.addEventListener('click', popupAddFunction);
popupAddClose.addEventListener('click', popupAddFunction);
// Добавление новой карточки
function formAddCard (evt) {
  evt.preventDefault();
  let card = cardTemp.querySelector('.card').cloneNode(true);
  let cardName = popupAdd.querySelector('#name-card');
  card.querySelector('.card__title').textContent = cardName.value;
  let cardImg = popupAdd.querySelector('#image-url');
  card.querySelector('.card__image').setAttribute('src', cardImg.value);
  card.querySelector('.card__image').setAttribute('alt', cardName.value);
  card.querySelector('.card__button').addEventListener('click', function (event){
    event.target.classList.toggle('card__button_active')
  });
  card.querySelector('.card__button-trash').addEventListener('click', function (){
    card.remove();
  });
  card.querySelector('.card__image').addEventListener('click', function(){
    popupImg.querySelector('.popup__image').setAttribute('src', cardImg.value);
    popupImg.querySelector('.popup__image').setAttribute('alt', cardName.value);
    popupImg.querySelector('.popup__label').textContent = cardName.value;
    popupImgFunction();
  });
  document.querySelector('.cards').prepend(card);
  popupAddFunction();
}
let popupLetCard = popupAdd.querySelector('.popup__button')
formCard.addEventListener('submit', formAddCard);
