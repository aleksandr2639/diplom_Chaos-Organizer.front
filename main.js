/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/Data.js
class Data {
  static getTime() {
    const date = new Date();
    return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
  }
  static findURL(str) {
    const validURL = /https?:\/\/\S+/gi;
    const url = str.match(validURL);
    return url;
  }
}
;// CONCATENATED MODULE: ./src/js/Messages.js

class Messages {
  constructor(host) {
    this.host = host;
  }
  createElm(obj) {
    const messageContent = document.createElement("div");
    messageContent.className = obj.source === "user" ? "row mess-user" : "row mess-bot";
    const message = document.createElement("div");
    message.className = obj.source === "user" ? "element el-user" : "element el-bot";
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
;// CONCATENATED MODULE: ./src/js/Link.js
class Link {
  constructor(server) {
    this.server = server;
  }
  sendMsg(obj, timeStamp, location) {
    this.ws.send(JSON.stringify({
      event: "message",
      type: obj.type,
      message: obj.content,
      messageName: obj.contentName,
      favorite: "no",
      date: timeStamp,
      geo: location
    }));
  }
  sendEvent(obj = {
    event: "",
    id: "",
    value: ""
  }) {
    this.ws.send(JSON.stringify({
      event: obj.event,
      id: obj.id,
      value: obj.value
    }));
  }

  // eslint-disable-next-line class-methods-use-this
  sendData(arrFiles = [], date, location) {
    const msg = {};
    for (let i = 0; i < arrFiles.length; i += 1) {
      const {
        type
      } = arrFiles[i];
      const reader = new FileReader();
      reader.readAsDataURL(arrFiles[i]);
      reader.onloadend = () => {
        msg.content = reader.result;
        msg.contentName = arrFiles[i].name;
        msg.type = type;
        this.sendMsg(msg, date, location);
      };
    }
  }
  sendBlob(obj, date, location) {
    const msg = {};
    const reader = new FileReader();
    reader.readAsDataURL(obj.file);
    reader.onloadend = () => {
      msg.content = reader.result;
      msg.contentName = obj.file.name;
      msg.type = obj.type;
      this.sendMsg(msg, date, location);
    };
  }
}
;// CONCATENATED MODULE: ./src/js/Popup.js
class Popup {
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
      } else ul.innerHTML += `<li><button class="upload-item" data-type="${this.item[i].type}">${this.item[i].title}${this.item[i].state === true ? "&nbsp &nbsp &nbsp✔" : ""}</button></li>`;
    }
    this.localDom.append(ul);
    if (this.globalDom.getBoundingClientRect().bottom < ul.getBoundingClientRect().bottom) {
      ul.style.top = `${this.pos.top - ul.clientHeight}px`;
    }
  }
  initEvent() {
    this.localDom.querySelector(".menu-upload").addEventListener("click", this.pressButton.bind(this));
  }
  remove() {
    this.localDom.querySelector(".menu-upload").remove();
  }
  pressButton(e) {
    this.callBack(e);
  }
}
;// CONCATENATED MODULE: ./src/js/Modal.js
class Modal {
  constructor(host) {
    this.host = host;
    this.closeWinModal = this.closeWinModal.bind(this);
    this.handlerBtnOk = this.checkValidity;
    this.handlerBtnCancel = this.closeWinModal;
  }
  winModalDialog(obj = {}, callback) {
    this.modal = document.createElement("div");
    this.modal.className = "modal_wrapper";
    const modalPosition = document.createElement("div");
    modalPosition.className = "modal_position";
    const window = document.createElement("div");
    window.className = "window";
    let modalHTML = "";
    for (const key in obj) {
      switch (key) {
        case "head":
          modalHTML += `<div class="modal_title">${obj[key]}</div>`;
          break;
        case "input":
          modalHTML += `
            <p class="input-ask-block">
              <p class="modal_input-title">${obj[key].head}</p>
              <input class="modal_input" type="text" value="${obj[key].value}" required>
              <p class="modal_error">${obj[key].error}</p>
            </p>
          `;
          break;
        case "textArea":
          modalHTML += `
            <div class="input-ask-block">
              <div class="head-textarea-ask">${obj[key].head}</div>
              <textarea class="modal_input textarea-ask" required>${obj[key].value}</textarea>
            </div>
          `;
          break;
        case "text":
          modalHTML += `<div class="modal_content">${obj[key]}</div>`;
          break;
        case "button":
          modalHTML += '<div class="btn_wrapper">';
          if (obj[key].ok !== undefined) {
            modalHTML += `<button class="btnOk">${obj[key].ok}</button>`;
          }
          if (obj[key].cancel !== undefined) {
            modalHTML += `<button class="btnCancel">${obj[key].cancel}</button>`;
          }
          modalHTML += "</div>";
          break;
        default:
          break;
      }
    }
    window.innerHTML = modalHTML;
    modalPosition.appendChild(window);
    this.modal.appendChild(modalPosition);
    document.body.appendChild(this.modal);
    const canFocus = document.querySelector(".modal_input");
    if (canFocus) {
      canFocus.focus();
    }
    this.ok = this.modal.querySelector(".btnOk");
    if (this.ok) {
      this.ok.addEventListener("click", this.handlerBtnOk.bind(this, callback));
    }
    this.cancel = this.modal.querySelector(".btnCancel");
    if (this.cancel) {
      this.cancel.addEventListener("click", this.handlerBtnCancel.bind(this, callback));
    }
  }
  checkValidity(callback, e) {
    const arr = e.target.closest(".window").querySelectorAll(".modal_input");
    for (let i = 0; i < arr.length; i += 1) {
      if (!arr[i].checkValidity()) {
        arr[i].style.outline = "solid red";
        arr[i].style.borderColor = "red";
        setTimeout(() => {
          arr[i].style.outline = "";
          arr[i].style.borderColor = "";
        }, 1000);
        return;
      }
    }
    callback();
  }
  eventKey(callback, e) {
    if (typeof e !== "undefined") {
      if (e.key === "Enter" && e.target.classList.contains("btnOk")) {
        const arr = e.target.closest(".window").querySelectorAll(".modal_input");
        for (let i = 0; i < arr.length; i += 1) {
          if (!arr[i].checkValidity()) {
            arr[i].style.outline = "solid red";
            arr[i].style.borderColor = "red";
            setTimeout(() => {
              arr[i].style.outline = "";
              arr[i].style.borderColor = "";
            }, 1000);
            return;
          }
        }
        callback();
      }
      if (e.target.classList.contains("btnCancel")) {
        this.closeWinModal();
      }
    }
  }
  eventBack(callback) {
    callback(null);
  }
  closeWinModal() {
    this.modal.remove();
  }
  checkCoords(callback, e) {
    const input = e.target.closest(".window").querySelector(".modal_input");
    const coords = this.checkValidCoords(input.value);
    if (!coords) {
      input.nextElementSibling.style.visibility = "visible";
      setTimeout(() => {
        input.nextElementSibling.style.visibility = "";
      }, 2000);
      return;
    }
    callback(coords);
  }
  checkValidCoords(input) {
    const position = input.split(",").map(coord => coord.match(/[+|−|-|—|-]?\d{1,3}\.\d+/));
    if (!position[0] || !position[1]) {
      return false;
    }
    return {
      latitude: position[0][0],
      longitude: position[1][0]
    };
  }
}
;// CONCATENATED MODULE: ./src/js/Media.js


