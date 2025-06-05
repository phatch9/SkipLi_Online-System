import axios from "axios";
let sendPhoneNumber = async (phoneNumber) => {
    try {
        return await axios.post("http://localhost:8000/newAccessCode", {
        phoneNumber,
        });
    }   
        catch (e) {
            throw new Error(e.message);
        }
    };
export default sendPhoneNumber;
