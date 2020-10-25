const baseUrl = process.env.SERVICES_API_URL;

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
 * Función para llamar a los servicios con el token
 * @param {*} endpoint Servicio al que llamamos
 * @param {*} data Objeto con los datos de llamada
 * @param {*} method Tipo de petición (POST, GET, PUT...)
 */

const fetchConToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`; // ej: localhost:4000/api/auth
  const token = localStorage.getItem('token') || '';
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

export { fetchSinToken, fetchConToken };
