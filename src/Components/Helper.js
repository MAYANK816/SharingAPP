import { io } from "socket.io-client";
const socket = io.connect("https://sharing-app-backend.vercel.app/");
export default socket;
