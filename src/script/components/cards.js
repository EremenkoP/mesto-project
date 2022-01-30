// базовый набор карточек
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
// *задаю нужные переменные
const popupAdd = document.querySelector('.popup__add');
const formCard = popupAdd.querySelector('.popup__form');
const cardAdd = document.querySelector('.profile__button-add');
const popupAddClose = popupAdd.querySelector('.popup__button-close');

//импорт нужных объектов
import {popupOpened, popupClosed} from './utils.js';
import {popupImg} from './modal.js'

// *функция создания карточки
function createCard(name, link) {
  const cardTemp = document.querySelector("#card__temp").content;
  const card = cardTemp.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__image').setAttribute('src', link);
  card.querySelector('.card__image').setAttribute('alt', name);
  card.querySelector('.card__button').addEventListener('click', function (event){
    event.target.classList.toggle('card__button_active')
  });
  card.querySelector('.card__button-trash').addEventListener('click', function (){
    card.remove();
  });
  card.querySelector('.card__image').addEventListener('click', function(){
    popupImg.querySelector('.popup__image').setAttribute('src', link);
    popupImg.querySelector('.popup__image').setAttribute('alt', name);
    popupImg.querySelector('.popup__label').textContent = name;
    popupOpened(popupImg);
  });
  return card;
};



// Добавление новой карточки
function formAddCard (evt) {
  evt.preventDefault();
  const name = popupAdd.querySelector('#name-card').value;
  const link = popupAdd.querySelector('#image-url').value;
  document.querySelector('.cards').prepend(createCard(name, link));
  formCard.reset();
  popupClosed(popupAdd);
}


export {initialCards, popupAdd, formCard, cardAdd, popupAddClose, createCard, formAddCard}
