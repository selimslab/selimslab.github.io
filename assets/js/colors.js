// colors
const gray = "#555";
const darkBlue = "#2398ff";
const lightBlue = "#62b5ff";
const accent = "#FF530D";
const highlight = "#ffc800";

const lightBg = "#f8f1e3";

const blueViolet = "#8A2BE2";
const lightGreen = "#B4E380";
const lightCyan = "#E3FDFD";


function getColor(index) {
  const colors = [
    blueViolet,
    lightGreen,
    darkBlue,
    lightBg,
    lightCyan,
    lightBlue
  ];
  return colors[index % colors.length];
}