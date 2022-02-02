// *задаю нужные переменные
const popupAdd = document.querySelector('.popup__add');
const formCard = popupAdd.querySelector('.popup__form');
const cardAdd = document.querySelector('.profile__button-add');
const popupAddClose = popupAdd.querySelector('.popup__button-close');
const cardsArea = document.querySelector('.cards');
const nameInput = popupAdd.querySelector('#name-card');
const imageInput =popupAdd.querySelector('#image-url');
const cardTemp = document.querySelector("#card__temp").content;

//импорт нужных объектов
import {openPopup, closePopup} from './utils.js';
import {popupImg} from './modal.js'
import {postNewCard } from './api.js';

//функция добавления кнопки удаления
const activeteButtonTrash = (card ,userId, authorId) => {
  if (userId === authorId) {
    const buttonForActive = card.querySelector('.card__button-trash');
    buttonForActive.classList.add('card__button-trash_active');
  }
}

// *функция создания карточки
function createCard(name, link, likes, userId, authorId) {
  const card = cardTemp.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = name;
  const cardImage = card.querySelector('.card__image');
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  card.querySelector('.card__like-counter').textContent = likes.length;
  activeteButtonTrash(card ,userId, authorId);
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
  postNewCard(name, link)
  .then ((res) => {
    if (res.ok) {
      cardsArea.prepend(createCard(name, link));
      closePopup(popupAdd);
    } else {
      return console.log(res.status);
    }
  })
  formCard.reset();
  const button = evt.submitter;
  button.setAttribute('disabled', '');
  button.classList.add('popup__button_disabled')
}


export {popupAdd, formCard, cardAdd, popupAddClose, createCard, handelFormAddCard, cardsArea}
