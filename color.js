Coloris({
  themeMode: 'dark',
  alpha: false
});

var colors = [];


const toHex = function(rgb) {
  return ("#" +
    parseInt(rgb[0]).toString(16).padStart(2, "0") +
    parseInt(rgb[1]).toString(16).padStart(2, "0") +
    parseInt(rgb[2]).toString(16).padStart(2, "0")
  ).toUpperCase();
};

const toRGB = function(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16)
  ];
};

function createGradient(length, col_start, col_end) {
  var start = toRGB(col_start);
  var end = toRGB(col_end);
  var diff = [
    end[0] - start[0],
    end[1] - start[1],
    end[2] - start[2]
  ];


  var output = [];

  var a = 0.0;


  for (var i = 0; i < length; i++) {
    var c = [0, 0, 0];
    a += (1.0 / length);

    c[0] = start[0] * a + (1 - a) * end[0];
    c[1] = start[1] * a + (1 - a) * end[1];
    c[2] = start[2] * a + (1 - a) * end[2];

    output.push(
      toHex(c)
    );
  }

  return output;
}


function colorTooltip(target) {
  var tooltip = target.parentElement.parentElement.previousElementSibling.getElementsByClassName("color_name")[0];
  var value = rgbfun2Hex(target.style.backgroundColor);
  tooltip.textContent = value;
}

function rgbfun2Hex(rgb) {
  return toHex((rgb.toString().replace(/rgb/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/,/g, "")).split(" "))
}

function updateColStart(source) {
  var col_end = source.parentElement.nextElementSibling.getElementsByTagName("input")[0].value;
  var length = source.parentElement.nextElementSibling.nextElementSibling.value;
  updateColor(
    createGradient(length, col_end, source.value), source.parentElement.parentElement.parentElement);
};

function updateColEnd(source) {
  var col_start = source.parentElement.previousElementSibling.getElementsByTagName("input")[0].value;
  var length = source.parentElement.nextElementSibling.value;
  updateColor(
    createGradient(length, source.value, col_start), source.parentElement.parentElement.parentElement);
};


function updateColNum(source) {

  if (source.value >= 5 && source.value <= 25) {
    var col_start = source.previousElementSibling.previousElementSibling.getElementsByTagName("input")[0].value;
    var col_end = source.previousElementSibling.getElementsByTagName("input")[0].value;
    var colors_elem = source.parentElement.previousElementSibling.getElementsByClassName("color")[0];
    var value_changed = source.value - colors_elem.children.length;

    console.log(value_changed);
    if (value_changed > 0) {

      for (var i = 0; i < value_changed; i++) {
        colors_elem.appendChild(colors_elem.children[0].cloneNode(false));
      }

    } else {

      for (var i = 0; i < Math.abs(value_changed); i++) {
        colors_elem.removeChild(colors_elem.lastChild);
      }

    }

    updateColor(
      createGradient(source.value, col_end, col_start), source.parentElement.parentElement);
  }
};


function updateColor(value, target) {
  var colors_elem = target.getElementsByClassName("color")[0].children;
  for (var i = 0; i < colors_elem.length; i++) {
    colors_elem[i].style.backgroundColor = value[i];
  }
};

function updateLength(value, target) {

};
