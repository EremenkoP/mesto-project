//* задание базовых функций
const config = {
  baseUrl: 'https://nomoreparties.co/plus-cohort-6/',
  headers: {
    Authorization: '5923b0c0-8adb-4b17-b276-927b1555a3bd',
    'Content-Type': 'application/json'
  }
};
// получение ответа в JSе сразу
const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};
//получение исходных данных пользователя
const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then(res => getResponseData(res));
};
//получение исходных данных картинок
const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(res => getResponseData(res));
};
//объединение запросов для одновременной работы
const getAppInfo = () => {
  return Promise.all([getUser(), getCards()]);
};
// отправка данных на сервер для изменения данных пользователя
const changesDataProfile = (newName, newProfession) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName.value,
      about: newProfession.value
    })
  })
}
// отправка данных новой карточки
const postNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
}

//импорт
  export {getAppInfo, changesDataProfile, postNewCard}
