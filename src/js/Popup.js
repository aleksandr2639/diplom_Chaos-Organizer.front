export default class Popup {
  constructor(objItem, objPos, objHost, callBack) {
    this.item = objItem;
    this.pos = objPos;
    this.callBack = callBack;
    this.globalDom = objHost.global;
    this.localDom = objHost.local;
    this.name = objHost.name;
  }

  init() {
    this.createMenu();
    this.initEvent();
  }

  createMenu() {
    const ul = document.createElement("ul");
    ul.className = `menu-upload ${this.name}`;
    ul.dataset.name = this.name;
    ul.style.top = `${this.pos.top}px`;
    ul.style.left = `${this.pos.left}px`;
    ul.style.right = `${this.pos.right}px`;
    ul.style.bottom = `${this.pos.bottom}px`;
    ul.style.width = `${this.pos.width}px`;
    for (let i = 0; i < this.item.length; i += 1) {
      if (this.item[i].type === "submenu") {
        ul.innerHTML += `<li><button class="upload-item" data-type="${this.item[i].type}">${this.item[i].title}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp»`;
      } else
        ul.innerHTML += `<li><button class="upload-item" data-type="${this.item[i].type}">${this.item[i].title}${this.item[i].state === true ? "&nbsp &nbsp &nbsp✔" : ""}</button></li>`;
    }
    this.localDom.append(ul);
    if (
      this.globalDom.getBoundingClientRect().bottom <
      ul.getBoundingClientRect().bottom
    ) {
      ul.style.top = `${this.pos.top - ul.clientHeight}px`;
    }
  }

  initEvent() {
    this.localDom
      .querySelector(".menu-upload")
      .addEventListener("click", this.pressButton.bind(this));
  }

  remove() {
    this.localDom.querySelector(".menu-upload").remove();
  }

  pressButton(e) {
    this.callBack(e);
  }
}
