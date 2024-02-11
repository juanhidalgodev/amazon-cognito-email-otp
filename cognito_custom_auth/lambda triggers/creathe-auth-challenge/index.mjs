import { customAlphabet } from 'nanoid'
import { sendEmail } from './ses.mjs'

export const handler = async (event, context) => {

    console.log('event: ', JSON.stringify(event));
    console.log('context: ', context);

    try {

        if (!event.request.session || !event.request.session.length) {
            
            const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const nanoid = customAlphabet(alphabet, 6);
            const otp = nanoid();
            const email = event.request.userAttributes.email;

            const resultEmail = await sendEmail(otp,email);
            console.log('resultEmail: ', resultEmail);
    
            event.response.publicChallengeParameters = {
                email: email,
            };
    
            event.response.privateChallengeParameters = { otp };
            
            console.log('add publicChallengeParameters-email & privateChallengeParameters');
            console.log('new event object: ', event);
        }
        return event;

    }
    catch (error) {
        console.log(error);
    }

};
