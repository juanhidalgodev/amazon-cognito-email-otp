import { signIn, confirmSignIn, signOut } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import { ConsoleLogger } from 'aws-amplify/utils';
import config from './amplifyConfiguration'; 


const logger = new ConsoleLogger('ErrorLogger');

async function amplifySignIn(username, password) {

  Amplify.configure(config);

  try {

    const { isSignedIn, nextStep } = await signIn({
      username,
      password,
      options: {
        authFlowType: 'CUSTOM_WITH_SRP'
      },
    });

    return nextStep;
  } catch (e) {
    logger.error('Is something wrong with the Sign In?',e);
  }
}

async function verifyOTP(nextStep, challengeResponse) {
  if (nextStep?.signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE") {
    try {
      const challengeAnswerResponse = await confirmSignIn({ challengeResponse });
      return challengeAnswerResponse;
    } catch (e) {
      logger.error('Is something wrong with the verification of the OTP?', e);
    }
  }
}

async function amplifySignOut(){

  Amplify.configure(config);
  
  try {
    await signOut();
  } catch (e) {
    logger.error('Is something wrong with the Sign Out?', e);
  }
}


export { amplifySignIn, verifyOTP, amplifySignOut };
