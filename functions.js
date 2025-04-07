function EasyEl() {
  let text = `(Header)Documentation(/Header)
    1. Use easyEl.print("text") to easily attach text to the screen.
  `;
  this.text = text.replace('(Header)', '<h1>')
  text = this.text;
  this.text = text.replace('(/Header)', '</h1>')
}
EasyEl.prototype.documentation = function() {
  this.print(this.text);
  console.log("test");
}
EasyEl.prototype.print = function(printText) {
  const text = document.createElement("p");
  text.innerHTML = printText;
  document.body.appendChild(text);
}
EasyEl.prototype.printAsText = function(printText) {
  const text = document.createElement("p");
  text.textContent = printText;
  document.body.appendChild(text);
}
let easyEl = new EasyEl();
