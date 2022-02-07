// *задаю нужные переменные
const popupAdd = document.querySelector('.popup__add');
const formCard = popupAdd.querySelector('.popup__form');
const cardAdd = document.querySelector('.profile__button-add');
const popupAddClose = popupAdd.querySelector('.popup__button-close');
const cardsArea = document.querySelector('.cards');
const nameInput = popupAdd.querySelector('#name-card');
const imageInput =popupAdd.querySelector('#image-url');
const cardTemp = document.querySelector("#card__temp").content;
const popupCardDelete = document.querySelector('.popup__delete');
const formDeleteCard = popupCardDelete.querySelector('.popup__form')

//импорт нужных объектов
import {closePopup, openPopup} from './utils.js';
import {popupImg} from './modal.js'
import {postNewCard, getResponseData, deleteCard, activeCardLike, deleteCardLike} from './api.js';
import { myUser } from '../index.js';

// *функция создания карточки
function createCard(name, link, likes, user, authorId, cardId) {
  const card = cardTemp.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = name;
  const cardImage = card.querySelector('.card__image');
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  activeteButtonTrash(card ,user._id, authorId, cardId);
  const counterLike = card.querySelector('.card__like-counter')
  const likeButton = card.querySelector('.card__button');
  toggleLike(likes, likeButton, user, counterLike)
  likeButton.addEventListener('mousedown', () => {pushButtonLike(likeButton ,cardId, counterLike)});
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
  const button = evt.submitter;
  button.value = 'Сохранение...'
  const name = nameInput.value;
  const link = imageInput.value;
  postNewCard(name, link)
  .then ((res) => getResponseData(res))
  .then ((card) => {
    cardsArea.prepend(createCard(card.name, card.link, card.likes, myUser, card.owner._id, card._id))
  });
  closePopup(popupAdd);
  formCard.reset();
  button.value = 'Создать'
  button.setAttribute('disabled', '');
  button.classList.add('popup__button_disabled');
}

//функция добавления кнопки удаления
const activeteButtonTrash = (card ,userId, authorId, cardId) => {
  if ((userId === authorId) || (authorId === myUser)) {
    const buttonForActive = card.querySelector('.card__button-trash');
    buttonForActive.classList.add('card__button-trash_active');
    buttonForActive.addEventListener('click', function (){
      openPopup(popupCardDelete);
      formDeleteCard.addEventListener('submit', (evt) => {
        evt.preventDefault();
        deleteCard(cardId)
        .then ((res) => {
          if (res.ok) {
            card.remove();
            closePopup(popupCardDelete);
          } else {
            console.log(res.error);
          }
        })
      })
    });
  }
}

//функция переключения состояния лайка и счетчика
const toggleLike = (likes, likeButton, user, counterLike) => {
  // инклюдес (likes.includes(user)) не захотел работать
  let likesID = [];
  likes.forEach(userData => {
    likesID.push(userData._id)
  })
  if (likesID.includes(user._id)) {
    likeButton.classList.add('card__button_active');
  } else {
    likeButton.classList.remove('card__button_active');
  }
  counterLike.textContent = likes.length;
}

//функция для обработки нажатия на лайк
function pushButtonLike( likeButton, cardId, counterLike)  {
  if (!likeButton.classList.contains('card__button_active')) {
    activeCardLike(cardId)
      .then ((res) => getResponseData(res))
      .then ((res) => {
        toggleLike (res.likes, likeButton, myUser, counterLike)
      })
  } else {
    deleteCardLike(cardId)
    .then ((res) => getResponseData(res))
    .then ((res) => {
      toggleLike (res.likes, likeButton, myUser, counterLike)
    })
  }
}


export {popupAdd, formCard, cardAdd, popupAddClose, createCard, handelFormAddCard, cardsArea}
