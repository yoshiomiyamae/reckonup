import "./common/i18n";
import { ENTRY_POINT } from "./settings";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

// Cookieの取得
axios.get(ENTRY_POINT);
