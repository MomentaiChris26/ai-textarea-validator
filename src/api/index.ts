import axios from "axios";
import { config } from "dotenv"

config()

const validateURL = process.env.VALIDATE_API_URL || "http://localhost:8080/";

export const validateCourse = async (text: string) => {


  try {
    const response = await axios.post(validateURL, {
      text: text
    });

    if (response.status === 200 && response.data.data) {
      return JSON.parse(response.data.data);
    }
  } catch (e) {
    console.error(e);
  }
}