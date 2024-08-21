const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const headerToken = req.headers["authorization"];

        if (!headerToken) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const decode = jwt.verify(headerToken, process.env.JWT_SECRET_KEY);
        req.userId = decode.userId;
        next();
    } catch (error) {
        res.status(401).json({ errorMessage: "Invalid token!" , isTokenExpired : true});
    }
};

const decodeJwtToken = (authHeader) => {
    try {
        
        if (!authHeader) {

            return res.status(401).json({ message: "Unauthorized access" });


        }
        const decode = jwt.verify(authHeader, process.env.JWT_SECRET_KEY);

        const userId = decode.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        return userId;
        
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}


module.exports = {verifyToken, decodeJwtToken};