class Media {
  constructor(container, server, position) {
    this.container = container;
    this.server = server;
    this.position = position;
    this.input = this.container.querySelector(".input-field");
    this.form = this.container.querySelector("form");
    this.tabVideo = this.container.querySelector(".tab-overlay");
    this.timerInterval = null;
  }
  mediaRecord(type) {
    const navigatorDevices = type === "video/mp4" ? {
      audio: true,
      video: true
    } : {
      audio: true
    };
    this.blobType = type;
    if (this.blobType === "video/mp4") {
      this.videoCap();
    }
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      this.showError();
      return;
    }
    const oldVideo = this.tabVideo.querySelector(".video-cover");
    if (oldVideo !== null) {
      oldVideo.remove();
    }
    try {
      navigator.mediaDevices.getUserMedia(navigatorDevices).then(stream => {
        this.stream = stream;
        this.recorder = new MediaRecorder(this.stream);
        if (this.blobType === "video/mp4") {
          if (this.tabVideo.querySelector(".video-cap") !== null) {
            this.tabVideo.querySelector(".video-cap").remove();
          }
          this.videoWindow("muted");
          this.video = this.tabVideo.querySelector("video");
          this.video.srcObject = stream;
          this.video.play();
        }
        this.startRecording();
      }).catch(() => this.showError());
    } catch (error) {
      this.showError();
    }
    if (this.container.querySelector(".rec-panel") !== null) {
      this.recPanel.remove();
    }
    this.createRecordPanel();
    this.recPanel.addEventListener("click", this.eventRecPanel.bind(this));
  }
  videoCap() {
    const divVideo = document.createElement("div");
    divVideo.className = "video-cap";
    divVideo.innerHTML = "Получение доступа к камере";
    this.tabVideo.querySelector(".tab-content").append(divVideo);
  }
  videoWindow(muted) {
    const divVideo = document.createElement("div");
    divVideo.className = "video-cover";
    divVideo.innerHTML = `
      <video ${muted === "" ? "" : "autoplay"} class="play-video" ${muted}></video>
    `;
    this.tabVideo.querySelector(".tab-content").append(divVideo);
  }
  createRecordPanel() {
    this.form.remove();
    const divRecord = document.createElement("div");
    divRecord.className = "rec-panel";
    divRecord.append(this.button("delete"));
    divRecord.append(this.button("play"));
    divRecord.append(this.button("time"));
    divRecord.append(this.button("record"));
    divRecord.append(this.button("send"));
    this.container.querySelector("footer .message").append(divRecord);
    this.recPanel = this.container.querySelector(".rec-panel");
    this.timeRec = this.container.querySelector(".rec-time");
  }
  button(type) {
    const div = document.createElement("div");
    div.classList.add(type);
    switch (type) {
      case "record":
        div.innerHTML = `
        <button class="rec-panel-item stop-btn" data-type="record" aria-label="Стоп" width="24" height="24" >
          <svg width="32px" height="32px" viewBox="0 0 2.15 2.15" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path fill="currentColor" d="M1.45 1.13l-0.25 0.15 -0.24 0.14c-0.02,0.02 -0.05,0.02 -0.07,0 -0.03,-0.01 -0.04,-0.03 -0.04,-0.06l0 -0.29 0 -0.3c0,-0.02 0.01,-0.05 0.04,-0.06 0.02,-0.02 0.05,-0.02 0.07,0 0.08,0.05 0.16,0.09 0.24,0.14l0.25 0.15c0.02,0.01 0.04,0.04 0.04,0.07 0,0.02 -0.02,0.05 -0.04,0.06z"/>
            <path fill="currentColor" d="M1.08 0c-0.6,0 -1.08,0.48 -1.08,1.08 0,0.59 0.48,1.07 1.08,1.07 0.59,0 1.07,-0.48 1.07,-1.07 0,-0.6 -0.48,-1.08 -1.07,-1.08zm0 2.02c-0.52,0 -0.95,-0.42 -0.95,-0.94 0,-0.52 0.43,-0.95 0.95,-0.95 0.52,0 0.94,0.43 0.94,0.95 0,0.52 -0.42,0.94 -0.94,0.94z"/>
          </svg>
        </button>  
      `;
        break;
      case "stop":
        div.innerHTML = `
          <button class="rec-panel-item stop-btn" data-type="stop" aria-label="Стоп" width="24" height="24" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path fill="currentColor" d="M16,0C7.2,0,0,7.2,0,16s7.2,16,16,16s16-7.2,16-16S24.8,0,16,0z M16,30C8.3,30,2,23.7,2,16S8.3,2,16,2 s14,6.3,14,14S23.7,30,16,30z"></path>
              <path class="_3aeL4" fill="currentColor" d="M13,11c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h6c1.1,0,2-0.9,2-2v-6c0-1.1-0.9-2-2-2H13z"></path>
            </svg>
          </button>
        `;
        break;
      case "delete":
        div.innerHTML = `
          <button class="rec-panel-item" data-type="cancel" aria-label="Отменить" width="24" height="24" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M5,0,3,2H0V4H16V2H13L11,0ZM15,5H1V19.5A2.5,2.5,0,0,0,3.5,22h9A2.5,2.5,0,0,0,15,19.5Z" fill="currentColor"></path>
            </svg>
          </button>
        `;
        break;
      case "play":
        div.innerHTML = `
          <button class="rec-panel-item" data-type="play" aria-label="Воспроизвести" width="24" height="24">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 18">
              <path d="M15.05,8.39,2,.32a1,1,0,0,0-1.53.85V16.83A1,1,0,0,0,2,17.7L15,10.1A1,1,0,0,0,15.05,8.39Z" fill="currentColor"></path>
            </svg>
          </button>
        `;
        break;
      case "send":
        div.innerHTML = `
          <button class="rec-panel-item send-btn" data-type="send" aria-label="Отправить" width="35px" height="35px">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" class="">
              <path d="M17.5,0h0A17.51,17.51,0,0,1,35,17.5h0A17.51,17.51,0,0,1,17.5,35h0A17.51,17.51,0,0,1,0,17.5H0A17.51,17.51,0,0,1,17.5,0Z" fill="currentColor"></path><path class="_3aeL4" d="M25.64,18.55,11.2,24.93a.86.86,0,0,1-1.13-.44.83.83,0,0,1-.06-.44l.48-4.11a1.36,1.36,0,0,1,1.24-1.19l7.51-.6a.16.16,0,0,0,.14-.16.16.16,0,0,0-.14-.14l-7.51-.6a1.36,1.36,0,0,1-1.24-1.19L10,12a.84.84,0,0,1,.74-.94.87.87,0,0,1,.45.06l14.44,6.38a.61.61,0,0,1,.31.79A.59.59,0,0,1,25.64,18.55Z" fill="#fff"></path>
            </svg>
          </button>
        `;
        break;
      case "time":
        div.textContent = "00:00";
        div.className = "rec-time";
        break;
      default:
        break;
    }
    return div;
  }
  changeButton(from, to) {
    const div = this.container.querySelector(`.${from}`);
    div.replaceWith(this.button(to));
  }
  eventRecPanel(e) {
    const btn = e.target.closest("button");
    if (btn !== null) {
      switch (btn.dataset.type) {
        case "cancel":
          this.cancelRecording();
          break;
        case "stop":
          this.stopRecording();
          break;
        case "record":
          if (this.blobType === "video/mp4") {
            this.mediaRecord("video/mp4");
          } else {
            this.mediaRecord("audio/wav");
          }
          break;
        case "play":
          this.playRecording();
          break;
        case "send":
          this.sendRecording();
          break;
        default:
          break;
      }
    }
  }

  // Действия по завершению записи
  cancelRecording() {
    clearInterval(this.timerInterval);
    this.recPanel.remove();
    this.container.querySelector("footer .message").append(this.form);
    this.tabVideo.style.width = "";
    if (this.tabVideo.querySelector(".video-cover") !== null) {
      this.tabVideo.querySelector(".video-cover").remove();
    }
  }

  // Старт записи
  startRecording() {
    clearInterval(this.timerInterval);
    this.changeButton("record", "stop");
    this.chunks = [];
    this.recorder.addEventListener("dataavailable", event => {
      this.chunks.push(event.data);
    });
    this.recorder.addEventListener("stop", () => {
      this.eventStop();
    });
    this.recorder.start();
    this.showTime();
  }

  // Остановка записи
  stopRecording() {
    if (this.recorder.state === "inactive") {
      if (this.audioPlayer.duration > 0 && !this.audioPlayer.paused) {
        clearInterval(this.timerInterval);
        this.audioPlayer.pause();
      }
      return;
    }
    this.changeButton("stop", "record");
    clearInterval(this.timerInterval);
    this.recorder.stop();
    this.stream.getTracks().forEach(track => track.stop());
  }
  eventStop() {
    const blob = new Blob(this.chunks, {
      type: this.blobType
    });
    const fileName = this.blobType === "video/mp4" ? "record.mp4" : "record.wav";
    this.mediaFile = new File([blob], fileName, {
      type: this.blobType
    });
    const mediaURL = window.URL.createObjectURL(blob);
    if (this.blobType === "video/mp4") {
      this.tabVideo.querySelector(".video-cover").remove();
      this.videoWindow("");
      this.video = this.tabVideo.querySelector("video");
      this.video.src = mediaURL;
    } else {
      const audio = document.createElement("audio");
      audio.src = mediaURL;
      this.recPanel.append(audio);
      this.audioPlayer = this.recPanel.querySelector("audio");
    }
  }

  // Воспроизведение видео/аудио
  playRecording() {
    if (this.recorder.state === "inactive") {
      this.showTime();
      if (this.blobType === "video/mp4") {
        this.video.play();
        this.video.onended = () => {
          clearInterval(this.timerInterval);
        };
      } else {
        this.audioPlayer.play();
        this.audioPlayer.currentTime = 0;
        this.audioPlayer.onended = () => {
          clearInterval(this.timerInterval);
        };
      }
    }
  }

  // Отправка записи на сервер
  sendRecording() {
    if (this.recorder.state === "inactive") {
      this.server.sendBlob({
        type: this.blobType,
        file: this.mediaFile
      }, Data.getTime(), this.position.location);
      this.cancelRecording();
    }
  }

  // Отображение времени записи
  showTime() {
    let timer = 0;
    this.timeRec.innerText = `${this.formatTime(timer)}`;
    this.timerInterval = setInterval(() => {
      timer += 1000;
      this.timeRec.innerText = `${this.formatTime(timer)}`;
    }, 1000);
  }
  formatTime(sec) {
    const d = new Date(sec);
    const m = d.getMinutes();
    const mm = m < 10 ? `0${m}` : m;
    const s = d.getSeconds();
    const ss = s < 10 ? `0${s}` : s;
    const ret = `${mm}:${ss}`;
    return ret;
  }

  // Окно с ошибкой
  showError() {
    const winItems = {
      head: "Устройство не найденo",
      text: `
        Попробуйте подключить микрофон или веб-камеру, если устройство 
        подключенo, перезагрузите браузер`,
      button: {
        cancel: "Понятно"
      }
    };
    this.cancelRecording();
    this.geoAsk = new Modal(this.container);
    this.geoAsk.winModalDialog(winItems);
  }
}
;// CONCATENATED MODULE: ./src/js/Location.js

