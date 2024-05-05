import Chat from "./Chat";

const server = "wss://diplom-chaos-organizer-back.onrender.com";
const container = document.querySelector("main");

const chat = new Chat(container, server);
chat.init();
