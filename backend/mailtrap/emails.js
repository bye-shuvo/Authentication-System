import { client, sender } from "./mailtrap.config.js";
import { EMAIL_VERIFICATION_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, token) => {
  const recipient = [{ email }];
  try {
    await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      category: "Email Verification",
      html: EMAIL_VERIFICATION_TEMPLATE.replace("{verification_Token}", token).replace("{company_name}" , sender.name),
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
      template_uuid: "ed23e3a7-ff73-448f-b5c2-c98477fbf8dd",
      template_variables: {
        name: name,
        company_info_name: "Bye-Tech",
      },
    });
  } catch (error) {
    console.log("Error while sending welcome email" , error.message);
  }
};
