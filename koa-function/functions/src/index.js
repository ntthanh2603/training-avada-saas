import functions from "firebase-functions";
import api from "./handlers/api.js";

export const hello = functions.https.onRequest(api.callback());
