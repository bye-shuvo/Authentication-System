import { client, sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE , WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, token) => {
  const recipient = [{ email }];
  try {
    await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      category: "Email Verification",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verification_Token}", token).replace("{company_name}" , sender.name),
    });
  } catch (error) {
    console.error("Error verificaiton email", error.message);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const receiver = [{ email }];
  try {
    await client.send({
      from: sender,
      to: receiver,
      html : WELCOME_EMAIL_TEMPLATE.replace("{user_name}" , name).replace("{company_name}" , sender.name)
    });
  } catch (error) {
    console.log("Error while sending welcome email" , error.message);
  }
};
