'use strict';

var imageEl = document.getElementById('catalog-images');
var leftEl = document.getElementById('left');
var centerEl = document.getElementById('center');
var rightEl = document.getElementById('right');

var allImages = []; //array to hold all object instances
var totalClicks = 0; //counter for total image clicks


function CatalogImages(name) {
  this.name = name;
  this.path = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allImages.push(this);
}

//Images to be passed into the constructor function
var allImageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];


allImageNames.forEach(function (imageName){
  new CatalogImages(imageName);
});

// function createRandomNumber () {
//   if (allImageNames.length === 0) {
//     allImageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
//   } else {
//     var rando = Math.floor(allImageNames.length * Math.random());


//     for (var i = 0; i < allImages.length; i++) {
//       if (allImages[i].name === allImageNames[rando] ){
//         var indexValue = i;
//         break;
//       }
//     }
//     allImageNames.splice(rando, 1);
//   }
//   return indexValue;
// }

function showRandomImage() {

  var randomLeft =  Math.floor(allImageNames.length * Math.random());
  var randomCenter =  Math.floor(allImageNames.length * Math.random());
  var randomRight =  Math.floor(allImageNames.length * Math.random());

  // to display 3 unique random numbers
  while (randomLeft === randomCenter || randomCenter === randomRight || randomRight === randomLeft) {
    randomLeft = Math.floor(allImages.length * Math.random());
    randomCenter = Math.floor(allImages.length * Math.random());
    randomRight = Math.floor(allImages.length * Math.random());
  }

  allImages[randomLeft].views++;
  leftEl.src = allImages[randomLeft].path;
  leftEl.title = allImages[randomLeft].name;

  allImages[randomCenter].views++;
  centerEl.src = allImages[randomCenter].path;
  centerEl.title = allImages[randomCenter].name;

  allImages[randomRight].views++;
  rightEl.src = allImages[randomRight].path;
  rightEl.title = allImages[randomRight].name;

}

showRandomImage();

imageEl.addEventListener('click', showAndTrackImages);

function showAndTrackImages (event){

  showRandomImage(event);

  var voteCount = allImageNames.indexOf(event.target.title);
  if (voteCount > -1){
    allImages[voteCount].votes++;
    totalClicks++;
  }

  var VOTED_CLICKS = 5;
  if (totalClicks === VOTED_CLICKS){
    imageEl.removeEventListener('click', showAndTrackImages);
    console.log('event listener removed.');
    // renderAllVotes(); //turn this off because it is a list
    createChartArrays();
    drawChart();
  }
}

CatalogImages.prototype.render = function (){
  var ulEl = document.createElement('ul');

  var liEl = document.createElement('li');
  liEl.textContent = `${this.name} was viewed ${this.views} times and clicked on ${this.votes} times.`;
  ulEl.appendChild(liEl);

  document.getElementById('print-results').appendChild(ulEl);
};

function renderAllVotes(){
  for(var i = 0; i < allImages.length; i++){
    allImages[i].render();
  }
}

//Prep for Chart Stuff
var chartDataVotes = [];
var chartDataNames = [];
var chartDataViews = [];
var productChart; //for chart

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
    data: chartDataVotes,
    backgroundColor: 'navy',
    hoverBackgroundColor: 'grey'
  }]
};

function drawChart() {
  var cxt = document.getElementById('product-graph').getContext('2d');
  productChart = new Chart(cxt, {
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
          stepSize: 1.0
        }
      }]
    }
  });
}