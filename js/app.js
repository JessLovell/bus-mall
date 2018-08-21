'use strict';

var imageEl = document.getElementById('catalog-images');
var leftEl = document.getElementById('left');
var centerEl = document.getElementById('center');
var rightEl = document.getElementById('right');

var allImages = [];
var totalClicks = 0;


function CatalogImages(name) {
  this.name = name;
  this.path = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allImages.push(this);
}

var allImageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

allImageNames.forEach(function (imageName){
  new CatalogImages(imageName);
});

function showRandomImage(event) {
  var randomLeft = Math.floor(allImages.length * Math.random());
  var randomCenter = Math.floor(allImages.length * Math.random());
  var randomRight = Math.floor(allImages.length * Math.random());
  var uniqueRandomIndex = [randomRight, randomCenter, randomLeft];
  console.log[`outside: ${uniqueRandomIndex}`];

  //to display 3 unique random numbers
  while (randomLeft === randomCenter || randomCenter === randomRight || randomRight === randomLeft) {
    randomLeft = Math.floor(allImages.length * Math.random());
    randomCenter = Math.floor(allImages.length * Math.random());
    randomRight = Math.floor(allImages.length * Math.random());
    uniqueRandomIndex = [randomRight, randomCenter, randomLeft];
    console.log(`Inside unique loop ${uniqueRandomIndex}`);
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


imageEl.addEventListener('click', function(event){

  showRandomImage(event);

  var voteCount = allImageNames.indexOf(event.target.title);
  if (voteCount > -1){
    allImages[voteCount].votes++;
    totalClicks++;
  }

});