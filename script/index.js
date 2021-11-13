// **все что нужно из страницы
// вынимаю глобальные кнопки
const changesProfile = document.querySelector('.profile__button-changes-profile');
const cardAdd = document.querySelector('.profile__button-add');
// вынимаю попапы
const popupProfile = document.querySelector('.popup__profile');
const popupAdd = document.querySelector('.popup__add');
const popupImg = document.querySelector('.popup__view-image');
// вынимаю кнопки закрытия попапов
const popupProfileClose = popupProfile.querySelector('.popup__button-close');
const popupAddClose = popupAdd.querySelector('.popup__button-close');
const popupImgClose = popupImg.querySelector('.popup__button-close');
// вынимаю значения форм для попапов
const formProfile = popupProfile.querySelector('.popup__form');
const formCard = popupAdd.querySelector('.popup__form');
// базовый набор карточек и элементов
const profileName = document.querySelector('.profile__name');
const profileProfesion  = document.querySelector('.profile__profession');
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
// *загрузка начальных картинок
initialCards.forEach(function(item){
  const name = item.name;
  const link = item.link;
  document.querySelector('.cards').prepend(createCard(name, link));
});

// * функции открытия и закрытия модалок.
function popupOpened(popup){
  popup.classList.add('popup_opened');
};
function popupClosed(popup){
  popup.classList.remove('popup_opened');
};

// *изменения профиля
// открытие и закрытие попапа
function popupProfileOpened(){
  popupOpened(popupProfile);
  const formName = formProfile.querySelector('#name');
  formName.setAttribute('value', profileName.textContent);
  const formProfesion = formProfile.querySelector('#proffesion');
  formProfesion.setAttribute('value', profileProfesion.textContent);
};
changesProfile.addEventListener('click', popupProfileOpened);
popupProfileClose.addEventListener('click', function(){
   popupClosed(popupProfile);
});
// Работа с именем и профессией
function profileChanges (evt) {
  evt.preventDefault();
  const formName = formProfile.querySelector('#name');
  profileName.textContent = formName.value;
  const formProfesion = formProfile.querySelector('#proffesion');
  profileProfesion.textContent = formProfesion.value;
  popupClosed(popupProfile);
}
formProfile.addEventListener('submit', profileChanges);

//*Добавление новой карточки
// открытие и закрытие попапа
cardAdd.addEventListener('click', function(){
  popupOpened(popupAdd);
});
popupAddClose.addEventListener('click',  function(){
  popupClosed(popupAdd);
});
// Добавление новой карточки
function formAddCard (evt) {
  evt.preventDefault();
  const name = popupAdd.querySelector('#name-card').value;
  const link = popupAdd.querySelector('#image-url').value;
  document.querySelector('.cards').prepend(createCard(name, link));
  formCard.reset();
  popupClosed(popupAdd);
}

const popupLetCard = popupAdd.querySelector('.popup__button');
formCard.addEventListener('submit', formAddCard);

// закрытие модалки с картинкой
popupImgClose.addEventListener('click', function(){
  popupClosed(popupImg);
});
