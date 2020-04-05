function _checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText)) // this will trigger catch
  }
}

// @ts-ignore
function _parseJson(response): Promise<any> {
  return response.json();
}

function _parseBlob(response) {
  return response.blob();
}

function _fetch(url, method, headers?: object): Promise<any> {
  return window.fetch(url, {method, ...headers})
    .then(_checkStatus)
    .catch((error) => {
      console.error(error);
    });
}

export function getImage(url): Promise<File> {
  if (!url) return;
  return _fetch(url, 'GET')
    .then(_parseBlob)
    .catch((error) => {
      console.error(error);
    });
}
