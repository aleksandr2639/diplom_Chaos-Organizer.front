import Modal from "./Modal";

export default class Location {
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
        navigator.geolocation.getCurrentPosition(
          this.handlerSuccess.bind(),
          this.handlerError.bind(),
        );
      }
    } else this.location = "";
  }

  handlerSuccess(pos) {
    const { latitude, longitude } = pos.coords;
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
        error: "Введите значение в формате 00.00, 00.00",
      },
      button: {
        ok: "OK",
        cancel: "Отмена",
      },
    };

    this.geoMessage = new Modal();
    this.geoMessage.handlerBtnOk = this.geoMessage.checkCoords;
    this.geoMessage.handlerBtnCancel = this.geoMessage.eventBack;
    this.geoMessage.winModalDialog(winItems, this.inputLocation.bind());
  }

  inputLocation(pos) {
    this.geoMessage.closeWinModal();
    if (pos !== null) {
      const { latitude, longitude } = pos;
      this.location = `${latitude}, ${longitude}`;
    } else this.geo = false;
  }
}
