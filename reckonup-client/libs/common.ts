import axios from "axios";

export const get = async <T, R>(url: string, converter: (response: R) => T) => {
  try {
    const response = await axios.get<R>(url);
    return converter(response.data);
  }
  catch (e) {
    console.error(e.response.data.error);
  }
}