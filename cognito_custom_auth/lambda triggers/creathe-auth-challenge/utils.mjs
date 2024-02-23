import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { customAlphabet } from 'nanoid';

async function sendCode(addressee,attempt) {
  
  let alphabet;
  let nanoid;
  let secretCode;
  
  if(attempt === 1){
    alphabet = '0123456789';
    nanoid = customAlphabet(alphabet, 6);
    secretCode = nanoid();
  }else if(attempt === 2){
    alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    nanoid = customAlphabet(alphabet, 8);
    secretCode = nanoid();
  }else{
    alphabet = '0123456789@ABCDEFGHIJKLMNOPQRSTUVWXYZ$abcdefghijklmnopqrstuvwxyz!-';
    nanoid = customAlphabet(alphabet, 16);
    secretCode = nanoid();
  }
  
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const phonePattern = /^[9][0-9]{8}$/;
  
  if (emailPattern.test(String(addressee).toLowerCase())) {
    console.log('Email verification code');
    return secretCode;
  }
  
  if (phonePattern.test(String(addressee))) {
    console.log('SMS verification code');
  }
  
  const resultEmail = await sendEmail(secretCode,addressee);
  console.log('resultEmail: ', resultEmail);
  
}

async function sendEmail(code, email){
  
  const ses = new SESClient({ region: "us-east-2" });

  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [ email ],
    },
    Message: {
      Body: {
        Html: { Data: code },
      },

      Subject: { Data: "OTP CODE" },
    },
    Source: "EMAIL_ADDRESS",
  });
  console.log('command  ', command);

  try {
    let response = await ses.send(command);
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

export { sendCode };