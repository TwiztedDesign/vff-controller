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

function _fetch(url, method, headers?: object): Promise<any> {
  return window.fetch(url, {method, ...headers})
    .then(_checkStatus)
    .catch((error) => {
      console.error(error);
      return Promise.reject();
    });
}

export function getImage(url: string, progressCallback?: Function): Promise<File> {
  if (!url) return;
  return _fetch(url, 'GET')
    .then(async response => {
      try {
        const type = response.headers.get('content-type');
        const length = response.headers.get('content-length');
        if (length) {
          const array = new Uint8Array(length);
          let at = 0;  // to index into the array
          const reader = response.body.getReader();
          for (; ;) {
            const {done, value} = await reader.read();
            if (done) {
              break;
            }
            array.set(value, at);
            at += value.length;
            progressCallback && progressCallback((at / length) * 100);
          }
          return new File([array], url, {type});
        }
      } catch (err) {
        console.error(err);
        return Promise.reject();
      }
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject();
    });
}

export function readFileAsync(file): Promise<string | ArrayBuffer> {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  })
}

export function secToTimeString(timeInSeconds: number): string {
  const date = new Date(0);
  date.setMilliseconds(timeInSeconds * 1000);
  return date.toISOString().substr(11, 12);
}

export function isColor(strColor) {
  const s = new Option().style;
  s.color = strColor;
  const test1 = s.color == strColor;
  const test2 = /(^#[0-9A-F]{8}$)|(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(strColor);
  return (test1 == true || test2 == true);
}
