
"use strict";

const url = "https://dog.ceo/api/breeds/image/random";
const buttonXhr = document.getElementById('xhr');
const buttonAxios = document.getElementById('axios');
const ul = document.querySelector('ul');
ul.style.listStyleType = "none";

buttonXhr.onclick = getImgByXhr;
buttonAxios.onclick = getImgByAxios;

// Inside the same file write two functions:
// one with XMLHttpRequest,
function getImgByXhr() {
  const xhr = new XMLHttpRequest();
  
  xhr.responseType = "json";

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      const li = document.createElement('li');
      li.innerHTML = `
      <img src="${xhr.response.message}" width="200" height="200">
      `;
      ul.appendChild(li);

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
      const li = document.createElement('li');
      li.innerHTML = `
      <img src="${response.data.message}" width="200" height="200">
      `;
      ul.appendChild(li);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}


// When click the programmer humor button result will display on screen
document.getElementById('dog-photo-gallery-btn').addEventListener('click', function () {
  ul.innerHTML = "";
  document.getElementById('dogPhotoGallery').style.display = 'block';
  document.getElementById('programmerHumor').style.display = 'none';
});


// The End
