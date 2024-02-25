const handler = async (event) => {
  
  console.log('event: ', JSON.stringify(event));
  
  if (
    event.request.session.length == 1 &&
    event.request.session[0].challengeName == "SRP_A"
  ) {
    console.log("SRP_A");
    event.response.issueTokens = false;
    event.response.failAuthentication = false;
    event.response.challengeName = "PASSWORD_VERIFIER";
  } else if (
    event.request.session.length == 2 &&
    event.request.session[1].challengeName == "PASSWORD_VERIFIER" &&
    event.request.session[1].challengeResult == true
  ) {
    console.log("PASSWORD_VERIFIER session length 2");
    event.response.issueTokens = false;
    event.response.failAuthentication = false;
    event.response.challengeName = "CUSTOM_CHALLENGE";
  } else if (
    event.request.session.length >= 3 &&
    event.request.session.slice(-1)[0].challengeName == "CUSTOM_CHALLENGE" &&
    event.request.session.slice(-1)[0].challengeResult == false
  ) {
    console.log("CUSTOM_CHALLENGE session length >= 3 FALSE");
    event.response.issueTokens = false;
    event.response.failAuthentication = false;
    event.response.challengeName = "CUSTOM_CHALLENGE";
  } else if (
    event.request.session.length >= 4 &&
    event.request.session.slice(-1)[0].challengeName == "CUSTOM_CHALLENGE" &&
    event.request.session.slice(-1)[0].challengeResult == true
  ) {
    console.log("CUSTOM_CHALLENGE session length >= 3 TRUE");
    event.response.issueTokens = true;
    event.response.failAuthentication = false;
  } else {
    console.log("failAuthentication");
    event.response.issueTokens = false;
    event.response.failAuthentication = true;
  }
  
  return event;
};

export { handler }