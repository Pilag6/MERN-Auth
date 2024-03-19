import Axios from "axios";

const API = "http://localhost:3333/api";

export const registerRequest = (user) => Axios.post(`${API}/register`, user);
