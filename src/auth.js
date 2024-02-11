import { Auth } from '@aws-amplify/auth';
import { Amplify } from '@aws-amplify/core';
import { Logger } from 'aws-amplify';

const logger = new Logger('ErrorLogger');

/**
 * Sign in a user with the provided username and password.
 * @param {string} usr - The username of the user.
 * @param {string} pss - The password of the user.
 * @returns {Promise<object>} - A promise that resolves to the signed-in user object.
 */
async function signIn(usr, pss) {
  let amplifyConfig;

  amplifyConfig = {
    Auth: {
      region: process.env.AWS_REGION,
      userPoolId: process.env.USER_POOL_ID,
      userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID,
      mandatorySignIn: true,
    },
    authenticationFlowType: "USER_SRP_AUTH",
  };

  Amplify.configure(amplifyConfig);

  Auth.configure();

  let user;

  try {
    await Auth.signIn(usr, pss);

    amplifyConfig.authenticationFlowType = "CUSTOM_AUTH";
    Amplify.configure(amplifyConfig);
    Auth.configure();

    user = await Auth.signIn(usr);

    return user;
  } catch (e) {
    logger.error('Is something wrong with the Sign In?',e);
  }
}

/**
 * Verifies the OTP (One-Time Password) for a user.
 * @param {object} user - The user object.
 * @param {string} code - The OTP code to verify.
 * @returns {Promise<any>} - A promise that resolves with the challenge answer response.
 */
async function verifyOTP(user, code) {
  if (user?.challengeName === "CUSTOM_CHALLENGE") {
    try {
      const challengeAnswerResponse = await Auth.sendCustomChallengeAnswer(
        user,
        code
      );

      return challengeAnswerResponse;
    } catch (e) {
      logger.error('Is something wrong with the verification of the OTP?', e);
    }
  }
}

export { signIn, verifyOTP };
