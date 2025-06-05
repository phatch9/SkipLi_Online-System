import axios from "axios";
let validateAccessCode = async (phoneNumber, accessCode) => {
  try {
    return await axios.post("http://localhost:8000/accessCodeValidation", {
      phoneNumber,
      accessCode,
    });
  } catch (e) {
    throw new Error(e);
  }
};
export default validateAccessCode;
