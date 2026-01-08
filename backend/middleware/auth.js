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
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        // console.log("decoded:", decoded)

        next();

    } catch (error) {
        console.log("Error in authenticate token:", error);
        return res.status(401).json({
            message: "Invalid token"
        })
    }
};


export default authenticateToken;