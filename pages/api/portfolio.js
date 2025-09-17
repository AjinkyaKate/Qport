import fs from "fs";
import { join } from "path";
import { isRequestAuthenticated } from "../../utils/auth";

export default function handler(req, res) {
  const portfolioData = join(process.cwd(), "/data/portfolio.json");
  if (process.env.NODE_ENV === "development") {
    if (req.method === "POST") {
      if (!isRequestAuthenticated(req.cookies)) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      fs.writeFileSync(
        portfolioData,
        JSON.stringify(req.body),
        "utf-8",
        (err) => console.log(err)
      );

      return res.status(200).json({ success: true });
    } else {
      res
        .status(200)
        .json({ name: "This route works in development mode only" });
    }
  }
}
