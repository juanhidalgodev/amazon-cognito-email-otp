import { amplifySignIn, verifyOTP, amplifySignOut} from "./auth.js";

let nextStep;

const signInBtn = document.getElementById("signIn");
signInBtn.addEventListener("click", async (event) => {
  //signInBtn.disabled = true;
  signInBtn.innerHTML = "Loading...";
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  nextStep = await amplifySignIn(username, password);
  if (!nextStep) {
    signInBtn.innerHTML = "ERROR...";
    return;
  } else {
    signInBtn.innerHTML = "Sending OTP";
    console.log("signIn :: ", nextStep);
    return;
  }
});

const sendOTPBtn = document.getElementById("sendOTP");
sendOTPBtn.addEventListener("click", async (event) => {
  //sendOTPBtn.disabled = true;
  sendOTPBtn.innerHTML = "Loading...";
  const code = document.getElementById("OTP").value;
  const response = await verifyOTP(nextStep, code);
  if (!response) {
    sendOTPBtn.innerHTML = "ERROR...";
    return;
  } else {
    sendOTPBtn.innerHTML = "Verified";
    console.log("result :: ", response);
    return;
  }
});

const signOutBtn = document.getElementById("signOut");
signOutBtn.addEventListener("click", async (event) => {
  signOutBtn.innerHTML = "Loading...";
  await amplifySignOut();
  signOutBtn.innerHTML = "You signed out";
});