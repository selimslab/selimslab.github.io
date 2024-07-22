// colors
const gray = "#555";
const darkBlue = "#2398ff";
const lightBlue = "#62b5ff";
const accent = "#FF530D";
const highlight = "#ffc800";

const lightText = "#f0f1f2";
const lightBg = "#f8f1e3";

const blueViolet = "#8A2BE2";
const lightGreen = "#B4E380";
const lightCyan = "#E3FDFD";
const mediumYellow = "#FFD700";

function getColor(index) {
  const colors = [
    blueViolet,
    lightGreen,
    darkBlue,
    mediumYellow,
    lightBg,
    lightBlue
  ];
  return colors[index % colors.length];
}