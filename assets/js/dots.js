

// find .dotsContainer
var dotsContainer = document.querySelector('.dotsContainer');

rowSize = 100;
columnSize = 100;


// add "." chars to the .dotsContainer
for (var i = 0; i < rowSize; i++) {
  var dots = document.createElement('p');
    dots.classList.add('dots');
  for (var j = 0; j < columnSize; j++) {
    dots.textContent += '.';
  }
  dotsContainer.appendChild(dots);

}
