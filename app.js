'use strict';

var app = new Application();

var startButton = document.querySelector('#startButton');
var stopButton = document.querySelector('#stopButton');
var myObject = document.querySelector('div');
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

var released = function (event) {
  if(event.keyCode === 16) {
    isShiftPressed = false;
  };
}

var moving = function (event) {
  if (!isShiftPressed) {
    switch (event.keyCode) {
      case 37:
        myObject.style.left = removePx(myObject.style.left, pixels);
        console.log(myObject.style.left);
          break;

      case 38:
        myObject.style.top = removePx(myObject.style.top, pixels);
        console.log(myObject.style.left);
          break;

      case 39:
        myObject.style.left = addPx(myObject.style.left, pixels);
        console.log(myObject.style.left);
          break;

      case 40:
        myObject.style.top = addPx(myObject.style.top, pixels);
        console.log(myObject.style.left);
          break;

      case 16:
        isShiftPressed = true;
          break;
    };
  }
  else {
    switch (event.keyCode) {
      case 37:
        myObject.style.transform = removeDeg(myObject.style.transform);
          break;

      case 39:
        myObject.style.transform = addDeg(myObject.style.transform);
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
      window.addEventListener('keydown', moving, false);
      window.addEventListener('keyup', released, false);
    };
    this.stop = function() {
      console.log('Paused');
      window.removeEventListener('keydown', moving, false);
      window.removeEventListener('keyup', released, false);
    };
};

myObject.style.left = getComputedStyle(myObject).left;
myObject.style.top = getComputedStyle(myObject).top;
myObject.style.right = getComputedStyle(myObject).right;
myObject.style.bottom = getComputedStyle(myObject).bottom;

startButton.addEventListener('click', function() {
  app.start();
});

stopButton.addEventListener('click', function() {
  app.stop();
});
