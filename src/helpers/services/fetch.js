const baseUrl = process.env.REACT_APP_SERVICES_API_URL;

/**
 * Función para llamar a los servicios sin el token
 * @param {*} endpoint Servicio al que llamamos
 * @param {*} data Objeto con los datos de llamada
 * @param {*} method Tipo de petición (POST, GET, PUT...)
 */

const fetchSinToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`; // ej: localhost:4000/api/auth
  if (method === 'GET') {
    return fetch(url);
  } else {
    return fetch(url, {
      method: method,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
};

/**
 * Función para llamar a los servicios con los query params
 * @param {*} endpoint
 * @param {*} data
 * @param {*} options ej {queryParams:{token:'00213', param: 'sdadas'}}
 * @param {*} method
 */
const fetchSinTokenParams = (endpoint, data, options = {}, method = 'GET') => {
  let url = `${baseUrl}/${endpoint}`; // ej: localhost:4000/api/auth

  options = {
    method: method,
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
    ...options,
  };
  if (options.queryParams) {
    url +=
      (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.queryParams);
    delete options.queryParams;
  }
  if (method === 'GET') {
    return fetch(url);
  } else {
    return fetch(url, options);
  }
};

/**
 * Función para llamar a los servicios con el token
 * @param {*} endpoint Servicio al que llamamos
 * @param {*} data Objeto con los datos de llamada
 * @param {*} method Tipo de petición (POST, GET, PUT...)
 */

const fetchConToken = (endpoint, data, method = 'GET', tokenIn = null) => {
  const url = `${baseUrl}/${endpoint}`; // ej: localhost:4000/api/auth
  let token = '';
  if (!tokenIn) {
    token = localStorage.getItem('token') || '';
  } else {
    token = tokenIn;
  }

  if (method === 'GET') {
    return fetch(url, {
      method,
      headers: {
        'x-token': token,
      },
    });
  } else {
    return fetch(url, {
      method: method,
      headers: {
        'Content-type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify(data),
    });
  }
};

/**
 * Función para llamar a los servicios con los query params
 * @param {*} endpoint
 * @param {*} data
 * @param {*} options ej {queryParams:{param1:'00213', param2: 'sdadas'}}
 * @param {*} method
 */
const fetchConTokenParams = (endpoint, data, options = {}, method = 'GET') => {
  let url = `${baseUrl}/${endpoint}`; // ej: localhost:4000/api/auth
  const token = localStorage.getItem('token') || '';
  options = {
    method: method,
    headers: {
      'x-token': token,
    },
    body: JSON.stringify(data),
    ...options,
  };
  if (options.queryParams) {
    url +=
      (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.queryParams);
    delete options.queryParams;
  }
  if (method === 'GET') {
    delete options.body;
    return fetch(url);
  } else {
    options.headers?.push({ 'Content-type': 'application/json' });
    return fetch(url, options);
  }
};

function queryParams(params) {
  return Object.keys(params)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
}

export {
  fetchSinToken,
  fetchConToken,
  fetchSinTokenParams,
  fetchConTokenParams,
};
