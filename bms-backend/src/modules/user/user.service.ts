import User from "./user.model";
import bcrypt from "bcryptjs";

export const createUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return User.create({
    username: data.username,
    email: data.email,
    password: hashedPassword,
  });
};

export const validateUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    console.log("[validateUser] No user found for email:", email);
    return null;
  }

  console.log("[validateUser] User found, comparing passwords...");
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("[validateUser] Password match result:", isMatch);
  return isMatch ? user : null;
};
