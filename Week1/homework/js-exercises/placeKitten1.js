
"use strict";

// Inside the same file write two functions:

// one with XMLHttpRequest,
function getAPIByXhr() {
  const xhr = new XMLHttpRequest();
  const url = "https://www.randomuser.me/api"

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      console.log(JSON.parse(xhr.response));
    } else {
      console.log("Http error ; ", xhr.status);
    }
  }
  xhr.onerror = function (error) {
    console.log('Server error ; ', error)
  }
  xhr.open("GET", url);
  xhr.send();
}

// and the other with axios
function getAPIByAxios() {
  const url2 = "https://www.randomuser.me/api";

  axios.get(url2)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}


window.onload = function () {
  getAPIByXhr();
  getAPIByAxios();
}

// The End