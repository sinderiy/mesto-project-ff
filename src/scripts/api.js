// описаны функции запросов к серверу;
// запросы присвоены переменным и экспоритруются;
// ответ сервера всегда проверяется на корректность проверкой res.ok;
// в конце цепочки обработки каждого промиса обращения к серверу есть обработка ошибок;
// обрабатывать ошибки попавшие в catch;
// в функциях запросов нет работы с DOM 
// базовый адрес сервера и ключ авторизации вынесены отдельно и переиспользуются;
// запросы: 
// получение данных пользователя и карточек,
// обновление данных пользователя, 
// обновление аватара пользователя, 
// запросы добавления, удаления и лайка карточек;
// карточки отображаются на странице только после получения _id пользователя для чего применен Promiss.all;

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
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Запрос getUserInfo завершился с ошибкой: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // "если что-то пошло не так"
    });
};

// Получение массива карточек
export const getInitialCards = () => {
  return fetch(`${config.baseURL}/cards`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Запрос getInitialCards завершился с ошибкой: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // "если что-то пошло не так"
    });
};

// Обновление информации профиля
export const patchUserInfo = (userName, userAbout) => {
  return fetch(`${config.baseURL}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      name: userName,
      about: userAbout
    })
  });
}

// Добавление новой карточки на сервер
export const addNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseURL}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
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
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    }
  });
}