class Location {
  constructor() {
    this.geo = false;
    this.location = "";
    this.handlerSuccess = this.handlerSuccess.bind(this);
    this.handlerError = this.handlerError.bind(this);
    this.inputLocation = this.inputLocation.bind(this);
  }
  geoLocation() {
    if (this.geo) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.handlerSuccess.bind(), this.handlerError.bind());
      }
    } else this.location = "";
  }
  handlerSuccess(pos) {
    const {
      latitude,
      longitude
    } = pos.coords;
    this.location = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
  }
  handlerError() {
    const winItems = {
      head: "Что то пошло не так",
      text: `
        К сожалению, нам не удалось определить ваше местоположение, пожалуйста, 
        дайте разрешение на использование геолокации, либо введите координаты вручную`,
      input: {
        head: "Широта и долгота через запятую",
        value: "",
        error: "Введите значение в формате 00.00, 00.00"
      },
      button: {
        ok: "OK",
        cancel: "Отмена"
      }
    };
    this.geoMessage = new Modal();
    this.geoMessage.handlerBtnOk = this.geoMessage.checkCoords;
    this.geoMessage.handlerBtnCancel = this.geoMessage.eventBack;
    this.geoMessage.winModalDialog(winItems, this.inputLocation.bind());
  }
  inputLocation(pos) {
    this.geoMessage.closeWinModal();
    if (pos !== null) {
      const {
        latitude,
        longitude
      } = pos;
      this.location = `${latitude}, ${longitude}`;
    } else this.geo = false;
  }
}
;// CONCATENATED MODULE: ./src/js/Search.js
class Search {
  constructor(container, server) {
    this.container = container;
    this.server = server;
    this.tabSearch = this.container.querySelector(".tab-overlay");
    this.onInput = this.onInput.bind(this);
  }
  init() {
    const input = document.createElement("input");
    input.className = "input-field";
    input.placeholder = "...";
    this.searchPanel = this.tabSearch.querySelector(".tab-head");
    this.searchPanel.querySelector(".tab-title").insertAdjacentElement("afterend", input);
    this.inputSearch = this.tabSearch.querySelector("input");
    setTimeout(() => {
      this.inputSearch.focus();
    }, 500);
    this.inputSearch.addEventListener("input", this.debounce(this.onInput, 500));
  }
  tabClear() {
    this.inputSearch.remove();
  }
  debounce(callback, delay) {
    let timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(callback, delay);
    };
  }
  onInput() {
    this.tabSearch.querySelector(".tab-content").innerHTML = "";
    const input = this.tabSearch.querySelector("input");
    this.server.sendEvent({
      event: "search",
      id: "0",
      value: input.value
    });
  }
}
;// CONCATENATED MODULE: ./src/js/EmojiHandler.js
class EmojiHandler {
  constructor(objHost, callBack) {
    this.callBack = callBack;
    this.globalDom = objHost.global;
    this.localDom = objHost.local;
    this.name = objHost.name;
    this.messagesContent = this.globalDom.querySelector(".content-row");
    this.container = null;
  }
  init() {
    this.markupEmojiContainer();
    this.initEvent();
    this.onEmojiBtnClick();
  }
  initEvent() {
    this.localDom.querySelector(".messages__emoji").addEventListener("click", this.clickBtnEmoji.bind(this));
  }
  onEmojiBtnClick() {
    this.onEmojiFetch();
    this.scrollToBottom();
  }
  clickBtnEmoji(e) {
    this.callBack(e);
  }
  async onEmojiFetch() {
    await fetch("https://emoji-api.com/emojis?access_key=046a9fbcf885bd576e07bd81ee02d6d3c87ed10a").then(res => res.json()).then(data => this.drawEmoji(data));
  }
  markupEmojiContainer() {
    this.container = document.createElement("ul");
    this.container.className = "messages__emoji";
    this.localDom.appendChild(this.container);
  }
  drawEmoji(data) {
    data.forEach(emoji => {
      const li = document.createElement("li");
      li.classList.add("messages-emoji__item");
      li.textContent = emoji.character;
      this.container.appendChild(li);
    });
  }
  scrollToBottom() {
    this.messagesContent.scrollTop = this.messagesContent.scrollHeight;
  }
  remove() {
    this.localDom.querySelector(".messages__emoji").remove();
  }
}
;// CONCATENATED MODULE: ./src/js/Chat.js









