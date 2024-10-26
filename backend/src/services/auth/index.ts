import { User } from "../../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "../../types/auth.types";

const JWT_SECRET = process.env.JWT_SECRET || "JWTisthebestwaytoencrypt";

const register = async (
  email: string,
  password: string
): Promise<IUser | null> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  return user.save();
};

const login = async (
  email: string,
  password: string
): Promise<string | null> => {
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null;
  }

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

const AuthService = {
  register,
  login,
};

export default AuthService;
