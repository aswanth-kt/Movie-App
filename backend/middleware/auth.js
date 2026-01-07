import jwt from "jsonwebtoken";
import "dotenv/config";


const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "No token, authorization denied!"
            })
        }

        // token verifying using the secret key
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    message: "Invalid or expired token."
                })
            }

            req.user = decoded;
            console.log("decoded:", decoded)

            next();
        })

    } catch (error) {
        console.log("Error in authenticate token:", error);
        return res.status(401).json({
            message: "Invalid token"
        })
    }
};


export default authenticateToken;