class Chat {
  constructor(container, server) {
    this.container = container;
    this.gui = new Messages(container);
    this.link = new Link(server);
    this.position = new Location();
    this.rows = this.container.querySelector(".content-row");
    this.tabRows = this.container.querySelector(".tab-content");
    this.tab = this.container.querySelector(".tab-overlay");
    this.tabTitle = this.container.querySelector(".tab-title");
    this.input = this.container.querySelector(".input-field");
    this.btnMicrophone = this.container.querySelector(".btn-microphone");
    this.mask = this.container.querySelector(".mask");
    this.media = new Media(container, this.link, this.position);
    this.searh = new Search(container, this.link);
    this.init = this.init.bind(this);
    this.option = null;
    this.upload = null;
    this.popup = null;
    this.popupId = null;
    this.group = null;
    this.emojibtn = null;
    this.message = {};
    this.txtFlag = "";
    this.info = null;
    this.noSendMsg = 0;
    this.stepSend = 9;
    this.fixScroll = false;
    this.wsStatusElmt = this.container.querySelector(".ws-status");
  }
  init() {
    this.rows.addEventListener("scroll", this.eventScrollRows.bind(this));
    this.container.addEventListener("click", this.eventDomElt.bind(this));
    this.container.addEventListener("dragenter", e => {
      e.preventDefault();
    });
    this.container.addEventListener("dragover", e => {
      e.preventDefault();
      this.shadowDND();
    });
    this.container.addEventListener("dragleave", e => {
      e.preventDefault();
      if (e.target === this.mask) {
        this.shadowDNDHidden();
      }
    });
    this.container.addEventListener("drop", e => {
      this.link.sendData(e.dataTransfer.files, Data.getTime(), this.position.location);
      if (e.target === this.mask) {
        this.shadowDNDHidden();
      }
      e.preventDefault();
    });
    // Текстовый ввод
    this.container.querySelector(".btn-microphone").addEventListener("click", this.onSubmit.bind(this));
    this.container.querySelector(".input-field").addEventListener("input", this.onInput.bind(this));
    // WebSocket
    this.handlerWebSocket();
  }
  handlerWebSocket() {
    this.link.ws = new WebSocket(this.link.server);
    this.link.ws.addEventListener("open", () => {
      this.link.ws.send(JSON.stringify({
        event: "connected"
      }));
    });
    this.link.ws.addEventListener("message", e => {
      const msg = JSON.parse(e.data);
      switch (msg.event) {
        case "connect":
          this.wsStatus = "ok";
          this.wsStatusElmt.style.backgroundColor = "#056162";
          this.noSendMsg = msg.noSendMsg;
          if (this.noSendMsg > 0) {
            this.nextOldReceive();
          }
          break;
        case "noSendMsg":
          this.oldReceive(msg);
          break;
        case "newMessage":
          this.rows.append(this.gui.createElm(msg.message));
          this.rows.scrollTop = this.rows.scrollHeight;
          break;
        case "delete":
          this.deleteMessage(msg.id);
          break;
        case "deleteAll":
          this.container.querySelector(".content-row").innerHTML = "";
          break;
        case "favorite":
          this.favoriteMessage(msg);
          break;
        case "favoriteAll":
          this.tabRows.append(this.gui.createElm(msg.message));
          break;
        case "getGroup":
          this.tabRows.append(this.gui.createElm(msg.message));
          break;
        case "search":
          this.tabRows.append(this.gui.createElm(msg.message));
          break;
        case "funcOut":
          this.executeFunctionByName(msg.value, this, msg.id);
          break;
        default:
          break;
      }
    });
    this.link.ws.addEventListener("close", () => {
      this.wsStatus = "close";
      this.wsStatusElmt.style.backgroundColor = "";
      this.showError();
    });
    this.link.ws.addEventListener("error", () => {
      this.wsStatusElmt.style.backgroundColor = "#68bbe4";
      this.wsStatus = "error";
    });
  }

