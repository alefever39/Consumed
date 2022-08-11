export function consumedTextColor(consumedState) {
  let textcolor;
  if (consumedState == "not consumed") {
    textcolor = "red.500";
  } else if (consumedState == "consumed") {
    textcolor = "green.500";
  } else {
    textcolor = "yellow.500";
  }
  return textcolor;
}

export function formatSizeSm() {
  return { base: "xs", sm: "xs", lg: "sm" };
}
export function formatSizeMed() {
  return { base: "xs", sm: "sm", lg: "med" };
}
export function formatSizeLg() {
  return { base: "sm", sm: "med", lg: "lg" };
}
export function formatSizeXl() {
  return { base: "sm", sm: "lg", lg: "xl" };
}
export function formatSize2xl() {
  return { base: "med", sm: "xl", lg: "2xl" };
}
export function formatSize3xl() {
  return { base: "lg", sm: "2xl", lg: "3xl" };
}
export function formatSize4xl() {
  return { base: "xl", sm: "3xl", lg: "4xl" };
}
export function formatSize5xl() {
  return { base: "2xl", sm: "4xl", lg: "5xl" };
}
