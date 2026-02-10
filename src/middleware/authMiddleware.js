import jwt from "jsonwebtoken"
import { prisma } from "../config/db.js"

export const authMiddleware = async (req, res, next) => {
    console.log("Auth middleware reached!");
    let token;

    if (req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookie?.jwt) {
        token = req.cookie.jwt;
    }

    if (!token) {
        res.status(401).json({ error: "not authorized, no token provided"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        if (!user) {
            return res.status(401).json({ error: "invalid user"});
        }

        req.user = user; 
        next();

    } catch(err) {
        res.status(401).json({ error: "token invalid, please provide a valid token"});
    }
}