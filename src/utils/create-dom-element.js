export function createDOMElement(elementTypeString, content) {
  const domElement = document.createElement(elementTypeString);
  domElement.textContent = content;
  return domElement;
}
