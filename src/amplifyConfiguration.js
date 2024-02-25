const config =  {
    Auth: {
      Cognito: {
        userPoolId: process.env.USER_POOL_ID,
        userPoolClientId: process.env.USER_POOL_WEB_CLIENT_ID,
      }
    }
  };

export default config;