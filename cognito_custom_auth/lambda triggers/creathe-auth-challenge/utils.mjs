import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { customAlphabet } from "nanoid";

async function sendCode(addressee, attempt) {
  const secretCode = await generateCode(getAlphabet(attempt), getCodeLength(attempt));
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (emailPattern.test(String(addressee).toLowerCase())) {
    console.log("Email OTP");
    try {
      const response = await sendEmail(secretCode, addressee);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

function getAlphabet(attempt) {
  if (attempt === 1) {
    return "0123456789";
  } else if (attempt === 2) {
    return "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  } else {
    return "0123456789@ABCDEFGHIJKLMNOPQRSTUVWXYZ$abcdefghijklmnopqrstuvwxyz!-";
  }
}

function getCodeLength(attempt) {
  return attempt === 1 ? 6 : attempt === 2 ? 8 : 16;
}

async function generateCode(alphabet, length) {
  const nanoid = customAlphabet(alphabet, length);
  return nanoid();
}

async function sendEmail(code, email) {
  const ses = new SESClient({ region: "us-east-2" });

  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: { Data: code },
      },
      Subject: { Data: "OTP CODE" },
    },
    Source: "EMAIL_ADDRESS",
  });
  console.log("command  ", command);

  try {
    let response = await ses.send(command);
    response.secretCode = code;
    return response;
  } catch (error) {
    console.log(error);
  }
}

export { sendCode };
