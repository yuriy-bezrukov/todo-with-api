export class Preloader {
  #elementRef;

  constructor(selector) {
    this.#elementRef = document.querySelector(selector);
  }

  show() {
    const elemDiv = document.createElement('div');
    elemDiv.classList.add('preloader');
    this.#elementRef.appendChild(elemDiv);
  }

  hide() {
    document.querySelector('.preloader').remove();
  }
}
