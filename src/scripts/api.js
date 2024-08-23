// Конфигурация запросов
const config = {
  baseURL: 'https://nomoreparties.co/v1/wff-cohort-20',
  headers: {
    authorization: '320df562-e03c-4e12-adb7-946c662f4a40',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (fetchPromise, functionName) => {
  return fetchPromise.then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Запрос ${functionName} завершился с ошибкой: ${res.status}`);
  });
}

// Получение данных пользователя
export const getUserInfo = () => {
  const fetchPromise = fetch(`${config.baseURL}/users/me`, {
    headers: config.headers
  });
  return handleResponse(fetchPromise, 'getUserInfo');
};

// Получение массива карточек
export const getInitialCards = () => {
  const fetchPromise = fetch(`${config.baseURL}/cards`, {
    headers: config.headers
  });
  return handleResponse(fetchPromise, 'getInitialCards');
};

// Обновление информации профиля
export const patchUserInfo = (userName, userAbout) => {
  const fetchPromise = fetch(`${config.baseURL}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout
    })
  });
  return handleResponse(fetchPromise, 'patchUserInfo');
}

// Добавление новой карточки на сервер
export const addNewCard = (cardName, cardLink) => {
  const fetchPromise = fetch(`${config.baseURL}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  });
  return handleResponse(fetchPromise, 'addNewCard');
}

// Удаление карточки на сервере
export const deleteCard = (cardId) => {
  const fetchPromise = fetch(`${config.baseURL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  });
  return handleResponse(fetchPromise, 'deleteCard');
}

// Постановка лайка
export const putLike = (cardId) => {
  const fetchPromise = fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  return handleResponse(fetchPromise, 'putLike');
}

// Удаление лайка
export const deleteLike = (cardId) => {
  const fetchPromise = fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  return handleResponse(fetchPromise, 'deleteLike');
}

// Обновление аватара пользователя
export const patchUserAvatar = (avatarURL) => {
  const fetchPromise = fetch(`${config.baseURL}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarURL
    })
  })
  return handleResponse(fetchPromise, 'patchUserAvatar');
}

