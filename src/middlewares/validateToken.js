import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
    try {
        // Extract the token from the request cookies
        const { token } = req.cookies;

        // If no token is found, return an unauthorized response
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        // Verify the token using the TOKEN_SECRET and handle the result
        jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
            // If there is an error in the token, return an invalid token response
            if (error)
                return res.status(401).json({ message: "Invalid Token" });

            // Set the decoded user information in the request object
            req.user = decoded;
            // Call the next middleware or route handler
            next();
        });
    } catch (error) {
        // Handle any exceptions that occur during token verification
        console.error(error);
        // Return an unauthorized response
        return res.status(401).json({ message: "Unauthorized" });
    }
};
