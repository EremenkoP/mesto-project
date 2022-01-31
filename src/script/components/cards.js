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
const cards = document.querySelector('.cards');
const nameInput = popupAdd.querySelector('#name-card');
const imageInput =popupAdd.querySelector('#image-url');

//импорт нужных объектов
import {openPopup, closePopup} from './utils.js';
import {popupImg} from './modal.js'

// *функция создания карточки
function createCard(name, link) {
  const cardTemp = document.querySelector("#card__temp").content;
  const card = cardTemp.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = name;
  const cardImage = card.querySelector('.card__image');
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  card.querySelector('.card__button').addEventListener('click', function (event){
    event.target.classList.toggle('card__button_active')
  });
  card.querySelector('.card__button-trash').addEventListener('click', function (){
    card.remove();
  });
  cardImage.addEventListener('click', function(){
    const popupImage = popupImg.querySelector('.popup__image')
    popupImage.setAttribute('src', link);
    popupImage.setAttribute('alt', name);
    popupImg.querySelector('.popup__label').textContent = name;
    openPopup(popupImg);
  });
  return card;
};



// Добавление новой карточки
function handelFormAddCard (evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const link = imageInput.value;
  cards.prepend(createCard(name, link));
  closePopup(popupAdd);
  formCard.reset();
  const button = evt.submitter;
  button.setAttribute('disabled', '');
  button.classList.add('popup__button_disabled')
}


export {initialCards, popupAdd, formCard, cardAdd, popupAddClose, createCard, handelFormAddCard, cards}
