const handler = async (event) => {
    if (
      event.request.privateChallengeParameters.answer ==
      event.request.challengeAnswer
    ) {
        console.log("answerCorrect = true");
      event.response.answerCorrect = true;
    } else {
        console.log("answerCorrect = false");
      event.response.answerCorrect = false;
    }
  
    return event;
  };
  
  export { handler };
  