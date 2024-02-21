import crypto from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({ path: ".env" });

const generateToken1 = (): string => {
	const token = crypto.randomBytes(10).toString("hex");
	console.log(token);
	return token;
};

const generateJWT = (id: string): string => {
	return jwt.sign({ id }, process.env.SECRET_COOKIE as string, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

const decryptToken = (token: string) => {
	return jwt.verify(token, process.env.SECRET_COOKIE);
};

/*const generateToken2 = () => {
  let x = Math.random().toString(36).substring(2, 15) + Date.now().toString(32);
  console.log(x);
  return x;
};*/

export { generateToken1, generateJWT, decryptToken };
