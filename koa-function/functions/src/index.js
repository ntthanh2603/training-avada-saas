import { onRequest } from "firebase-functions/v2/https";
import api from "./routes/api.js";

export const helloWorld = onRequest(api.callback());
