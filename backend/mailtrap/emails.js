import { client, sender } from "./mailtrap.config.js";
import {EMAIL_VERIFICATION_TEMPLATE} from './emailTemplates.js'

export const sendVerificationEmail = async (email, token) => {
  const recipient = [{ email }];
  try {
    await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      category: "Email Verification",
      html: EMAIL_VERIFICATION_TEMPLATE.replace("{verificationToken}" , token),
    });
  } catch (error) {
    console.error("Error verificaiton email", error.message);
  }
};
