// colors
const gray = "#555";
const darkBlue = "#2398ff";
const lightBlue = "#62b5ff";
const accent = "#FF530D";
const highlight = "#ffc800";

const lightText = "#f0f1f2";
const lightBg = "#f8f1e3";

const blueViolet = "#8A2BE2";
const lightGreen = "#98F5F9";
const lightCyan = "#E3FDFD";
const gold = "#DFC57B";
const lavender = "#E7DDFF";

function getColor(index) {
  const colors = [
    blueViolet,
    lightGreen,
    lavender,
    gold,
    lightBg,
    lightBlue
  ];
  return colors[index % colors.length];
}