  // Заполнение при скролле вверх
  eventScrollRows() {
    if (this.rows.scrollTop === 0 && this.noSendMsg > 0) {
      this.fixScroll = false;
      this.nextOldReceive();
    }
  }

  // Обработчики событий формы ввода
  onSubmit(e) {
    this.tabClose();
    e.preventDefault();
    const type = document.activeElement === this.input ? "text" : this.btnMicrophone.querySelector("span").dataset.type;
    switch (type) {
      case "text":
        if (this.input.value !== "") {
          const url = Data.findURL(this.input.value);
          if (url !== null) {
            this.message.type = "link";
          } else {
            this.message.type = "txt";
          }
          this.message.content = this.input.value;
          this.link.sendMsg(this.message, Data.getTime(), this.position.location);
          this.resetForm();
        }
        break;
      case "audio":
        this.media.mediaRecord("audio/wav");
        break;
      default:
        break;
    }
    this.rows.scrollTop = this.rows.scrollHeight;
  }
  onInput() {
    if (this.input.value.trim() !== "" && this.txtFlag === "") {
      this.txtFlag = "txt";
      this.btnMicrophone.innerHTML = `
        <span span data-type="text">
          <svg viewBox="0 0 24 24" width="24" height="24" class="">
            <path fill="currentColor" d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z">
            </path>
          </svg>
        </span>
      `;
    } else if (this.input.value.trim() === "" && this.txtFlag === "txt") {
      this.txtFlag = "";
      this.btnMicrophone.innerHTML = `
        <span span data-type="audio">
          <svg viewBox="0 0 24 24" width="24" height="24" class="">
            <path fill="currentColor"
              d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z">
            </path>
          </svg>
        </span>
      `;
    }
  }
  resetForm() {
    this.input.value = "";
    this.txtFlag = "";
    this.btnMicrophone.innerHTML = `
      <span span data-type="audio">
        <svg viewBox="0 0 24 24" width="24" height="24" class="">
          <path fill="currentColor"
            d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z">
          </path>
        </svg>
      </span>
    `;
  }

