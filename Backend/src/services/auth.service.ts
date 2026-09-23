import { users } from "../data/user.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const existingUser = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = {
    id: crypto.randomUUID(),
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
  };

  users.push(user);

  const token = generateToken({
    userId: user.id,
    email: user.email,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
}

export async function loginUser(
  email: string,
  password: string
) {
  const user = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const validPassword = await comparePassword(
    password,
    user.password
  );

  if (!validPassword) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
}

export function getUserById(id: string) {
  return users.find((user) => user.id === id);
}