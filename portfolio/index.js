console.log("Score: 70 / 70");
console.log("Все пункты выполнены");

import i18Obj from "./js/translate.js";
// Hamburger 
const hamburger = document.querySelector(".hamburger");
const nav_list = document.querySelector(".nav_list");
const blackout = document.querySelector(".blackout");
const nav_link = document.querySelectorAll(".nav_link");
function toggleMenu() {
  hamburger.classList.toggle("open");
  nav_list.classList.toggle("open");
  blackout.classList.toggle("overlay");
}
hamburger.addEventListener("click", toggleMenu);
nav_list.addEventListener("click", toggleMenu);

const imageButton = document.querySelectorAll('.image-button');
const portfolioImages = document.querySelectorAll('.portfolio-image');
const portfolioButtons = document.querySelector('.portfolio-buttons');
const langButton = document.querySelector('.lang-button');
const langEn = document.querySelector('.lang-button-en');
const langRu = document.querySelector('.lang-button-ru');

//  Change image
function changeImage(event) {
  if(event.target.classList.contains('image-button')) { 
    portfolioImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`); 
}
//  Change class active
imageButton.forEach((imageButton) => imageButton.classList.remove('active'));
event.target.classList.add('active');

}
portfolioButtons.addEventListener('click', changeImage);

//  Change language
function getTranslate(lang) {
  const list = document.querySelectorAll('[data-i18]');
  list.forEach((element) => {
   element.textContent = i18Obj[lang][element.dataset.i18];
  });
  }
  langRu.addEventListener('click', () => {
    getTranslate('ru');
  });
  langEn.addEventListener('click', () => {
    getTranslate('en');
  });
  
  
 
// Поиск основного раздела 
const bodySection = document.querySelectorAll('.body'); 
const themeSwitch = document.querySelector('.themeswitch');
const sectionTitle = document.querySelectorAll('.section-title');
const span = document.querySelectorAll('.span');
const p = document.querySelectorAll('.p');
const h3 = document.querySelectorAll('.h3');

function changeTheme () {
  themeSwitch.classList.toggle('light') ;
  if (themeSwitch.classList.contains('light')) {
    bodySection.forEach(element => element.classList.add('light'));
    imageButton.forEach(element => element.classList.add('light'));
    sectionTitle.forEach(element => element.classList.add('light'));
    span.forEach(element => element.classList.add('light'));
    p.forEach(element => element.classList.add('light'));
    h3.forEach(element => element.classList.add('light'));
      
  }else {
    bodySection.forEach(element => element.classList.remove('light'));
    imageButton.forEach(element => element.classList.remove('light'));
    sectionTitle.forEach(element => element.classList.remove('light'));
    span.forEach(element => element.classList.remove('light'));
    p.forEach(element => element.classList.remove('light'));
    h3.forEach(element => element.classList.remove('light'));
    
  }
 
}
themeSwitch.addEventListener( 'click',changeTheme);

// Video

const video = document.querySelector('.video-viewer');
const videoButton = document.querySelector('.video-button');
const playButton = document.querySelector('.play-button');
let isPlay = false; 
function playVideo() {
  if(!isPlay) {
  video.play();
  isPlay = true;
}else {
  video.pause();
  isPlay = false;
}
videoButton.classList.toggle('play');
playButton.classList.toggle('play');
}
video.addEventListener( 'click', playVideo);
videoButton.addEventListener('click', playVideo);
playButton.addEventListener('click', playVideo);
video.addEventListener('ended', playVideo);

// Audio
const volumeValue = document.querySelector('.volume__slider');
const volumeButton = document.querySelector('.volume-button');
function volumeToggle() {
  if (video.muted === false) {
    video.muted = true; 
  } else {
    video.muted = false;
    
  }
  volumeButton.classList.toggle('muted');
}console.log(video.volume);

volumeButton.addEventListener('click', volumeToggle);

function checked() {
  if (volumeValue !=='0') {
    volumeButton.classList.contains('muted');
    video.muted = false;
    video.volume = 0;
    volumeButton.classList.add('muted');
  } else {
    video.muted = true;
    volumeButton.classList.remove('muted');
  }
  
  console.log(video.volume);
}
volumeValue.addEventListener('input', checked);

const volumeSliderText = document.querySelector('.volume__slider__text');
function volumeUpdate() {
  video[this.name] = this.value;
  volumeSliderText.textContent = `${Number((video[this.name]) * 100).toFixed()}%`;
}

volumeValue.addEventListener('input', volumeUpdate);
volumeValue.addEventListener('mousemove', volumeUpdate);

// Progress bar
const progressBar = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress-filled');

function barProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}
  
video.addEventListener('timeupdate', barProgress);

function progress(e) {
  const progressTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = progressTime;
  
}

let mousedown = false;
let drag = false;
progressBar.addEventListener('mouseout', () => drag = false);
progressBar.addEventListener('mouseover', () => drag = true);
progressBar.addEventListener('click', progress);
progressBar.addEventListener('mousedown', () => mousedown = true);
progressBar.addEventListener('mouseup', () => mousedown = false);


// full screen

const fullscreenButton = document.querySelector('.fullscreen-button');
const videoPlayer = document.querySelector('.video-player');


function toggleFullscreen() {
 
  if (!document.fullscreenElement) {
    videoPlayer.requestFullscreen().catch(err => {
      alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
  fullscreenButton.classList.toggle('active');
}
fullscreenButton.addEventListener('click', toggleFullscreen);

// Timer

const currentTime = document.querySelector('.current-time');
const totalTime= document.querySelector('.total-time');

function totalTimeUpdate() {
  let num = video.duration;
  let minutes = Math.floor(num / 60);
  if (minutes < 10) {
    minutes = '0' + String(minutes);
 }
 let seconds = Math.floor(num % 60); 
  if (seconds < 10) {
    seconds = '0' + String(seconds);
 }
  totalTime.textContent = `${minutes}:${seconds}`;
}
video.addEventListener('timeupdate', totalTimeUpdate);


function currentTimeUpdate() {
  let num = video.currentTime;
  let minutes = Math.floor(num / 60);
  if (minutes < 10) {
    minutes = '0' + String(minutes);
 }
  let seconds = Math.floor(num % 60);    
  if (seconds < 10) {
    seconds = '0' + String(seconds);
 } 
  currentTime.textContent = `${minutes}:${seconds}`;
}
video.addEventListener('timeupdate', currentTimeUpdate);
video.addEventListener('ended', () => video.currentTime = '0');



  


  
