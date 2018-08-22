'use strict';

var imageEl = document.getElementById('catalog-images');
var leftEl = document.getElementById('left');
var centerEl = document.getElementById('center');
var rightEl = document.getElementById('right');

var allImages = []; //array to hold all object instances
var totalClicks = 0; //counter for total image clicks

//local Storage keys
var USER_DATA = 'userData';
var USER_CLICK_COUNT = 'clickCount';


function CatalogImages(name) {
  this.name = name;
  this.path = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allImages.push(this);
}

//Images to be passed into the constructor function
var allImageFileNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];


allImageFileNames.forEach(function (imageName){
  new CatalogImages(imageName);
});

function createRandomNumber () {
  if (allImageFileNames.length === 0) {
    allImageFileNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
  }

  var rando = Math.floor(allImageFileNames.length * Math.random());
  var indexValue = 0;

  for (var i = 0; i < allImages.length; i++) {
    if (allImages[i].name === allImageFileNames[rando]){
      indexValue = i;
    }
  }
  allImageFileNames.splice(rando, 1);
  return indexValue;
}

function renderImage(image,element) {
  allImages[image].views++;
  element.src = allImages[image].path;
  element.title = allImages[image].name;
  element.alt = allImages[image].name;
}

function showRandomImage() {
  var randomLeft = createRandomNumber();
  var randomCenter = createRandomNumber();
  var randomRight = createRandomNumber();

  renderImage(randomLeft,leftEl);
  renderImage(randomCenter,centerEl);
  renderImage(randomRight,rightEl);
}

imageEl.addEventListener('click', showAndTrackImages);

function showAndTrackImages (event){
  showRandomImage(event);
  tallyClicks(event);
}

function tallyClicks(event) {
  for( var i = 0; i < allImages.length; i++){
    if (allImages[i].name === event.target.title){
      console.log(event.target.title);
      allImages[i].votes++;
      totalClicks++;
      localStorage.setItem(USER_DATA, JSON.stringify(allImages)); // Save allImages data locally
      localStorage.setItem(USER_CLICK_COUNT, JSON.stringify(totalClicks));//Save click total
    }
  }

  var VOTED_CLICKS = 26;

  if (totalClicks >= VOTED_CLICKS){
    imageEl.removeEventListener('click', showAndTrackImages);
    console.log('event listener removed.');

    createChartArrays();
    drawChart();
  }
}

//Prep for Chart Stuff
var chartDataVotes = [];
var chartDataNames = [];
var chartDataViews = [];
var productChart; // eslint-disable-line

function createChartArrays (){
  for (var i = 0; i < allImages.length; i++){
    chartDataVotes[i] = allImages[i].votes;
    chartDataNames[i] = allImages[i].name;
    chartDataViews[i] = allImages[i].views;
  }
}

//Chart Stuff
var data = {
  labels: chartDataNames,
  datasets: [{
    label: '# of Votes',
    data: chartDataVotes,
    backgroundColor: 'rgba(255, 206, 86)',
    hoverBackgroundColor: 'grey'
  }]
};

function drawChart() {
  var cxt = document.getElementById('product-graph').getContext('2d');
  productChart = new Chart(cxt, { // eslint-disable-line
    type: 'bar',
    data: data,
    options: {
      responsive: false,
      animation: {
        duration: 1000,
        easing: 'easeOutBounce'
      }
    },
    scales: {
      yAxes: [{
        ticks:{
          max: 10,
          min: 0,
          stepSize: 1
        }
      }]
    }
  });
}

//LOCAL STORAGE STUFF
if (localStorage.getItem(USER_DATA) === null || localStorage.getItem(USER_CLICK_COUNT) === null){
  showAndTrackImages();
} else {
  allImages = JSON.parse(localStorage.getItem(USER_DATA));
  totalClicks = JSON.parse(localStorage.getItem(USER_CLICK_COUNT));
  showAndTrackImages();
}