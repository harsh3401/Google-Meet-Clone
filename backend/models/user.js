import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
});
userSchema.statics.signup = async function (email, password, name, date) {
  if (!email || !password || !name) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Enter a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Enter a strong password");
  }
  if (name.length > 9 || validator.isNumeric(name)) {
    throw Error(
      "Enter a username smaller than 9 characters which is not a number"
    );
  }
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hash, name, date });

    return user;
  }
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};
export const userModel = mongoose.model("User", userSchema);
