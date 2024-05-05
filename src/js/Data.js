export default class Data {
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
