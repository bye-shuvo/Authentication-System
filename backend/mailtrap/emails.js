import { client, sender } from "./mailtrap.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  RESET_PASSWORD_EMAIL_TEMPLATE,
  RESET_PASSWORD_SUCCESS_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, token) => {
  const recipient = [{ email }];
  try {
    await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      category: "Email Verification",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verification_token}", token)
        .replace("{company_name}", sender.name)
        .replace("{company_name}", sender.name),
    });
  } catch (error) {
    console.error("Error while sending verificaiton email :", error.message);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    await client.send({
      from: sender,
      to: recipient,
      subject: "Welcome to Bye Tech",
      category: "Welcome Email",
      html: WELCOME_EMAIL_TEMPLATE.replace("{user_name}", name)
        .replace("{company_name}", sender.name)
        .replace("{company_name}", sender.name)
    });
  } catch (error) {
    console.log("Error while sending welcome email :", error.message);
  }
};

export const sendResetPasswordEmail = async (email, url) => {
  const recipient = [{ email }];

  try {
    await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      category: "Reset Password Email",
      html: RESET_PASSWORD_EMAIL_TEMPLATE.replace(
        "{reset_password_url}",
        url,
      ).replace("{company_name}", sender.name)
    });
  } catch (error) {
    console.log("Error while sending password reset email :", error.message);
  }
};

export const sendResetPasswordSuccessEmail = async (email) => {
  const recipient = [{email}];
  try {
    await client.send({
      from : sender ,
      to : recipient , 
      html : RESET_PASSWORD_SUCCESS_EMAIL_TEMPLATE,
      subject : "Password Resst Successfully",
      category : "Success Reset Password"
    })
  } catch (error) {
    console.log("Error while sending password reset success email : " , error.message);
  }
}