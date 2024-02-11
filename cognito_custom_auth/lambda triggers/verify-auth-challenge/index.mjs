export const handler = async (event, context) => {

    try {

        console.log('event: ', JSON.stringify(event));
        console.log('context: ', context);

        const challengeAnswer = event.request.challengeAnswer;
        const expectedAnswer = event.request.privateChallengeParameters;
        console.log(`challengeAnswer: ${challengeAnswer} - expectedAnswer: ${expectedAnswer.otp} `);

        if (challengeAnswer === expectedAnswer.otp) {
            event.response.answerCorrect = true;
        } else {
            event.response.answerCorrect = false;
        }

        return event;
        
    } catch (error) {
        console.log('error::', error);
    }
};