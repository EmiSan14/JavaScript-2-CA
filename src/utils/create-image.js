export function createImage(content) {
  const imageElement = document.createElement("img");
  imageElement.src = content.url;
  imageElement.alt = content.alt;
  return imageElement;
}
