import React, { useState } from "react";
import InputField from "../inputField/inputField";
import { validatePhoneNumber } from "../phoneNumberValidation/phoneNumberValidation";
import sendPhoneNumber from "../../utils/sendPhoneNumer";
import validateAccessCode from "../../utils/validateAccessCode";
import Spinner from "../spinner/Spinner";
import "./inputForm.css";

let InputForm = (props) => {
  let [step, nextStep] = useState(1);
  let [phoneNumber, setPhoneNumber] = useState("");
  let [accessCode, setAccessCode] = useState("");
  let [loading, setLoading] = useState(false);

  let goToNextStep = async (e) => {
    e.preventDefault();
    if (step === 1) {
      //send phone number to backend
      let isValid = validatePhoneNumber(phoneNumber);
      if (isValid) {
        try {
          setLoading(true);
          await sendPhoneNumber(phoneNumber);
          setLoading(false);
          nextStep(2);
        } catch (e) {
          setLoading(false);
          alert(e);
        }
      } else alert("Invalid number");
    }

    if (step === 2) {
      //ValidateAccessCode
      try {
        setLoading(true);
        await validateAccessCode(phoneNumber, accessCode);
        setLoading(false);
        nextStep(3);
      } catch (e) {
        setLoading(false);
        alert(e);
      }
    }
  };
  let goback = () => {
    if (step > 1) {
      nextStep((pre) => pre - 1);
    }
  };
  let BackButton = () => {
    if (step > 1)
      return (
        <button className="backButton" onClick={goback}>
          <span>&#8592;</span>
        </button>
      );
    return null;
  };
  let NextButton = () => {
    if (step < 3)
      return (
        <button className="nextButton" onClick={goToNextStep}>
          <span>NEXT</span>
        </button>
      );

    return null;
  };
  let AccessCodeMessage = () => {
    if (step === 2)
      return (
        <span className="message">Access code is sent to {phoneNumber}</span>
      );
    return null;
  };
  return (
    <div className="container">
      {step < 3 ? <h2>Verify your number</h2> : <h1>Succesful Validation</h1>}
      <BackButton /> {loading ? <Spinner /> : null}
      {step < 3 ? (
        <form>
          {step === 1 ? (
            <InputField
              label="Phone Number"
              placeholder="Example: 7327634403"
              handleChange={setPhoneNumber}
              value={phoneNumber}
            />
          ) : null}

          {step === 2 ? (
            <InputField
              label="Access code"
              placeholder="Input your access code"
              handleChange={setAccessCode}
              value={accessCode}
            />
          ) : null}
          <NextButton />
        </form>
      ) : null}
      <AccessCodeMessage />
    </div>
  );
};

export default InputForm;
