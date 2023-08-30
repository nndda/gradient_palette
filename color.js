Coloris({
  themeMode: 'dark',
  alpha: false
});

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

var colors = [];
var colors_elem;
var col_start;
var col_end;
var col_length = 10;

function createGradient(length_ovrr) {
  var end = toRGB(col_start.value);
  var start = toRGB(col_end.value);
  var length = col_length.value;
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
    if (a > 1.0) { a = 1.0 };

    c[0] = start[0] * a + (1.0 - a) * end[0];
    c[1] = start[1] * a + (1.0 - a) * end[1];
    c[2] = start[2] * a + (1.0 - a) * end[2];

    output.push( toHex(c) );
  }

  return output;
}

function colorTooltip(target) {
  var tooltip = target.parentElement.parentElement.parentElement.getElementsByClassName("color_name")[0];
  var value = rgbfun2Hex(target.style.backgroundColor);
    tooltip.textContent = value;
  };


function rgbfun2Hex(rgb) {
    return toHex((rgb.toString().replace(/rgb/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/,/g, "")).split(" "))
};

function updateColNum() {

  if (col_length.value >= 3 && col_length.value <= 25) {
    var value_changed = col_length.value - colors_elem.children.length;
    console.log(value_changed);

    if (value_changed > 0) {

      for (var i = 0; i < value_changed; i++) {
        colors_elem.appendChild(colors_elem.children[0].cloneNode(false));
      }

    } else {

      for (var i = 0; i > value_changed; i--) {
        colors_elem.removeChild(colors_elem.lastElementChild);
      }

    }
    updateColor();
  }
};

function updateColor() {
  colors = createGradient();
  for (var i = 0; i < colors_elem.children.length; i++) {
    colors_elem.children[i].style.backgroundColor = colors[i];
  }
};

var copy_notif;

function copyString(string) {
  copy_notif.textContent = "\u00A0\u00A0Copying...";
  copy_notif.classList.remove("copy_notif_show");
  navigator.clipboard.writeText(string).then(() => {
    copy_notif.classList.add("copy_notif_show");
    console.log('copied');
    copy_notif.textContent = "\u00A0\u00A0Copied to clipboard!";
  },() => {
    copy_notif.classList.add("copy_notif_show_failed");
    console.error('failed');
    copy_notif.textContent = "\u00A0\u00A0Failed to copy";
  });
};

function copyCol(target) {
  copyString(rgbfun2Hex(target.style.backgroundColor));
};

function copyArrVar(target) {
  var arr_col = [];
  var arr_elem = colors_elem.children;

    for (var i = 0; i < arr_elem.length; i++) {
    arr_col.push(
      "\"" + rgbfun2Hex(arr_elem[i].style.backgroundColor) + "\""
      )
  }
  copyString("["+arr_col+"]");
};

function copyCSSVar(target) {
  var output = "";
  var arr_col = [];
  var arr_elem = colors_elem.children;
  var var_name = target.nextElementSibling.value;

    for (var i = 0; i < arr_elem.length; i++) {
    arr_col.push(rgbfun2Hex(arr_elem[i].style.backgroundColor));
  }

  for (var i = 0; i < arr_col.length; i++) {
    output += (
      var_name + "_" + i + ": " + arr_col[i] + ";\n"
      );
  }
  copyString(output);
};