// colors
const gray = "#555";
const darkBlue = "#2259a7";
const lightBlue = "#3298dc";
const accent = "#FF530D";
const highlight = "#ffc800";

const lightText = "#f0f1f2";
const lightBg = "#f8f1e3";
const darkText = gray;
const darkBg = "#22272e";

const blueViolet = "#8A2BE2";
const lightGreen = "#98F5F9";
const lightViolet = "#bec0ff";
const gold = "#DFC57B";
const lavender = "#E7DDFF";

function getColor(index) {
  const colors = [
    blueViolet,
    gold,
    lightViolet,
    lightBg,
    lightBlue
  ];
  return colors[index % colors.length];
}