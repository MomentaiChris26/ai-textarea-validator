import axios from "axios";



export const validateCourse = async (text: string) => {
  const validateURL = "http://localhost:8080/";

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