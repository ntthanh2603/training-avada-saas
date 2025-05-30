import functions from "firebase-functions";
import api from "./handlers/api.js";

export const helloWorld = functions.https.onRequest(api.callback());
