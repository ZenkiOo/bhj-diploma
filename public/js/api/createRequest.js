/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options) => {
  const request = new XMLHttpRequest();
  request.withCredentials = true;
  request.responseType = "json";

  request.addEventListener("readystatechange", () => {
    if (request.readyState === 4 && request.status === 200) {
      options.callback(request.response.error, request.response);
    }
  });

  const formData = new FormData();

  if (options.method === "GET") {
    let paramsString = options.url;
    if (options.data !== null && Object.keys(options.data).length > 0) {
      paramsString += "?";
      const dataKeys = Object.keys(options.data);
      for (let i = 0; i < dataKeys.length; i++) {
        if (i > 0) {
          paramsString += "&";
        }
        paramsString += `${dataKeys[i]}=${options.data[dataKeys[i]]}`;
      }
    }
    request.open(options.method, paramsString, true);

  } else if (options.method) {
    if (options.data) {
      for (const key of Object.keys(options.data)) {
        formData.append(key, options.data[key]);
      }
    }
    request.open(options.method, options.url, true);
  }

  request.send(formData);
  return request;
};