  // События в чате
  eventDomElt(e) {
    // Запись видео
    if (e.target.closest(".rec-video") !== null) {
      this.tabRecVideo();
    }
    // Поиск
    if (e.target.closest(".menu-find") !== null) {
      this.tabFind();
    }
    // Опции '⋮'
    if (e.target.closest(".menu-option") !== null && this.option === null) {
      this.optionMenu();
    } else if (this.option !== null && this.group === null && e.target.dataset.type !== "submenu") {
      this.option.remove();
      this.option = null;
    } else if (this.option !== null && this.group !== null && e.target.dataset.type !== "submenu") {
      this.group.remove();
      this.option.remove();
      this.group = null;
      this.option = null;
    }
    // Скрепка
    if (e.target.closest(".upload") !== null && this.upload === null) {
      this.uploadMenu();
    } else if (this.upload !== null) {
      this.upload.remove();
      this.upload = null;
    }
    // Информация о командах
    if (e.target.closest(".menu-info") !== null) {
      this.showInfo();
    }
    // Эмоджи
    if (e.target.closest(".menu-emoji") !== null && this.emojibtn === null) {
      this.emojiHandler();
    } else if (this.emojibtn !== null) {
      this.emojibtn.remove();
      this.emojibtn = null;
    }
    // Элемент
    if (e.target.closest(".mess-menu") !== null && this.popupId === e.target.closest(".element").querySelector(".mess-user-body").dataset.id) {
      this.popup.remove();
      this.popup = null;
      this.popupId = null;
    } else if (e.target.closest(".mess-menu") !== null && this.popup === null) {
      this.popupMenu(e);
    } else if (e.target.closest(".mess-menu") !== null && this.popup !== null) {
      this.popup.remove();
      this.popupMenu(e);
    } else if (e.target.closest(".mess-menu") === null && this.popup !== null) {
      this.popup.remove();
      this.popup = null;
      this.popupId = null;
    }
    // Увеличение картинки или видеопроигрывателя при клике на них
    if (e.target.classList.contains("mess-img") && (e.target.dataset.type.match(/image/) || e.target.dataset.type.match(/video/))) {
      e.target.classList.toggle("big-img");
    }
    // Закрытие шторки
    if (e.target.closest(".tab-closebtn") !== null) {
      this.tabClose();
    }
  }

  // Запись видео
  tabRecVideo() {
    this.tabClose();
    this.tabOpen("Запись видео", {
      type: "videoRec"
    });
    this.media.mediaRecord("video/mp4");
  }

  // вкладка поиска
  tabFind() {
    this.tabClose();
    this.tabOpen("Поиск", {
      type: "search"
    });
    this.searh.init();
  }
  emojiHandler() {
    this.tabClose();
    const host = {
      name: "emoji",
      global: this.container,
      local: this.container.querySelector(".emoji-container")
    };
    this.emojibtn = new EmojiHandler(host, this.emojiInputAction.bind(this));
    this.emojibtn.init();
  }
  emojiInputAction(e) {
    if (e.target.className === "messages-emoji__item") {
      const emoji = e.target.textContent;
      this.container.querySelector(".input-field").value += emoji;
    }
  }

  // Открытие боковой шторки
  tabOpen(title, obj = {}) {
    this.tabTitle.textContent = title;
    this.container.querySelector(".tab-overlay").style.width = "100%";
    this.tabRows.dataset.type = obj.type;
    if (obj.type === "tabGroup") {
      switch (obj.name) {
        case "txt":
          this.tabTitle.textContent = `${this.tabTitle.textContent} Текстовые сообщения`;
          break;
        case "link":
          this.tabTitle.textContent = `${this.tabTitle.textContent} Ссылки`;
          break;
        case "image":
          this.tabTitle.textContent = `${this.tabTitle.textContent} Картинки`;
          break;
        case "audio":
          this.tabTitle.textContent = `${this.tabTitle.textContent} Аудио файлы`;
          break;
        case "video":
          this.tabTitle.textContent = `${this.tabTitle.textContent} Видео файлы`;
          break;
        default:
          this.tabTitle.textContent = `${this.tabTitle.textContent} Другие файлы`;
          break;
      }
    }
  }

  // Закрытие боковой шторки
  tabClose() {
    if (this.tab.querySelector(".video-cover") !== null) {
      this.media.cancelRecording();
    }
    if (this.tab.querySelector(".input-field") !== null) {
      this.searh.tabClear();
    }
    this.tabRows.innerHTML = "";
    this.tabRows.dataset.type = "null";
    this.container.querySelector(".tab-overlay").style.width = "";
  }

