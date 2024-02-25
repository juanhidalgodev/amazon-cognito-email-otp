
import { sendCode } from './utils.mjs';

const handler = async (event) => {
  console.log('event: ', JSON.stringify(event));
  
  if (event.request.challengeName !== "CUSTOM_CHALLENGE") {
    console.log("!CUSTOM_CHALLENGE");
    return event;
  }

  const sessionLength = event.request.session.length;
  const email = event.request.userAttributes.email;

  if (sessionLength > 1 && sessionLength <= 4) {
    console.log("attemp # ", sessionLength-1);
    const response = await sendCode(email, sessionLength-1);
    event.response.publicChallengeParameters = { username: event.userName };
    event.response.privateChallengeParameters = { answer: response.secretCode };
  }
  
  console.log('event: ', JSON.stringify(event));
  
  return event;
};

export { handler };
