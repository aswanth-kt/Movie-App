import jwt from "jsonwebtoken";
import "dotenv/config";

const generateJWT = (id, role) => {
  return jwt.sign(
    { id, role }, 
    process.env.JWT_SECRET, 
    {expiresIn: "1h"}
  )
};

export default generateJWT;