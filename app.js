'use strict';

var app = new Application();

var startButton = document.querySelector('#startButton');
var stopButton = document.querySelector('#stopButton');
var character = document.querySelector('div');
var input = document.querySelector('input');
var isShiftPressed = false;

var pixels;


var addPx = function(string, int) {
  string = string.slice(0, -2);
  string = Number(string) + int + 'px';
  return string;
};

var removePx = function(string, int) {
  string = string.slice(0, -2);
  string = Number(string) - int + 'px';
  return string;
};

var addDeg = function(string) {
  string = string.slice(7, -4);
  string = 'rotate(' + (Number(string) + 15) + 'deg)';
  return string;
};

var removeDeg = function(string) {
  string = string.slice(7, -4);
  string = 'rotate(' + (Number(string) - 15) + 'deg)';
  return string;
};

// functions released and moving to be passed in EventListener
var released = function (event) {
  if(event.keyCode === 16) {
    isShiftPressed = false;
  };
}

var moving = function (event) {
  if (!isShiftPressed) {
    switch (event.keyCode) {
      case 37:
        character.style.left = removePx(character.style.left, pixels);
        console.log(character.style.left);
          break;

      case 38:
        character.style.top = removePx(character.style.top, pixels);
        console.log(character.style.left);
          break;

      case 39:
        character.style.left = addPx(character.style.left, pixels);
        console.log(character.style.left);
          break;

      case 40:
        character.style.top = addPx(character.style.top, pixels);
        console.log(character.style.left);
          break;

      case 16:
        isShiftPressed = true;
          break;
    };
  }
  else {
    switch (event.keyCode) {
      case 37:
        character.style.transform = removeDeg(character.style.transform);
          break;

      case 39:
        character.style.transform = addDeg(character.style.transform);
          break;

    };
  };
};


function Application() {
    this.start = function() {
      pixels = Number(input.value);
      if (isNaN(pixels)) {
        pixels = 30;
      }
      else if(pixels > 50) {
        pixels = 50;
      }
      else if(pixels < 10) {
        pixels = 10;
      };
      console.log('Gotta Go Fast! You\'ve chosen ' + pixels + 'px');
      // only 'keydown' event works for arrow keys in Chrome
      window.addEventListener('keydown', moving, false);
      window.addEventListener('keyup', released, false);
    };
    this.stop = function() {
      console.log('Paused');
      window.removeEventListener('keydown', moving, false);
      window.removeEventListener('keyup', released, false);
    };
};

// reading from css
character.style.left = getComputedStyle(character).left;
character.style.top = getComputedStyle(character).top;

startButton.addEventListener('click', function() {
  app.start();
});

stopButton.addEventListener('click', function() {
  app.stop();
});
