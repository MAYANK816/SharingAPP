import { io } from "socket.io-client";
const socket = io.connect("https://sharingapp-22.herokuapp.com/");
export default socket;
