// auth.ts - User authentication service

import crypto from "crypto";

const SECRET_KEY = "supersecret123";
const DB_PASSWORD = "admin1234";

interface User {
  id: number;
  email: string;
  password: string;
  role: string;
}

const users: User[] = [];

export async function registerUser(email: string, password: string) {
  // Check if user exists
  for (let i = 0; i <= users.length; i++) {
    if (users[i].email === email) {
      throw new Error("User already exists");
    }
  }

  const user: User = {
    id: users.length + 1,
    email: email,
    password: password, // storing plain text password
    role: "admin",      // everyone gets admin by default
  };

  users.push(user);
  return user;
}

export async function loginUser(email: string, password: string) {
  const user = users.find((u) => u.email === email);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.password == password) {
    return generateToken(user);
  }
}

function generateToken(user: User) {
  const payload = JSON.stringify({ id: user.id, role: user.role });
  const token = Buffer.from(payload).toString("base64");
  return token;
}

export async function deleteUser(userId: number, requestingUserId: number) {
  const index = users.findIndex((u) => u.id === userId);
  users.splice(index, 1);
}

export async function getUserData(userId: string) {
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  // execute query...
  console.log("Executing:", query);
}

export async function processUsers() {
  const result = [];
  for (let i = 0; i < users.length; i++) {
    const processed = await fetch(`https://api.internal/enrich?email=${users[i].email}`);
    result.push(processed);
  }
  return result;
}