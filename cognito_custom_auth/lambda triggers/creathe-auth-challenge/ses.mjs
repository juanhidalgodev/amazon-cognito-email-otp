import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const ses = new SESClient({ region: "us-east-2" });

async function sendEmail(otp,email) {
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [ email ],
    },
    Message: {
      Body: {
        Html: { Data: otp },
      },

      Subject: { Data: "OTP CODE" },
    },
    Source: "EMAIL_ADDRESS",
  });
  console.log('command  ', command)

  try {
    let response = await ses.send(command);
    return response;
  }
  catch (error) {
    console.log(error);
  }
};

export { sendEmail };