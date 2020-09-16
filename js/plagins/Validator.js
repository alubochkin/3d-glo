class Validator {
  constructor({ selector, pattern = {}, method }) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.formElements = [...this.form.elements].filter((item) => {
      return item.tagName.toLowerCase() !== "button" && item.type !== "button";
    });
  }

  showError(elem) {
    elem.classList.remove("succes");
    elem.classList.add("error");

    const errorMesage = document.createElement("span");
    errorMesage.classList.add("errorMesage");
    errorMesage.textContent = "Вы ввели не корректные данные!";

    elem.insertAdjacentElement("afterend", errorMesage);
  }
  showSucces(elem) {
    elem.classList.remove("error");
    elem.classList.add("succes");
    if (elem.nextElementSibling.classList.contains("errorMesage")) {
      elem.nextElementSibling.remove();
    }
  }

  init() {
    this.formElements.forEach((elem) =>
      elem.addEventListener("change", this.checkIt)
    );
    this.applyStyle();
  }
  checkIt(event) {
    console.log('1');
  }

  applyStyle() {
    const style = document.createElement("style");
    style.textContent = `
      input.succes {
        border: 1px solid green;
      }
      input.error {
        border: 1px solid red;
      }
      .errorMesage {
        color: red;
        font-size: 11px;
      }
    `;
    document.head.append(style);
  }
}
