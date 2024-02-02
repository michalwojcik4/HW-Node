export const getEmailOptions = (to, verificationToken) => {
  const verificationLink = `http://localhost:3000/users/verify/${verificationToken}`;

  return {
    from: "no-reply@sandboxb714d8c4f77047a3980e9639fc1b71e2.mailgun.org",
    to,
    subject: "Account Verification",
    html: `<p>Click the following link to verify your account:</p>
            <a href="${verificationLink}">${verificationLink}</a>`,
  };
};
