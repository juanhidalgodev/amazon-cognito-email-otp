import { signIn, verifyOTP } from "./auth.js";

let user;

const signInBtn = document.getElementById("signIn");
signInBtn.addEventListener("click", async (event) => {
  signInBtn.disabled = true;
  signInBtn.innerHTML = "Loading...";
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  user = await signIn(username, password);
  if (!user) {
    signInBtn.innerHTML = "ERROR...";
    return;
  } else {
    signInBtn.innerHTML = "Sending OTP";
    console.log("signIn :: ", user);
    return;
  }
});

const sendOTPBtn = document.getElementById("sendOTP");
sendOTPBtn.addEventListener("click", async (event) => {
  sendOTPBtn.disabled = true;
  sendOTPBtn.innerHTML = "Loading...";
  const code = document.getElementById("codeOTP").value;
  const verify = await verifyOTP(user, code);
  if (!verify) {
    sendOTPBtn.innerHTML = "ERROR...";
    return;
  } else {
    sendOTPBtn.innerHTML = "Verified";
    console.log("verifyOTP :: ", verify);
    return;
  }
});
