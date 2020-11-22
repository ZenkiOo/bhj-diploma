/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = "/user";

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem("user");
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.user) {
      return JSON.parse(localStorage.getItem("user"));
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback = (f) => f) {
    const options = {
      url: User.URL + "/current",
      method: "GET",
      responseType: "json",
      data,
      callback: (err, response) => {
        if (response.success === true) {
          User.setCurrent(response.user);
        } else {
          console.error("Ошибка текущей сессии.", err);
          User.unsetCurrent();
        }
        callback(err, response);
      },
    };
    createRequest(options);
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback = (f) => f) {
    const options = {
      url: User.URL + "/login",
      method: "POST",
      responseType: "json",
      data,
      callback: (err, response) => {
        if (response.success === true) {
          User.setCurrent(response.user);
        } else {
          console.error("Ошибка при входе.", err);
        }
        callback(err, response);
      },
    };
    return createRequest(options);
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback = (f) => f) {
    const options = {
      url: User.URL + "/register",
      method: "POST",
      responseType: "json",
      data,
      callback: (err, response) => {
        if (response.success === true) {
          User.setCurrent(response.user);
        } else {
          console.error("Ошибка при регистрации", err);
        }
        callback(err, response);
      },
    };
    return createRequest(options);
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback = (f) => f) {
    const options = {
      url: User.URL + "/logout",
      method: "POST",
      responseType: "json",
      data,
      callback: (err, response) => {
        if (response.success === true) {
          User.unsetCurrent();
        } else {
          console.error("Ошибка при выходе", err);
        }
        callback(err, response);
      },
    };
    return createRequest(options);
  }
}
