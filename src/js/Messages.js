import Data from "./Data";

export default class Messages {
  constructor(host) {
    this.host = host;
  }

  createElm(obj) {
    const messageContent = document.createElement("div");
    messageContent.className =
      obj.source === "user" ? "row mess-user" : "row mess-bot";
    const message = document.createElement("div");
    message.className =
      obj.source === "user" ? "element el-user" : "element el-bot";
    const text = document.createElement("div");
    text.className = "mess-user-body";
    text.dataset.type = obj.type;
    text.style.paddingRight = "0";
    text.dataset.id = obj.id;
    text.dataset.favorite = obj.favorite;

    const footer = document.createElement("div");
    footer.className = "mess-footer";
    const time = document.createElement("div");
    time.className = "time-stp";
    time.innerHTML = `${obj.favorite === "yes" ? "★ " : ""}${obj.date}`;
    const position = document.createElement("div");
    position.className = "geo-stp";
    position.innerHTML = obj.geo !== "" ? `&#127758 [${obj.geo}]` : "";

    if (obj.type.match(/txt/)) {
      text.innerHTML = obj.message;
    } else if (obj.type.match(/link/)) {
      const url = Data.findURL(obj.message);
      text.innerHTML = this.createLink(obj.message, url);
    } else if (obj.type.match(/image/)) {
      text.append(this.createImgItem(obj));
      text.dataset.fname = obj.messageName;
    } else if (obj.type.match(/audio/) || obj.type.match(/video/)) {
      text.append(this.createMediaItem(obj));
      text.dataset.fname = obj.messageName;
    } else {
      text.append(this.createFileItem(obj));
      text.dataset.fname = obj.messageName;
      const a = document.createElement("a");
      a.href = obj.message;
      a.className = "mess-link";
      text.append(a);
    }

    const menu = document.createElement("div");
    menu.className = "mess-menu";
    menu.innerHTML = `
        <span class="">
          <svg viewBox="0 0 18 18" width="18" height="18" class="menu-down" data-menu="popup">
            <path fill="currentColor" d="M3.3 4.6 9 10.3l5.7-5.7 1.6 1.6L9 13.4 1.7 6.2l1.6-1.6z"></path>
          </svg>
        </span>
    `;
    if (obj.source === "user") {
      message.append(menu);
    }
    message.append(text);
    if (!obj.type.match(/txt/) && !obj.type.match(/link/)) {
      const name = document.createElement("div");
      name.className = "name-file";
      name.innerHTML = obj.messageName;
      message.append(name);
      text.classList.add("non-txt");
    }

    footer.append(position);
    footer.append(time);
    message.append(footer);
    messageContent.append(message);

    return messageContent;
  }

  createImgItem(obj) {
    const item = document.createElement("img");
    item.className = "mess-img";
    item.dataset.type = obj.type;
    item.src = obj.message;
    return item;
  }

  createMediaItem(obj) {
    const item = document.createElement(obj.type.slice(0, 5));
    item.className = "mess-img";
    item.dataset.type = obj.type;
    item.src = obj.message;
    item.controls = true;
    return item;
  }

  createFileItem() {
    const item = document.createElement("div");
    item.className = "mess-file";
    return item;
  }

  createLink(str, arrLink) {
    const strArr = str.split(" ");
    for (let i = 0; i < strArr.length; i += 1) {
      const index = arrLink.indexOf(strArr[i]);
      if (index !== -1) {
        const newStr = `<a href="${arrLink[index]}" class="mess-link" target="_blank">${arrLink[index]}</a>`;
        strArr[i] = newStr;
      }
    }
    return strArr.join(" ");
  }
}
