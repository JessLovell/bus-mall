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

function createRandomNumber () {
  if (allImageNames.length === 0) {
    allImageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
  } else {
    var rando = Math.floor(allImageNames.length * Math.random());
    

    for (var i = 0; i < allImages.length; i++) {
      if (allImages[i].name === allImageNames[rando] ){
        var indexValue = i;
        break;
      }
    }
    allImageNames.splice(rando, 1);
  }
  return indexValue;
}

function showRandomImage() {

  //   var rando = Math.floor(allImages.length * Math.random());
  var randomLeft = createRandomNumber();
  var randomCenter = createRandomNumber();
  var randomRight = createRandomNumber();


  //to display 3 unique random numbers
  //   while (randomLeft === randomCenter || randomCenter === randomRight || randomRight === randomLeft) {
  //     randomLeft = Math.floor(allImages.length * Math.random());
  //     randomCenter = Math.floor(allImages.length * Math.random());
  //     randomRight = Math.floor(allImages.length * Math.random());
  //   }

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

  var votedClicks = 26;
  if (totalClicks === votedClicks){
    imageEl.removeEventListener('click', showAndTrackImages);
    console.log('event listener removed.');
  }
}