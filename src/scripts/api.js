// Конфигурация запросов
const config = {
  baseURL: 'https://nomoreparties.co/v1/wff-cohort-20',
  headers: {
    authorization: '320df562-e03c-4e12-adb7-946c662f4a40',
    'Content-Type': 'application/json'
  }
}

// Получение данных пользователя
export const getUserInfo = () => {
  return fetch(`${config.baseURL}/users/me`, {
    headers: config.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Запрос getUserInfo завершился с ошибкой: ${res.status}`);
    });
};

// Получение массива карточек
export const getInitialCards = () => {
  return fetch(`${config.baseURL}/cards`, {
    headers: config.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Запрос getInitialCards завершился с ошибкой: ${res.status}`);
    });
};

// Обновление информации профиля
export const patchUserInfo = (userName, userAbout) => {
  return fetch(`${config.baseURL}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Запрос patchUserInfo завершился с ошибкой: ${res.status}`);
  });
}

// Добавление новой карточки на сервер
export const addNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseURL}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Запрос addNewCard завершился с ошибкой: ${res.status}`);
    });
}

// Удаление карточки на сервере
export const deleteCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Запрос deleteCard завершился с ошибкой: ${res.status}`);
  });
}

// Постановка лайка
export const putLike = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Запрос putLike завершился с ошибкой: ${res.status}`);
  });
}

// Удаление лайка
export const deleteLike = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Запрос deleteLike завершился с ошибкой: ${res.status}`);
  });
}

// Обновление аватара пользователя
export const patchUserAvatar = (avatarURL) => {
  return fetch(`${config.baseURL}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarURL
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Запрос patchUserAvatar завершился с ошибкой: ${res.status}`);
  });
}

