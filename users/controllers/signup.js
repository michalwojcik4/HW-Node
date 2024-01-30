import bcrypt from "bcryptjs";
import { User } from "../user.schema.js";
import gravatar from "gravatar";
import { v4 as uuidv4 } from "uuid";
import { transporter } from "../../shared/services/emailService.js";

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, { s: "250", r: "g", d: "identicon" });
    const verificationToken = uuidv4();
    const verificationLink = `http://localhost:3000/users/verify/${verificationToken}`;

    const emailOptions = {
      from: "no-reply@sandboxb714d8c4f77047a3980e9639fc1b71e2.mailgun.org",
      to: email,
      subject: "Account Verification",
      html: `<p>Click the following link to verify your account:</p>
            <a href="${verificationLink}">${verificationLink}</a>`,
    };

    await transporter.sendMail(emailOptions);

    const user = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    });

    return res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription,
        avatar: user.avatarURL,
        verificationToken: user.verificationToken,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    return next(error);
  }
};

export { signup };
