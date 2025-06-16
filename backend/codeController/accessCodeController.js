//require from firebase
//sms Controller
const accessCodeGenerator = require("generate-sms-verification-code");
const { storeAccessCode, validateCode } = require("../firebase/firebase");
const { sendAccessCode } = require("../SMSService/smsService");
exports.createNewAccessCode = async (req, res) => {
    const { phoneNumber } = req.body;
    const code = accessCodeGenerator(6, { type: "string" });
    try {
        await storeAccessCode(phoneNumber, code);
        await sendAccessCode(phoneNumber, code);
        res.status(200).json({
            message: `Create and send access code successfully to number: ${phoneNumber}`,
            });
        } catch (err) {
        res.status(400).send({message: err.message})
    }
};
exports.validateAccessCode = async (req, res) => {
    const { phoneNumber, accessCode } = req.body;
    try {
        await validateCode(phoneNumber, accessCode);
        res.status(200).json({
            message: "Validate successfully",
        });
    } catch (e) {
    res.status(400).json({
        message: e.message,
        });
    }
};