  // Меню опции '⋮'
  optionMenu() {
    this.tabClose();
    const menu = [{
      title: "Геолокация",
      type: "geo",
      state: this.position.geo
    }, {
      title: "Избранное",
      type: "favorite"
    }, {
      title: "Категории",
      type: "submenu",
      state: "sub"
    }, {
      title: "Удалить всё",
      type: "delete"
    }];
    const position = {
      top: 48,
      right: -9,
      width: 155
    };
    const host = {
      name: "options",
      global: this.container,
      local: this.container.querySelector(".menu-option")
    };
    this.option = new Popup(menu, position, host, this.optionAction.bind(this));
    this.option.init();
  }
  optionAction(e) {
    switch (e.target.dataset.type) {
      case "geo":
        this.resetOption();
        this.position.geo = !this.position.geo;
        this.position.geoLocation();
        break;
      case "favorite":
        this.showFavorite();
        break;
      case "submenu":
        this.groupMenu();
        break;
      case "delete":
        this.resetOption();
        this.deleteAll();
        break;
      default:
        break;
    }
  }
  resetOption() {
    if (this.option !== null) {
      this.option.remove();
    }
    this.option = null;
    this.group = null;
  }
  showFavorite() {
    this.resetOption();
    this.tabOpen("Избранное", {
      type: "tabFavorite"
    });
    this.link.sendEvent({
      event: "getFavoriteAll"
    });
  }
  deleteAll() {
    const winItems = {
      head: "Внимание",
      text: "Все сообщения чата будут удалены. Желаете продолжить?",
      button: {
        ok: "OK",
        cancel: "Отмена"
      }
    };
    this.deleteWin = new Modal(this.container);
    this.deleteWin.winModalDialog(winItems, this.deleteAllOk.bind(this));
  }
  deleteAllOk() {
    this.deleteWin.closeWinModal();
    this.link.sendEvent({
      event: "deleteAll"
    });
  }
  groupMenu() {
    if (this.group === null) {
      const menu = [{
        title: "Текст",
        type: "txt"
      }, {
        title: "Ссылки",
        type: "link"
      }, {
        title: "Видео",
        type: "video"
      }, {
        title: "Аудио",
        type: "audio"
      }, {
        title: "Изображение",
        type: "image"
      }, {
        title: "Другие файлы",
        type: "file"
      }];
      const position = {
        top: 68,
        right: 165
      };
      const host = {
        name: "group",
        global: this.container,
        local: this.container.querySelector(".menu-upload")
      };
      this.group = new Popup(menu, position, host, this.groupMenuAction.bind(this));
      this.group.init();
    } else {
      this.group.remove();
      this.group = null;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  groupMenuAction(e) {
    this.group = null;
    this.tabOpen("Категории:", {
      type: "tabGroup",
      name: e.target.dataset.type
    });
    this.link.sendEvent({
      event: "getGroup",
      value: e.target.dataset.type
    });
  }

  // Меню скрепки
  uploadMenu() {
    this.tabClose();
    const menu = [{
      title: "Видео",
      type: "video"
    }, {
      title: "Аудио",
      type: "audio"
    }, {
      title: "Изображение",
      type: "image"
    }, {
      title: "Другие файлы",
      type: "file"
    }];
    const position = {
      top: -160,
      left: -10
    };
    const host = {
      name: "clip",
      global: this.container,
      local: this.container.querySelector(".upload")
    };
    this.upload = new Popup(menu, position, host, this.uploadAction.bind(this));
    this.upload.init();
  }
  uploadAction(e) {
    this.upload.remove();
    this.upload = null;
    const i = document.createElement("input");
    i.type = "file";
    i.accept = `${e.target.dataset.type}/*`;
    i.multiple = "multiple";
    i.click();
    i.oninput = () => {
      this.link.sendData(i.files, Data.getTime(), this.position.location);
    };
  }

  // Меню элемента
  popupMenu(e) {
    this.popupId = e.target.closest(".element").querySelector(".mess-user-body").dataset.id;
    const menu = [{
      title: e.target.closest(".element").querySelector(".mess-user-body").dataset.favorite === "yes" ? "Удалить из избранного" : "В избранное",
      type: "favorite"
    }, {
      title: "Скачать",
      type: "load"
    }, {
      title: "Удалить",
      type: "delete"
    }];
    const position = {
      top: 5,
      right: 18
    };
    const host = {
      name: "mess-item",
      global: this.rows,
      local: e.target.closest(".mess-menu")
    };
    this.popup = new Popup(menu, position, host, this.popupAction.bind(this));
    this.popup.init();
  }
  popupAction(e) {
    switch (e.target.dataset.type) {
      case "delete":
        this.link.sendEvent({
          event: "delete",
          id: e.target.closest(".element").querySelector(".mess-user-body").dataset.id
        });
        break;
      case "save":
        this.saveElmt(e.target);
        break;
      case "favorite":
        this.link.sendEvent({
          event: "favorite",
          id: e.target.closest(".element").querySelector(".mess-user-body").dataset.id,
          value: e.target.closest(".element").querySelector(".mess-user-body").dataset.favorite === "no" ? "yes" : "no"
        });
        break;
      default:
        break;
    }
    if (this.popup !== null) {
      this.popup.remove();
    }
    this.popup = null;
    this.popupId = null;
  }
  saveElmt(e) {
    let file;
    const link = document.createElement("a");
    const {
      type,
      fname
    } = e.closest(".row").querySelector(".mess-user-body").dataset;
    if (type.match(/txt/) || type.match(/link/)) {
      const content = e.closest(".row").querySelector(".mess-user-body").textContent;
      const blob = new Blob([content], {
        type: "text/plain;charset=UTF-8"
      });
      file = new File([blob], "fileName.txt", {
        type: "text/plain"
      });
      link.download = "chaos.txt";
      link.href = URL.createObjectURL(file);
      link.click();
    } else if (type.match(/image/) || type.match(/audio/) || type.match(/video/)) {
      const mediaContent = e.closest(".row").querySelector(".mess-img");
      link.href = mediaContent.src || mediaContent.href;
      link.download = fname;
      link.click();
    } else {
      const linkFile = e.closest(".row").querySelector(".mess-link");
      linkFile.download = fname;
      linkFile.click();
    }
  }
  deleteMessage(e) {
    // Основное поле
    const arr = [...this.rows.querySelectorAll(".mess-user-body")];
    const index = arr.findIndex(el => el.dataset.id === e);
    arr[index].closest(".row").remove();
    // Если вкладка tab открыта
    if (this.tabRows.querySelector(".row") !== null) {
      const arrTab = [...this.tabRows.querySelectorAll(".mess-user-body")];
      const indexTab = arrTab.findIndex(el => el.dataset.id === e);
      arrTab[indexTab].closest(".row").remove();
    }
  }
  favoriteMessage(e) {
    // Основное поле
    this.setFavorite([...this.rows.querySelectorAll(".mess-user-body")], e);
    // Если вкладка tab открыта и это изранное
    if (this.tabRows.querySelector(".row") !== null && this.tabRows.dataset.type === "tabFavorite") {
      const arrTab = [...this.tabRows.querySelectorAll(".mess-user-body")];
      const indexTab = arrTab.findIndex(el => el.dataset.id === e.id);
      arrTab[indexTab].closest(".row").remove();
    }
    // Если вкладка tab открыта и это группа категорий
    if (this.tabRows.querySelector(".row") !== null && this.tabRows.dataset.type === "tabGroup") {
      this.setFavorite([...this.tabRows.querySelectorAll(".mess-user-body")], e);
    }
  }
  setFavorite(container, e) {
    const arr = container;
    const index = arr.findIndex(el => el.dataset.id === e.id);
    arr[index].closest(".mess-user-body").dataset.favorite = e.value;
    const str = arr[index].closest(".element").querySelector(".time-stp");
    if (str.textContent[0] === "★" && e.value === "no") {
      str.textContent = str.textContent.slice(2, str.textContent.length);
    } else if (str.textContent[0] !== "★" && e.value === "yes") {
      str.textContent = `★ ${str.textContent}`;
    }
  }

  // Запуск функции по имени полученному из строки
  executeFunctionByName(functionName, context) {
    const args = Array.prototype.slice.call(arguments, 2);
    const namespaces = functionName.split(".");
    const func = namespaces.pop();
    for (let i = 0; i < namespaces.length; i += 1) {
      context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
  }

  // Ленивая подгрузка
  oldReceive(msg) {
    const elmt = this.gui.createElm(msg.message);
    this.rows.insertAdjacentElement("afterbegin", elmt);
    if (this.rows.scrollHeight === this.rows.clientHeight) {
      this.rows.scrollTop = this.rows.scrollHeight;
    } else if (this.fixScroll === false) {
      this.fixScroll = true;
      const arrRow = this.rows.querySelectorAll(".row");
      this.scrollFixPos = arrRow[1];
      this.scrollFixPos.scrollIntoView({
        block: "start"
      });
    }
    if (this.noSendMsg > 0 && this.currentSend > 0) {
      this.link.sendEvent({
        event: "noSendMsg",
        value: this.noSendMsg
      });
      this.currentSend -= 1;
      this.noSendMsg -= 1;
    } else if (this.noSendMsg > 0 && this.rows.scrollHeight - this.rows.clientHeight - 1 < 0) {
      this.nextOldReceive(); // первое заполнение до появления скролла
    }
  }
  nextOldReceive() {
    this.currentSend = this.stepSend;
    this.link.sendEvent({
      event: "noSendMsg",
      value: this.noSendMsg
    });
    this.noSendMsg -= 1;
  }
  showError() {
    const winItems = {
      head: "Внимание!!!",
      text: `
        Отсутствует соединение с сервером.<br><br>
        Попробуйте перезагрузить страницу или
        перезапустить браузер.<br><br>
        Проверьте соединение с интернетом.
        `,
      button: {
        cancel: "Понятно"
      }
    };
    this.container.style.pointerEvents = "none";
    this.ask = new Modal(this.container);
    this.ask.winModalDialog(winItems);
  }
  showInfo() {
    const winItems = {
      head: "Список команд",
      text: `@chaos: погода - запрос погоды<br><br>
        @chaos: привет - запрос приветствия <br><br>
        @chaos: избранное - запрос списка избранного <br><br>
        @chaos: данные - запрос списка данных<br><br>`,
      button: {
        cancel: "Понятно"
      }
    };
    this.info = new Modal(this.container);
    this.info.winModalDialog(winItems, this.closeShowInfo.bind(this));
    this.info = null;
  }
  closeShowInfo() {
    this.info.closeWinModal();
  }
  shadowDND() {
    this.mask.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    this.mask.classList.add("dnd");
    this.mask.style.visiblity = "visible";
  }
  shadowDNDHidden() {
    this.mask.style.backgroundColor = "";
    this.mask.classList.remove("dnd");
    this.mask.style.visiblity = "";
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const server = "wss://diplom-chaos-organizer-back.onrender.com";
const container = document.querySelector("main");
const chat = new Chat(container, server);
chat.init();
;// CONCATENATED MODULE: ./src/index.js




/******/ })()
;