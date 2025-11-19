import { ratelimit } from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key");
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too Many Requests, please try again later" });
    }
    next(); // Call next() to proceed to the next middleware/route handler
  } catch (err) {
    console.error("Rate Limiter Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default rateLimiter;
