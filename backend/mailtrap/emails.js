import { client, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, token) => {
  const recipient = [{ email }];
  try {
    await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      category: "Email Verification",
      html: "",
    });
  } catch (error) {
    console.error("Error verificaiton email", error.message);
  }
};
