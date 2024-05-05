export default class EmojiHandler {
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
    this.localDom
      .querySelector(".messages__emoji")
      .addEventListener("click", this.clickBtnEmoji.bind(this));
  }

  onEmojiBtnClick() {
    this.onEmojiFetch();
    this.scrollToBottom();
  }

  clickBtnEmoji(e) {
    this.callBack(e);
  }

  async onEmojiFetch() {
    await fetch(
      "https://emoji-api.com/emojis?access_key=046a9fbcf885bd576e07bd81ee02d6d3c87ed10a",
    )
      .then((res) => res.json())
      .then((data) => this.drawEmoji(data));
  }

  markupEmojiContainer() {
    this.container = document.createElement("ul");
    this.container.className = "messages__emoji";
    this.localDom.appendChild(this.container);
  }
  drawEmoji(data) {
    data.forEach((emoji) => {
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
