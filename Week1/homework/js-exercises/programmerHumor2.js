"use strict";
const url = "https://xkcd.com/info.0.json";
// Inside the same file write two functions:

// one with XMLHttpRequest,
function getImgByXhr() {
  const xhr = new XMLHttpRequest();
  
  xhr.responseType = "json";

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      console.log(xhr.response);
      const img = document.getElementById('humor-xhr');
      img.src = xhr.response.img;
      img.alt = xhr.response.alt;
      img.title = xhr.response.title;

    } else {
      console.log("Http error", xhr.status);
    }
  }

  xhr.onerror = function (error) {
    console.log('Server error ; ', error)
  }

  xhr.open("GET", url);
  xhr.send();
}

//and the other with axios
function getImgByAxios() {


  axios.get(url)
    .then(function (response) {
      // handle success
      const img = document.getElementById('humor-axios');
      console.log(response.data);
      img.src = response.data.img;
      img.alt = response.data.alt;
      img.title = response.data.title;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

// When click the programmer humor button result will display on screen
document.getElementById('programmer-humor-btn').addEventListener('click', function () {
  document.getElementById('programmerHumor').style.display = 'block';
  document.getElementById('dogPhotoGallery').style.display = 'none';
  getImgByXhr();
  getImgByAxios();
});

// The End
