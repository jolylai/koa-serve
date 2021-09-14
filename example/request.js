function getBody(xhr) {
  const data = xhr.responseText || xhr.response;
  console.log("data: ", data);
}

function request(options) {
  return new Promise((resolve, reject) => {
    const { url, method = "get", data = null } = options;

    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
      getBody(xhr);
    };

    xhr.open(method, url, true);
    xhr.send(data);
  });
}

export default request;
