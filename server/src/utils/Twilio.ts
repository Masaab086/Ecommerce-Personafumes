import twilio from "twilio";
import otpGenerator from "otp-generator";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });
// dotenv.config();

// const smsSid = "AC0a18c43919b3b6b5458595900d941a51";
// const smsAuthToken = "091969fe8a55645d1190ec5028967f4f";
// +17088016605
const smsSid = process.env.SMSSID;
const smsAuthToken = process.env.SMSAUTHTOKEN;
const smsServiceId = process.env.SMSSERVICEID;

// My Self
// const smsSid = "ACfbc34703b081b19c5eb1e2cdd0542208";
// const smsAuthToken = "6255f15f729c40e13bd68939e7392d60";

// const twl: any = twilio(smsSid, smsAuthToken, {
//   lazyLoading: true,
// });

export const sendOtp = async (phone: any, otp: any) => {
  console.log("Displaying the credintials");
  console.log({ smsSid, smsAuthToken, smsServiceId });
  /*
  return await twl.messages.create({
    to: phone,

    // from: "+17088016605",
    messagingServiceSid: smsServiceId,
    body: `Your OTP for personafumes is ${otp}`,
  });


  */
};

export const generateOtp = () => {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
};
