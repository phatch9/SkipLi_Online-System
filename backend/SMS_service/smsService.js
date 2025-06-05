const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" }); 
var accountSid = process.env.accountSid || "AC8c591b39bb7d5e76a7594fccb1db63d4"; // Account SID from www.twilio.com/console
var authToken = process.env.authToken || "c1370a318f081d20996395a3b7847005"; // The Auth Token from www.twilio.com/console
var twilioNumber = process.env.twilioNumber || "+12057083130";
var client = require("twilio")(accountSid, authToken);

exports.sendAccessCode = async (phoneNumber, accessCode) => {
  try {
    let message = await client.messages.create({
      body: `Hello, your access code is ${accessCode}`,
      to: `${phoneNumber}`, // Text this number
      from: twilioNumber, // From a valid Twilio number
    });
    return message;
  } catch (e) {
    throw new Error(e.message);
  }
};
