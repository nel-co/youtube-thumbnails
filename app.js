const input = document.querySelector('.yt-url');
const button = document.querySelector('.submit');
const imageBox = document.querySelector('.image-container');
const image = document.querySelector('a');

let url;
let youtubeImgData = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyAG7ECVg-NFDAnyfm6rONLWOhIYEsoBMxc&id=';

button.addEventListener('click', getUrl);
document.addEventListener('keydown', enterPress)

function enterPress(e) {
  if(e.which == 13 && input.value != '') {
    getUrl();
    console.log('enter');
  }
}

function getUrl() {
  url = input.value.split('=')[1];
  if (input.value != '') {
    url = youtubeImgData + url;
    fetch(url).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data.items[0].snippet.thumbnails)
      delay(data.items[0].snippet.thumbnails);
    })
  }
}

function delay(link) {
  setTimeout(function() {
    if ('maxres' in link) {
      setImage(link.maxres.url);
    } else if ('high' in link) {
      setImage(link.high.url);
    } else {
      setImage(link.default.url);
    }
  },1000)
  input.value = '';
}

function setImage(imgUrl) {
  image.setAttribute('href',imgUrl);
  image.innerHTML = '<img src="' + imgUrl + '">';
}