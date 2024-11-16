const VerifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expect "Bearer <token>"

  if (!token) {
    return res.status(403).json({ msg: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user info in request
    next(); // Proceed to the next middleware or route
  } catch (error) {
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

export default VerifyToken;
