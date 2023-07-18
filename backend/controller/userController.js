import { userModel } from "../models/User.js";
import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;
const createAcessToken = (_id) => {
  return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
};
const createRefereshToken = (_id) => {
  return jwt.sign({ _id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    const acesstoken = createAcessToken(user._id);
    const refreshToken = createRefereshToken(user._id);
    res.status(200).json({ email, refreshToken, acesstoken });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
  return;
};
export const signupUser = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = await userModel.signup(email, password, name, new Date());
    const acesstoken = createAcessToken(user._id);
    const refreshToken = createRefereshToken(user._id);
    res.status(200).json({ email, refreshToken, acesstoken });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
  return;
};
