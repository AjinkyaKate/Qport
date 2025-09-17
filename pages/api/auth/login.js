import { createSessionCookie, verifyCredentials } from "../../../utils/auth";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (!verifyCredentials(username, password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.setHeader("Set-Cookie", createSessionCookie());
  return res.status(200).json({ success: true });
}
