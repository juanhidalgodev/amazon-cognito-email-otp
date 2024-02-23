import { customAlphabet } from 'nanoid'
import { sendEmail } from './ses.mjs'

const handler = async (event) => {
    
  console.log('event: ', JSON.stringify(event));
    
  if (event.request.challengeName !== "CUSTOM_CHALLENGE") {
    console.log("!CUSTOM_CHALLENGE");
    return event;
  }

  if (event.request.session.length === 2) {
      
    console.log("first attempt");
    
    const alphabet = '0123456789';
    const nanoid = customAlphabet(alphabet, 6);
    const secretCode = nanoid();
    const email = event.request.userAttributes.email;
    
    //const resultEmail = await sendEmail(secretCode,email);
    //console.log('resultEmail: ', resultEmail);
    
    event.response.publicChallengeParameters = {};
    event.response.privateChallengeParameters = {};
    
    event.response.publicChallengeParameters.username = event.userName;
    event.response.privateChallengeParameters.answer = secretCode;
  }

  if (event.request.session.length === 3) {
      
    console.log("second attempt");
    
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nanoid = customAlphabet(alphabet, 8);
    const secretCode = nanoid();
    const email = event.request.userAttributes.email;
    
    //const resultEmail = await sendEmail(secretCode,email);
    //console.log('resultEmail: ', resultEmail);
    
    event.response.publicChallengeParameters = {};
    event.response.privateChallengeParameters = {};
    
    event.response.publicChallengeParameters.username = event.userName;
    event.response.privateChallengeParameters.answer = secretCode;
  }

  if (event.request.session.length === 4) {
    console.log("third attempt");
    
    const alphabet = '0123456789@ABCDEFGHIJKLMNOPQRSTUVWXYZ$abcdefghijklmnopqrstuvwxyz!-';
    const nanoid = customAlphabet(alphabet, 16);
    const secretCode = nanoid();
    const email = event.request.userAttributes.email;
    
    //const resultEmail = await sendEmail(secretCode,email);
    //console.log('resultEmail: ', resultEmail);
    
    event.response.publicChallengeParameters = {};
    event.response.privateChallengeParameters = {};
    
    event.response.publicChallengeParameters.username = event.userName;
    event.response.privateChallengeParameters.answer = secretCode;
  }

  console.log('event: ', JSON.stringify(event));
  
  return event;
};

export { handler }