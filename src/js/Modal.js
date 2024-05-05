export default class Modal {
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
      this.cancel.addEventListener(
        "click",
        this.handlerBtnCancel.bind(this, callback),
      );
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
        const arr = e.target
          .closest(".window")
          .querySelectorAll(".modal_input");
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
    const position = input
      .split(",")
      .map((coord) => coord.match(/[+|−|-|—|-]?\d{1,3}\.\d+/));
    if (!position[0] || !position[1]) {
      return false;
    }
    return { latitude: position[0][0], longitude: position[1][0] };
  }
}
