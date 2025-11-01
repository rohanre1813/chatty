import jwt from "jsonwebtoken";

/**
 * Generates a JWT token and sets it as an HTTP-only cookie.
 * This function ensures the token works properly across Vercel (frontend)
 * and Render (backend) deployments.
 */
export const generateToken = (userId, res) => {
  try {
    // Create JWT
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token valid for 7 days
    });

    // Set cookie in response
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true, // Prevent XSS
      secure: process.env.NODE_ENV === "production", // Required for SameSite=None
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ Allow cross-origin cookies from Vercel
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

/**
 * Verifies a JWT token from cookies and returns the decoded payload.
 * Can be used in middlewares.
 */
export const verifyToken = (req) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};


// import jwt from "jsonwebtoken";

// export const generateToken = (userId, res) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });

//   res.cookie("jwt", token, {
//     maxAge: 7 * 24 * 60 * 60 * 1000, // MS
//     httpOnly: true, // prevent XSS attacks cross-site scripting attacks
//     sameSite: "strict", // CSRF attacks cross-site request forgery attacks
//     secure: process.env.NODE_ENV !== "development",
//   });

//   return token;
// };
