/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static URL = "";
  static list(data, callback = (f) => f) {
    const options = {
      url: this.URL,
      method: "GET",
      data,
      callback,
    };
    return createRequest(options);
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback = (f) => f) {
    const options = {
      url: this.URL,
      method: "POST",
      data,
      callback,
    };
    if (!data) {
      options.data = {};
    }
    options.data._method = "PUT";
    return createRequest(options);
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get(id = "", data, callback = (f) => f) {
    const options = {
      url: this.URL,
      method: "GET",
      data,
      callback,
    };
    if (id) {
      options.url += "/" + id;
    }
    return createRequest(options);
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(id = "", data, callback = (f) => f) {
    const options = {
      url: this.URL + "/",
      method: "POST",
      data,
      callback,
    };
    if (!data) {
      options.data = {};
    }
    options.data._method = "DELETE";
    options.data.id = id;
    return createRequest(options);
  }
}
